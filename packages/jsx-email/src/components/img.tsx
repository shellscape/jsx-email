import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface ImgProps extends BaseProps<'img'> {}

const configDds = config.current.render.disableDefaultStyle;
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/img' } : {};

export const Img: JsxEmailComponent<ImgProps> = ({
  alt,
  disableDefaultStyle,
  height,
  src,
  style,
  width,
  ...props
}) => (
  <img
    {...props}
    {...debugProps}
    alt={alt}
    src={src}
    width={width}
    height={height}
    style={{
      ...(configDds || disableDefaultStyle
        ? {}
        : { border: 'none', display: 'block', outline: 'none', textDecoration: 'none' }),
      ...style
    }}
  />
);

Img.displayName = 'Img';
