import { Redirect } from "expo-router";
import { Platform, useWindowDimensions } from "react-native";
import { YStack } from "tamagui";

import { Spinner } from "@clockie/ui";
import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { authClient } from "@/lib/auth-client";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const { data: session, isPending } = authClient.useSession();
  const minDimension = Math.min(width, height);
  const isTablet =
    Platform.OS !== "web" && ((Platform.OS === "ios" && Platform.isPad) || minDimension >= 600);
  const isWideEnough = width > 768;

  if (isPending) {
    return (
      <Container>
        <YStack flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$color10" />
        </YStack>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container>
        <YStack flex={1} justifyContent="center" p="$4">
          <SignIn />
        </YStack>
      </Container>
    );
  }

  if ((Platform.OS === "web" && isWideEnough) || isTablet) {
    return <Redirect href="/browser" />;
  }

  return <Redirect href="/(drawer)" />;
}
