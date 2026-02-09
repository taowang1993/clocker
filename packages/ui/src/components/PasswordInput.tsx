import { useState } from "react";
import { XStack } from "tamagui";
import { Body } from "../typography";
import { Button } from "./Button";
import { Input, type InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "secureTextEntry">;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <XStack items="center">
      <Input
        {...props}
        flex={1}
        secureTextEntry={!visible}
        pr="$10"
      />
      <Button
        chromeless
        ghost
        size="$2"
        position="absolute"
        r="$1"
        onPress={() => setVisible((v: boolean) => !v)}
        theme={undefined}
      >
        <Body size="$2" opacity={0.6}>
          {visible ? "Hide" : "Show"}
        </Body>
      </Button>
    </XStack>
  );
}
