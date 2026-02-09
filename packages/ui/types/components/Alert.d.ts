import type { ReactNode } from "react";
import { type GetProps } from "tamagui";
declare const AlertFrame: any;
export type AlertProps = GetProps<typeof AlertFrame> & {
    /** Alert message text. Alternatively, pass children for custom content. */
    message?: string;
    children?: ReactNode;
};
export declare function Alert({ message, children, ...props }: AlertProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Alert.d.ts.map