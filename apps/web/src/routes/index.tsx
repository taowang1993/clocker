import { createFileRoute } from "@tanstack/react-router";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";

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
        <div>Loading...</div>
      </AuthLoading>
    </>
  );
}
