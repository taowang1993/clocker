import { styled, Button as TamaguiButton, type GetProps } from "tamagui";

export const Button = styled(TamaguiButton, {
  name: "Button",

  // Default to matcha brand theme
  theme: "matcha",

  // Press feedback (hover and focus rings are disabled at theme level)
  pressStyle: {
    opacity: 0.85,
    scale: 0.97,
  },

  variants: {
    intent: {
      primary: {
        // Uses default matcha theme
      },
      secondary: {
        theme: "gray",
      },
      destructive: {
        theme: "red",
      },
    },

    ghost: {
      true: {
        chromeless: true,
      },
    },
  } as const,

  defaultVariants: {
    intent: "primary",
  },
});

export type ButtonProps = GetProps<typeof Button>;
