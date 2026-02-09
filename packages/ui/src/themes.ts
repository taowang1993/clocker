import { createV5Theme, defaultChildrenThemes } from "@tamagui/config/v5";
import { matcha, matchaDark } from "./colors/matcha";

const generatedThemes = createV5Theme({
  childrenThemes: {
    ...defaultChildrenThemes,
    matcha: { light: matcha, dark: matchaDark },
  },
});

/**
 * Ensure brand tokens exist across all themes so components can safely
 * reference $matcha* values regardless of the active theme.
 */
function addMatchaTokens<T extends Record<string, Record<string, unknown>>>(
  themes: T,
): T {
  const result = {} as Record<string, Record<string, unknown>>;
  for (const [name, theme] of Object.entries(themes)) {
    const isDark = name.startsWith("dark");
    result[name] = {
      ...theme,
      ...(isDark ? matchaDark : matcha),
    };
  }
  return result as T;
}

export const themes = addMatchaTokens(generatedThemes);
