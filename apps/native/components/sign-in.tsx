import { useState } from "react";
import { YStack } from "tamagui";
import { Button, Card, FormField, Spinner, Alert, Title } from "@clockie/ui";

import { authClient } from "@/lib/auth-client";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setIsLoading(true);
    setError(null);

    await authClient.signIn.email(
      { email, password },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign in");
          setIsLoading(false);
        },
        onSuccess() {
          setEmail("");
          setPassword("");
        },
        onFinished() {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <Card mt="$3">
      <Title size="$6">Sign In</Title>

      {error ? <Alert status="error" message={error} /> : null}

      <YStack gap="$3">
        <FormField
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </YStack>

      <Button onPress={handleLogin} disabled={isLoading} opacity={isLoading ? 0.5 : 1}>
        {isLoading ? <Spinner size="small" /> : "Sign In"}
      </Button>
    </Card>
  );
}
