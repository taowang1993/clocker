import { expo } from "@better-auth/expo";
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { generateRandomString } from "better-auth/crypto";
import { betterAuth } from "better-auth/minimal";

import type { DataModel } from "./_generated/dataModel";

import { components } from "./_generated/api";
import { query } from "./_generated/server";
import { v } from "convex/values";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;
const nativeAppUrl = process.env.NATIVE_APP_URL || "mybettertapp://";
const expoScheme = process.env.EXPO_PUBLIC_SCHEME ?? nativeAppUrl.replace(/:\/\/.*$/, "");
const AUTH_OTT_DEBUG = process.env.NODE_ENV !== "production";

function authOttDebug(message: string, payload?: Record<string, unknown>) {
  if (!AUTH_OTT_DEBUG) return;
  if (payload) {
    console.log(`[auth][ott] ${message}`, payload);
    return;
  }
  console.log(`[auth][ott] ${message}`);
}

function isBenignRedirectApiError(message: string, args: unknown[]): boolean {
  if (message !== "APIError") return false;
  const err = args[0] as { statusCode?: number; status?: string } | undefined;
  return err?.statusCode === 302 || err?.status === "FOUND";
}

function toResponseFromBetterAuthError(error: unknown): Response | null {
  const err = error as {
    name?: string;
    statusCode?: number;
    headers?: Headers;
    body?: unknown;
  };

  if (err?.name !== "APIError" || typeof err.statusCode !== "number") {
    return null;
  }

  const headers = err.headers instanceof Headers ? err.headers : new Headers();
  const body = err.body;

  if (body === undefined || body === null) {
    return new Response(null, { status: err.statusCode, headers });
  }

  if (typeof body === "string") {
    return new Response(body, { status: err.statusCode, headers });
  }

  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(JSON.stringify(body), { status: err.statusCode, headers });
}

function isAuthCallbackPath(request: Request): boolean {
  try {
    const pathname = new URL(request.url).pathname;
    return (
      pathname.includes("/api/auth/callback/")
      || pathname.includes("/api/auth/oauth2/callback/")
      || pathname.includes("/api/auth/magic-link/verify")
    );
  } catch {
    return false;
  }
}

function extractSessionTokenFromSetCookie(setCookie: string): string | null {
  const match = setCookie.match(/(?:^|,\s|;\s)([\w.-]*\.session_token)=([^;]+)/);
  if (!match) return null;

  const raw = match[2] ?? "";
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    decoded = raw;
  }

  const token = decoded.split(".")[0] ?? "";
  return token.length > 0 ? token : null;
}

async function withOttRedirectFallback(
  ctx: GenericCtx<DataModel>,
  request: Request,
  response: Response,
): Promise<Response> {
  if (!isAuthCallbackPath(request)) {
    return response;
  }

  authOttDebug("callback response observed", {
    status: response.status,
    hasLocation: Boolean(response.headers.get("location")),
    hasSetCookie: Boolean(response.headers.get("set-cookie")),
  });

  if (!(response.status >= 300 && response.status < 400)) {
    authOttDebug("skip: non-redirect callback response", { status: response.status });
    return response;
  }

  const location = response.headers.get("location");
  const setCookie = response.headers.get("set-cookie");
  if (!location || !setCookie) {
    authOttDebug("skip: missing redirect location or set-cookie", {
      hasLocation: Boolean(location),
      hasSetCookie: Boolean(setCookie),
    });
    return response;
  }

  const redirectUrl = new URL(location);
  if (redirectUrl.searchParams.has("ott")) {
    authOttDebug("skip: redirect already contains ott", { location });
    return response;
  }

  const sessionToken = extractSessionTokenFromSetCookie(setCookie);
  if (!sessionToken) {
    authOttDebug("skip: could not parse session token from set-cookie");
    return response;
  }

  if (!("runMutation" in ctx) || typeof ctx.runMutation !== "function") {
    authOttDebug("skip: ctx.runMutation unavailable in callback context");
    return response;
  }

  const ott = generateRandomString(32);
  const now = Date.now();

  try {
    await ctx.runMutation(components.betterAuth.adapter.create as any, {
      input: {
        model: "verification",
        data: {
          identifier: `one-time-token:${ott}`,
          value: sessionToken,
          expiresAt: now + 3 * 60 * 1000,
          createdAt: now,
          updatedAt: now,
        },
      },
    });
  } catch (error) {
    authOttDebug("failed: could not persist OTT verification token", {
      error: error instanceof Error ? error.message : String(error),
    });
    return response;
  }

  redirectUrl.searchParams.set("ott", ott);
  authOttDebug("added ott to callback redirect", {
    pathname: redirectUrl.pathname,
    hasOtt: redirectUrl.searchParams.has("ott"),
  });

  const headers = new Headers(response.headers);
  headers.set("location", redirectUrl.toString());
  return new Response(null, { status: response.status, headers });
}

export const authComponent = createClient<DataModel>(components.betterAuth);

function createAuth(ctx: GenericCtx<DataModel>) {
  const auth = betterAuth({
    trustedOrigins: [
      siteUrl,
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      nativeAppUrl,
      `${expoScheme}://`,
      "http://localhost:8081",
      "http://localhost:8082",
      ...(process.env.NODE_ENV === "development"
        ? [
            "exp://*/*",
            "exp://10.0.0.*:*/*",
            "exp://192.168.*.*:*/*",
            "exp://172.*.*.*:*/*",
            "exp://localhost:*/*",
          ]
        : []),
    ],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: false,
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    logger: {
      level: "error",
      log: (level, message, ...args) => {
        if (level === "error" && isBenignRedirectApiError(message, args)) {
          return;
        }
        console.error(`[Better Auth]: ${message}`, ...args);
      },
    },
    plugins: [
      expo(),
      convex({
        authConfig,
        jwksRotateOnTokenGenerationError: true,
      }),
      crossDomain({ siteUrl }),
    ],
  });

  const originalHandler = auth.handler.bind(auth);

  return {
    ...auth,
    handler: async (request: Request) => {
      try {
        const response = await originalHandler(request);
        return await withOttRedirectFallback(ctx, request, response);
      } catch (error) {
        const response = toResponseFromBetterAuthError(error);
        if (response) {
          return await withOttRedirectFallback(ctx, request, response);
        }
        throw error;
      }
    },
  };
}

export { createAuth };

export const getCurrentUser = query({
  args: {},
  returns: v.union(
    v.null(),
    v.object({
      _id: v.string(),
      _creationTime: v.number(),
      email: v.string(),
      emailVerified: v.boolean(),
      image: v.optional(v.union(v.string(), v.null())),
      name: v.string(),
      updatedAt: v.number(),
      createdAt: v.number(),
    }),
  ),
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) return null;
    return {
      _id: user._id,
      _creationTime: user._creationTime,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      name: user.name,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
  },
});
