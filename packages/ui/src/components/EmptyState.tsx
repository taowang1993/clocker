import type { ReactNode } from "react";
import { YStack } from "tamagui";
import { Body, Caption } from "../typography";

type EmptyStateProps = {
  /** Icon or illustration to display */
  icon?: ReactNode;
  /** Main heading */
  title: string;
  /** Supporting description */
  description?: string;
  /** Call-to-action element (e.g. a Button) */
  action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <YStack flex={1} items="center" justify="center" p="$6" gap="$3">
      {icon}
      <Body fontWeight="600" text="center">
        {title}
      </Body>
      {description ? (
        <Caption text="center">{description}</Caption>
      ) : null}
      {action}
    </YStack>
  );
}
