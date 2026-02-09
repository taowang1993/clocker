import type { ReactNode } from "react";
import { YStack } from "tamagui";
import { Label, Caption } from "../typography";
import { Input, type InputProps } from "./Input";

type FormFieldProps = {
  /** Field label text */
  label: string;
  /** Error message — when set, input shows error styling */
  error?: string | null;
  /** Override the default Input with a custom input element */
  children?: ReactNode;
} & InputProps;

export function FormField({
  label,
  error,
  children,
  ...inputProps
}: FormFieldProps) {
  return (
    <YStack gap="$1.5">
      <Label>{label}</Label>
      {children ?? <Input error={!!error} {...inputProps} />}
      {error ? (
        <Caption color="$red10" opacity={1}>
          {error}
        </Caption>
      ) : null}
    </YStack>
  );
}
