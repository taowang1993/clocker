import { styled, YStack, type GetProps } from "tamagui";

export const Card = styled(YStack, {
  name: "Card",

  p: "$4",
  gap: "$2",
  bg: "$background",
  borderWidth: 1,
  borderColor: "$borderColor",
  rounded: "$4",

  variants: {
    elevated: {
      true: {
        borderWidth: 0,
        shadowColor: "$shadowColor",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
    },

    size: {
      sm: { p: "$2", gap: "$1" },
      md: { p: "$4", gap: "$2" },
      lg: { p: "$6", gap: "$3" },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});

export type CardProps = GetProps<typeof Card>;
