import type { ReactNode } from "react";
import { styled, XStack, type GetProps } from "tamagui";
import { Body } from "../typography";

const AlertFrame = styled(XStack, {
  name: "Alert",

  p: "$3",
  gap: "$2",
  rounded: "$3",
  borderWidth: 1,
  items: "center",

  variants: {
    status: {
      success: {
        bg: "$green3",
        borderColor: "$green6",
      },
      warning: {
        bg: "$yellow3",
        borderColor: "$yellow6",
      },
      error: {
        bg: "$red3",
        borderColor: "$red6",
      },
      info: {
        bg: "$blue3",
        borderColor: "$blue6",
      },
    },
  } as const,

  defaultVariants: {
    status: "info",
  },
});

export type AlertProps = GetProps<typeof AlertFrame> & {
  /** Alert message text. Alternatively, pass children for custom content. */
  message?: string;
  children?: ReactNode;
};

export function Alert({ message, children, ...props }: AlertProps) {
  return (
    <AlertFrame {...props}>
      {children ?? <Body flex={1}>{message}</Body>}
    </AlertFrame>
  );
}
