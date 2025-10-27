import React from 'react';
export interface BackgroundProps extends Omit<React.ComponentPropsWithoutRef<'td'>, 'height' | 'width' | 'bgcolor'> {
    bgColor?: string;
    bgRepeat?: 'repeat' | 'no-repeat';
    height?: number;
    src: string;
    width?: number;
}
export declare const Background: (props: BackgroundProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=background.d.ts.map