import { useState } from "react";
import { Spinner, Button, Input, Text, YStack } from "tamagui";

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
    <YStack gap="$3" p="$4" mt="$3" bg="$background" borderWidth={1} borderColor="$borderColor">
      <Text fontSize="$6" fontWeight="bold">Sign In</Text>

      {error ? (
        <YStack p="$2" bg="$red2">
          <Text color="$red10" fontSize="$3">{error}</Text>
        </YStack>
      ) : null}

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={handleLogin} disabled={isLoading} theme="blue" opacity={isLoading ? 0.5 : 1}>
        {isLoading ? <Spinner size="small" /> : "Sign In"}
      </Button>
    </YStack>
  );
}
