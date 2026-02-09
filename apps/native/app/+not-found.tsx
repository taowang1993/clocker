import { Link, Stack } from "expo-router";
import { Button, H3, Paragraph, Text, YStack } from "tamagui";

import { Container } from "@/components/container";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Container>
        <YStack flex={1} justify="center" items="center" p="$4">
          <YStack items="center" gap="$3">
            <Text fontSize={48}>🤔</Text>
            <H3 text="center">Page Not Found</H3>
            <Paragraph text="center" opacity={0.7}>
              Sorry, the page you're looking for doesn't exist.
            </Paragraph>
            <Link href="/" asChild>
              <Button theme="blue">Go to Home</Button>
            </Link>
          </YStack>
        </YStack>
      </Container>
    </>
  );
}
