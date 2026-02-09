import { Link, Stack } from "expo-router";
import { Text, YStack } from "tamagui";
import { Button, Title, Body } from "@clockie/ui";

import { Container } from "@/components/container";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container>
        <YStack flex={1} justify="center" items="center" p="$4">
          <YStack items="center" gap="$3">
            <Text fontSize={48}>🤔</Text>
            <Title text="center">Page Not Found</Title>
            <Body text="center" opacity={0.7}>
              Sorry, the page you're looking for doesn't exist.
            </Body>
            <Link href="/" asChild>
              <Button>Go to Home</Button>
            </Link>
          </YStack>
        </YStack>
      </Container>
    </>
  );
}
