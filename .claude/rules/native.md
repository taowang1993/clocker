---
paths:
  - apps/native/**
---

# Native Guidelines

## FlashList V2 Guidelines

- Prefer `contentContainerStyle` for padding; avoid padding on `style` because it affects the internal ScrollView size assumptions.
- Use `maintainVisibleContentPosition` (enabled by default) for chat-style lists; set `autoscrollToBottomThreshold` and `startRenderingFromBottom` when appropriate. Increase `drawDistance` when adding many rows on top.
- Use `onStartReached` with `onStartReachedThreshold` for "load older items" instead of hacks.
- Use the `masonry` prop (not `MasonryFlashList`) for masonry grids. Use `optimizeItemArrangement` to reduce column height differences. `overrideItemLayout` can still set `layout.span` but no longer reads size estimates.
- Do not use deprecated props: `estimatedItemSize`, `estimatedListSize`, `estimatedFirstItemOffset`, `inverted`, `onBlankArea`, `disableHorizontalListHeightMeasurement`, `disableAutoLayout`. `MasonryFlashList` and its `getColumnFlex` are deprecated.
- For item-level state that affects layout, prefer `useLayoutState` or `useRecyclingState` so FlashList can manage recycling correctly.
- For mapping keys inside nested lists, use `useMappingHelper()` to generate stable keys.
- Use `useFlashListContext` to access the FlashList ref or ScrollView ref from child components or `CellRendererComponent`.
- Use `LayoutCommitObserver` to detect when FlashList(s) finish layout commits.
- `onCommitLayoutEffect` fires before layout is committed; avoid `setState` inside it to prevent infinite loops. Ensure FlashList props are memoized.
- `maxItemsInRecyclePool` is available when item type count is very large.

## Tamagui Guidelines

- `tamagui.config.ts` is the source of truth for themes, tokens, animations, shorthands, and custom theme keys. Do not duplicate or redefine token/theme values elsewhere. If a new token or theme key is needed, it should be added in `tamagui.config.ts` first.

Interaction states (no default Tamagui hover/focus):
- Do not rely on Tamagui defaults for interaction states. Use `pressStyle` for feedback.
- Hover effects are not used in Clockie. If a component has a built-in hover, neutralize it (no visual change) or use existing UI primitives that already do this.
- Avoid the `unstyled` prop. It opts out of theming and is discouraged by lint rules.
- Focus rings/outlines are not used in Clockie. Keep focus styles subtle and inline with the base visuals (no ring or outline).