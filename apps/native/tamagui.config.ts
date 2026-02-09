import { defaultConfig } from "@tamagui/config/v5";
import { createAnimations } from "@tamagui/animations-reanimated";
import { createFont, createTamagui } from "tamagui";

const animations = createAnimations({
  "100ms": {
    type: "timing",
    duration: 100,
  },
  bouncy: {
    type: "spring",
    damping: 9,
    mass: 0.9,
    stiffness: 150,
  },
  lazy: {
    type: "spring",
    damping: 18,
    stiffness: 50,
  },
  medium: {
    type: "spring",
    damping: 15,
    stiffness: 120,
    mass: 1,
  },
  slow: {
    type: "spring",
    damping: 15,
    stiffness: 40,
  },
  quick: {
    type: "spring",
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  tooltip: {
    type: "spring",
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
});

const headingFont = createFont({
  family: "Inter",
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: "400",
    6: "600",
    7: "700",
  },
  letterSpacing: {
    5: 0,
    6: -1,
    7: -1.5,
    8: -2,
    9: -2.5,
  },
  face: {
    400: { normal: "Inter" },
    600: { normal: "InterBold" },
    700: { normal: "InterBold" },
  },
});

const bodyFont = createFont({
  ...headingFont,
  weight: {
    1: "400",
    6: "600",
    7: "700",
  },
  face: {
    400: { normal: "Inter" },
    600: { normal: "InterBold" },
    700: { normal: "InterBold" },
  },
});

export const config = createTamagui({
  ...defaultConfig,
  animations,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  settings: {
    ...defaultConfig.settings,
    fastSchemeChange: true,
  },
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
