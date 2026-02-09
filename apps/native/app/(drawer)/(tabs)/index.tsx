import { H2, Paragraph, ScrollView, YStack } from "tamagui";

import { Container } from "@/components/container";

export default function TabOne() {
  return (
    <Container>
      <ScrollView flex={1} p="$4">
        <YStack py="$4">
          <H2>Tab One</H2>
          <Paragraph opacity={0.7}>Explore the first section of your app</Paragraph>
        </YStack>
      </ScrollView>
    </Container>
  );
}
