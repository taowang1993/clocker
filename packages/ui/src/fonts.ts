import { createFont } from "tamagui";

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

export const fonts = {
  heading: headingFont,
  body: bodyFont,
};
