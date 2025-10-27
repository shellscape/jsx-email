import type { BaseProps, JsxEmailComponent } from '../types.js';
type paddingType = string | number | undefined;
interface PaddingProperties {
    padding?: paddingType;
    paddingBottom?: paddingType;
    paddingLeft?: paddingType;
    paddingRight?: paddingType;
    paddingTop?: paddingType;
}
/**
 * converts padding value to `px` equivalent.
 * @example "1em" => 16
 */
export declare function convertToPx(value: paddingType): number;
/**
 * Parses all the values out of a padding string to get the value for all padding props in `px`
 * @example e.g. "10px" => pt: 10, pr: 10, pb: 10, pl: 10
 */
export declare function parsePadding({ padding, paddingTop, paddingRight, paddingBottom, paddingLeft }: PaddingProperties): {
    pb: number;
    pl: number;
    pr: number;
    pt: number;
} | undefined;
type RootProps = BaseProps<'a'>;
export interface ButanProps extends RootProps {
}
export declare const pxToPt: (px: number) => number | null;
export declare const Butan: JsxEmailComponent<ButanProps>;
export {};
//# sourceMappingURL=butan.d.ts.map