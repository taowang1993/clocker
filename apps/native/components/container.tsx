import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "tamagui";

const StyledSafeArea = styled(SafeAreaView, {
  flex: 1,
  bg: "$background",
});

export function Container({ children }: { children: React.ReactNode }) {
  return <StyledSafeArea>{children}</StyledSafeArea>;
}
