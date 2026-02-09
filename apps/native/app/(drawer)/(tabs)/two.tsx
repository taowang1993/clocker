import { H2, Paragraph, ScrollView, YStack } from "tamagui";

import { Container } from "@/components/container";

export default function TabTwo() {
  return (
    <Container>
      <ScrollView flex={1} p="$4">
        <YStack py="$4">
          <H2>Tab Two</H2>
          <Paragraph opacity={0.7}>Discover more features and content</Paragraph>
        </YStack>
      </ScrollView>
    </Container>
  );
}
