import { YStack } from "tamagui";
import { Title } from "@clockie/ui";

import { Container } from "@/components/container";

export default function Modal() {
  return (
    <Container>
      <YStack flex={1} p="$4">
        <Title>Modal</Title>
      </YStack>
    </Container>
  );
}
