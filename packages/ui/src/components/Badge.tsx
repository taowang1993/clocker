import { styled, SizableText, type GetProps } from "tamagui";

export const Badge = styled(SizableText, {
  name: "Badge",

  px: "$2",
  py: "$1",
  rounded: "$10",
  size: "$1",
  fontWeight: "600",
  bg: "$color3",
  color: "$color11",
  overflow: "hidden",

  variants: {
    status: {
      success: {
        bg: "$green3",
        color: "$green11",
      },
      warning: {
        bg: "$yellow3",
        color: "$yellow11",
      },
      error: {
        bg: "$red3",
        color: "$red11",
      },
      info: {
        bg: "$blue3",
        color: "$blue11",
      },
      brand: {
        bg: "$matcha3",
        color: "$matcha11",
      },
    },
  } as const,
});

export type BadgeProps = GetProps<typeof Badge>;
