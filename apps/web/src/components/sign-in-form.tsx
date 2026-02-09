import { useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";
import { Title } from "./ui/typography";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: "google",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
      <Title>Welcome to Clockie</Title>

      <Button className="w-full max-w-md rounded-lg" disabled={isLoading} onClick={handleGoogleSignIn}>
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>
    </div>
  );
}
