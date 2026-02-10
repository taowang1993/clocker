import "../tamagui.generated.css";

import { env } from "@clockie/env/native";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { DarkTheme, DefaultTheme, type Theme, ThemeProvider } from "@react-navigation/native";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { ConvexReactClient } from "convex/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";

import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { authClient } from "@/lib/auth-client";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/use-color-scheme";
import { config } from "../tamagui.config";

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export const unstable_settings = {
  initialRouteName: "index",
};

const convex = new ConvexReactClient(env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      if (Platform.OS === "android") {
        setAndroidNavigationBar(colorScheme);
      }
    }
  }, [fontsLoaded, colorScheme]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme={isDarkColorScheme ? "dark" : "light"}>
      <ToastProvider>
        <ConvexBetterAuthProvider client={convex} authClient={authClient}>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(drawer)" />
                <Stack.Screen name="browser" />
                <Stack.Screen name="modal" options={{ title: "Modal", presentation: "modal", headerShown: true }} />
              </Stack>
            </GestureHandlerRootView>
            <ToastViewport bottom="$6" left={0} right={0} />
          </ThemeProvider>
        </ConvexBetterAuthProvider>
      </ToastProvider>
    </TamaguiProvider>
  );
}
