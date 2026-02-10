import { Body, Title } from "@clockie/ui";
import { YStack } from "tamagui";

export default function BrowserIndex() {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="$background"
      style={{ height: "100%" } as any}
    >
      <Title color="$color11">Clockie</Title>
      <Body color="$color9" mt="$2">
        Select a conversation to get started
      </Body>
    </YStack>
  );
}
