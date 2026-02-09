import { useState } from "react";
import { YStack } from "tamagui";
import { Button, Card, FormField, Spinner, Alert, Title } from "@clockie/ui";

import { authClient } from "@/lib/auth-client";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    setIsLoading(true);
    setError(null);

    await authClient.signUp.email(
      { name, email, password },
      {
        onError(error) {
          setError(error.error?.message || "Failed to sign up");
          setIsLoading(false);
        },
        onSuccess() {
          setName("");
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
      <Title size="$6">Create Account</Title>

      {error ? <Alert status="error" message={error} /> : null}

      <YStack gap="$3">
        <FormField
          label="Name"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

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

      <Button onPress={handleSignUp} disabled={isLoading} opacity={isLoading ? 0.5 : 1}>
        {isLoading ? <Spinner size="small" /> : "Sign Up"}
      </Button>
    </Card>
  );
}
