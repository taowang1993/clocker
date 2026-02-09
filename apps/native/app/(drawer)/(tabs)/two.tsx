import { ScrollView, YStack } from "tamagui";
import { Title, Body } from "@clockie/ui";

import { Container } from "@/components/container";

export default function TabTwo() {
  return (
    <Container>
      <ScrollView flex={1} p="$4">
        <YStack py="$4">
          <Title>Tab Two</Title>
          <Body opacity={0.7}>Discover more features and content</Body>
        </YStack>
      </ScrollView>
    </Container>
  );
}
