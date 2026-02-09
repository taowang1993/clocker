import { defaultConfig } from "@tamagui/config/v5";
import { createAnimations } from "@tamagui/animations-reanimated";
import { createTamagui } from "tamagui";
import { themes, fonts, animationConfig } from "@clockie/ui";

const animations = createAnimations(animationConfig);

export const config = createTamagui({
  ...defaultConfig,
  themes,
  fonts,
  animations,
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
