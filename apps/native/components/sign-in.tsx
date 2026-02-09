import { useState } from "react";
import { Button, Card, Spinner, Alert, Title } from "@clockie/ui";
import * as Linking from "expo-linking";

import { authClient } from "@/lib/auth-client";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: Linking.createURL("/"),
      },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess() {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <Card mt="$3">
      <Title size="$6">Sign In</Title>

      {error ? <Alert status="error" message={error} /> : null}

      <Button onPress={handleGoogleSignIn} disabled={isLoading} opacity={isLoading ? 0.5 : 1}>
        {isLoading ? <Spinner size="small" /> : "Continue with Google"}
      </Button>
    </Card>
  );
}
