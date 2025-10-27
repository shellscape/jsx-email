import type { BaseProps, JsxEmailComponent } from '../types.js';
export interface ButtonProps extends BaseProps<'a'> {
    align?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    borderSize?: number;
    fontSize?: number;
    height: number;
    href?: string;
    textColor?: string;
    width: number;
    /** Only `true` if `Button` is nested in a `Background` component. Neccessary for good Outlook compatibility */
    withBackground?: boolean;
}
export declare const Button: JsxEmailComponent<ButtonProps>;
//# sourceMappingURL=button.d.ts.map