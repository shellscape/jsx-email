import { type BuiltinLanguage } from 'shiki';
import type { BaseProps, JsxEmailComponent } from '../types.js';
type RootProps = BaseProps<'pre'>;
export interface CodeProps extends RootProps {
    children: string;
    language: BuiltinLanguage;
    theme?: string;
}
export declare const Code: JsxEmailComponent<CodeProps>;
export {};
//# sourceMappingURL=code.d.ts.map