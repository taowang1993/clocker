import type { ReactNode } from "react";
import { type InputProps } from "./Input";
type FormFieldProps = {
    /** Field label text */
    label: string;
    /** Error message — when set, input shows error styling */
    error?: string | null;
    /** Override the default Input with a custom input element */
    children?: ReactNode;
} & InputProps;
export declare function FormField({ label, error, children, ...inputProps }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormField.d.ts.map