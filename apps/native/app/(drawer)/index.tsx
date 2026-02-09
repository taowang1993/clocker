import { api } from "@clockie/backend/convex/_generated/api";
import { useConvexAuth, useQuery } from "convex/react";
import { Button, Circle, H2, Paragraph, ScrollView, Text, XStack, YStack } from "tamagui";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const healthCheck = useQuery(api.healthCheck.get);
  const { isAuthenticated } = useConvexAuth();
  const user = useQuery(api.auth.getCurrentUser, isAuthenticated ? {} : "skip");

  return (
    <Container>
      <ScrollView flex={1}>
        <YStack p="$4" gap="$4">
          <H2>BETTER T STACK</H2>

          {user ? (
            <YStack p="$4" bg="$background" borderWidth={1} borderColor="$borderColor" gap="$2">
              <Text fontSize="$4">
                Welcome, <Text fontWeight="bold">{user.name}</Text>
              </Text>
              <Paragraph opacity={0.7}>{user.email}</Paragraph>
              <Button theme="red" onPress={() => authClient.signOut()} mt="$2">
                Sign Out
              </Button>
            </YStack>
          ) : null}

          <YStack p="$4" bg="$background" borderWidth={1} borderColor="$borderColor" gap="$2">
            <Text fontWeight="bold">API Status</Text>
            <XStack items="center" gap="$2">
              <Circle size={8} bg={healthCheck ? "$green9" : "$red9"} />
              <Paragraph opacity={0.7}>
                {healthCheck === undefined
                  ? "Checking..."
                  : healthCheck === "OK"
                    ? "Connected to API"
                    : "API Disconnected"}
              </Paragraph>
            </XStack>
          </YStack>

          {!user && (
            <>
              <SignIn />
              <SignUp />
            </>
          )}
        </YStack>
      </ScrollView>
    </Container>
  );
}
