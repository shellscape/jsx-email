import * as React from 'react';

type ImgElement = React.ElementRef<'img'>;
type RootProps = React.ComponentPropsWithoutRef<'img'>;

export interface ImgProps extends RootProps {}

export const Img = React.forwardRef<ImgElement, Readonly<ImgProps>>(
  ({ alt, src, width, height, style, ...props }, forwardedRef) => (
    <img
      {...props}
      ref={forwardedRef}
      data-id="@jsx-email/img"
      alt={alt}
      src={src}
      width={width}
      height={height}
      style={{
        border: 'none',
        display: 'block',
        outline: 'none',
        textDecoration: 'none',
        ...style
      }}
    />
  )
);

Img.displayName = 'Img';
