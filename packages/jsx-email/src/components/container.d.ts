import type { BaseProps, JsxEmailComponent } from '../types.js';
export interface ContainerProps extends Omit<BaseProps<'table'>, 'align' | 'cellPadding' | 'cellSpacing' | 'width'> {
    alignment?: 'center' | 'left' | 'right';
    containerWidth?: number;
}
export declare const Container: JsxEmailComponent<ContainerProps>;
//# sourceMappingURL=container.d.ts.map