import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader2Icon } from "lucide-react";

import SignInForm from "@/components/sign-in-form";
import UserMenu from "@/components/user-menu";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <>
      <Authenticated>
        <UserMenu />
      </Authenticated>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <AuthLoading>
        <div className="grid h-full place-items-center bg-background">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2Icon className="h-5 w-5 animate-spin" />
            <span>Loading</span>
          </div>
        </div>
      </AuthLoading>
    </>
  );
}
