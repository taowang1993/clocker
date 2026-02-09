import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Display — large hero text.
 * Usage: splash screens, feature highlights.
 * Native equivalent: size $10 (46px), weight 700
 */
function Display({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("text-5xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

/**
 * Title — section headings.
 * Usage: screen titles, card headers, section labels.
 * Native equivalent: size $8 (23px), weight 600
 */
function Title({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

/**
 * Body — standard paragraph text.
 * Usage: descriptions, content blocks, list items.
 * Native equivalent: size $4 (14px), weight 400
 */
function Body({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm", className)} {...props} />;
}

/**
 * Caption — small helper text.
 * Usage: timestamps, metadata, secondary info.
 * Native equivalent: size $2 (12px), weight 400, opacity 0.6
 */
function Caption({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Display, Title, Body, Caption };
