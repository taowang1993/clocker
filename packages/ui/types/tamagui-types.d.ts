import { createTamagui } from "tamagui";
import { defaultConfig } from "@tamagui/config/v5";
import { themes } from "./themes";
type Conf = ReturnType<typeof createTamagui<Omit<typeof defaultConfig, "themes"> & {
    themes: typeof themes;
}>>;
declare module "tamagui" {
    interface TamaguiCustomConfig extends Conf {
    }
}
export {};
//# sourceMappingURL=tamagui-types.d.ts.map