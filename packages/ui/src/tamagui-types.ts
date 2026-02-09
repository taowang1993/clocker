// Type augmentation so styled() and JSX props in this package
// can resolve shorthands (p, bg, mt, items, etc.), the
// onlyAllowShorthands setting, and custom matcha theme tokens.
// The actual runtime config is created in the consuming app
// (apps/native/tamagui.config.ts).

import { createTamagui } from "tamagui";
import { defaultConfig } from "@tamagui/config/v5";
import { themes } from "./themes";

type Conf = ReturnType<
  typeof createTamagui<
    Omit<typeof defaultConfig, "themes"> & { themes: typeof themes }
  >
>;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
