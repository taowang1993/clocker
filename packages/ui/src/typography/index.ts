import { styled, SizableText } from "tamagui";

/**
 * Display — large hero text.
 * Usage: splash screens, feature highlights.
 */
export const Display = styled(SizableText, {
  name: "Display",
  fontFamily: "$heading",
  fontWeight: "700",
  size: "$10",
  color: "$color",
});

/**
 * Title — section headings.
 * Usage: screen titles, card headers, section labels.
 */
export const Title = styled(SizableText, {
  name: "Title",
  fontFamily: "$heading",
  fontWeight: "600",
  size: "$8",
  color: "$color",
});

/**
 * Body — standard paragraph text.
 * Usage: descriptions, content blocks, list items.
 */
export const Body = styled(SizableText, {
  name: "Body",
  fontFamily: "$body",
  size: "$4",
  color: "$color",
});

/**
 * Caption — small helper text.
 * Usage: timestamps, metadata, secondary info.
 */
export const Caption = styled(SizableText, {
  name: "Caption",
  fontFamily: "$body",
  size: "$2",
  color: "$color",
  opacity: 0.6,
});

/**
 * Label — form labels and small headings.
 * Usage: input labels, badge text, section sub-headers.
 */
export const Label = styled(SizableText, {
  name: "Label",
  fontFamily: "$body",
  fontWeight: "600",
  size: "$3",
  color: "$color",
});
