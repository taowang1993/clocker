import { styled, Input as TamaguiInput, type GetProps } from "tamagui";

export const Input = styled(TamaguiInput, {
  name: "Input",

  size: "$4",
  borderWidth: 1,
  borderColor: "$borderColor",
  bg: "$background",
  color: "$color",

  // Subtle focus: border shifts to matcha (no ring — disabled at theme level)
  focusStyle: {
    borderColor: "$matcha8",
  },

  variants: {
    error: {
      true: {
        borderColor: "$red8",
        focusStyle: {
          borderColor: "$red9",
        },
      },
    },
  } as const,
});

export type InputProps = GetProps<typeof Input>;
