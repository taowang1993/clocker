import { expo } from "@better-auth/expo";
import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth/minimal";

import type { DataModel } from "./_generated/dataModel";

import { components } from "./_generated/api";
import { query } from "./_generated/server";
import { v } from "convex/values";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;
const nativeAppUrl = process.env.NATIVE_APP_URL || "mybettertapp://";
const expoScheme = process.env.EXPO_PUBLIC_SCHEME ?? nativeAppUrl.replace(/:\/\/.*$/, "");

export const authComponent = createClient<DataModel>(components.betterAuth);

function createAuth(ctx: GenericCtx<DataModel>) {
  return betterAuth({
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
    plugins: [
      expo(),
      convex({
        authConfig,
        jwksRotateOnTokenGenerationError: true,
      }),
      crossDomain({ siteUrl }),
    ],
  });
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
