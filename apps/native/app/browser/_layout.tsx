import { Ionicons } from "@expo/vector-icons";
import { Redirect, Slot, usePathname, useRouter } from "expo-router";
import { Platform } from "react-native";
import { Separator, XStack, YStack } from "tamagui";

import { Spinner } from "@clockie/ui";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";

const SIDEBAR_WIDTH = 240;

export default function BrowserLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
  const { data: session, isPending } = authClient.useSession();
  const fullBleedStyle =
    Platform.OS === "web"
      ? ({ height: "100vh", width: "100vw" } as const)
      : ({ flex: 1 } as const);
  const pointerProps = Platform.OS === "web" ? { cursor: "pointer" } : {};
  const activeIconColor = theme.primary;
  const inactiveIconColor = theme.text;

  if (isPending) {
    return (
      <YStack
        flex={1}
        backgroundColor="$background"
        alignItems="center"
        justifyContent="center"
        style={fullBleedStyle as any}
      >
        <Spinner size="large" color="$color10" />
      </YStack>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  const isHomeActive = pathname === "/browser" || pathname === "/browser/";

  return (
    <XStack
      flex={1}
      backgroundColor="$background"
      style={fullBleedStyle as any}
    >
      {/* Sidebar */}
      <YStack
        width={SIDEBAR_WIDTH}
        backgroundColor="$background"
        borderRightWidth={1}
        borderRightColor="$borderColor"
        paddingTop="$4"
        paddingBottom="$4"
      >
        {/* Nav items */}
        <YStack paddingHorizontal="$2" gap="$1">
          <XStack
            paddingVertical="$2.5"
            paddingHorizontal="$3"
            borderRadius="$4"
            alignItems="center"
            gap="$3"
            backgroundColor={isHomeActive ? "$color4" : "transparent"}
            pressStyle={{ backgroundColor: "$color4" }}
            onPress={() => router.push("/browser")}
            {...pointerProps}
          >
            <Ionicons
              name="home-outline"
              size={18}
              color={isHomeActive ? activeIconColor : inactiveIconColor}
            />
          </XStack>
        </YStack>

        <YStack flex={1} />

        {/* Bottom actions */}
        <Separator marginVertical="$2" />
        <YStack paddingHorizontal="$2">
          <XStack
            paddingVertical="$2.5"
            paddingHorizontal="$3"
            borderRadius="$4"
            alignItems="center"
            gap="$3"
            pressStyle={{ backgroundColor: "$color4" }}
            {...pointerProps}
          >
            <Ionicons name="settings-outline" size={18} color={inactiveIconColor} />
          </XStack>
        </YStack>
      </YStack>

      {/* Content */}
      <YStack flex={1} backgroundColor="$background">
        <Slot />
      </YStack>
    </XStack>
  );
}
