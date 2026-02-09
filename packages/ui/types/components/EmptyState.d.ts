import type { ReactNode } from "react";
type EmptyStateProps = {
    /** Icon or illustration to display */
    icon?: ReactNode;
    /** Main heading */
    title: string;
    /** Supporting description */
    description?: string;
    /** Call-to-action element (e.g. a Button) */
    action?: ReactNode;
};
export declare function EmptyState({ icon, title, description, action, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=EmptyState.d.ts.map