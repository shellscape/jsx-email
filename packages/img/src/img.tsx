import type React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'img'>;

export interface ImgProps extends RootProps {}

export const Img: React.FC<Readonly<ImgProps>> = ({ alt, src, width, height, style, ...props }) => (
  <img
    {...props}
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
);

Img.displayName = 'Img';
