import { styled, Spinner as TamaguiSpinner, type GetProps } from "tamagui";

export const Spinner = styled(TamaguiSpinner, {
  name: "Spinner",
  color: "$matcha9",
});

export type SpinnerProps = GetProps<typeof Spinner>;
