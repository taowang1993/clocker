import { api } from "@clockie/backend/convex/_generated/api";
import { Button, Card, Body, Title } from "@clockie/ui";
import { useConvexAuth, useQuery } from "convex/react";
import { Circle, ScrollView, XStack, YStack } from "tamagui";

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
          <Title>Clockie</Title>

          {user ? (
            <Card>
              <Body>
                Welcome, <Body fontWeight="bold">{user.name}</Body>
              </Body>
              <Body opacity={0.7}>{user.email}</Body>
              <Button intent="destructive" onPress={() => authClient.signOut()} mt="$2">
                Sign Out
              </Button>
            </Card>
          ) : null}

          <Card>
            <Body fontWeight="bold">API Status</Body>
            <XStack items="center" gap="$2">
              <Circle size={8} bg={healthCheck ? "$green9" : "$red9"} />
              <Body opacity={0.7}>
                {healthCheck === undefined
                  ? "Checking..."
                  : healthCheck === "OK"
                    ? "Connected to API"
                    : "API Disconnected"}
              </Body>
            </XStack>
          </Card>

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
