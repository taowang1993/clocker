import { ScrollView, YStack } from "tamagui";
import { Title, Body } from "@clockie/ui";

import { Container } from "@/components/container";

export default function TabOne() {
  return (
    <Container>
      <ScrollView flex={1} p="$4">
        <YStack py="$4">
          <Title>Tab One</Title>
          <Body opacity={0.7}>Explore the first section of your app</Body>
        </YStack>
      </ScrollView>
    </Container>
  );
}
