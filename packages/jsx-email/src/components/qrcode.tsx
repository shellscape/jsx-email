import * as React from 'react';

import qrcode from 'qrcode';

type RootProps = React.ComponentPropsWithoutRef<'img'>;

export interface QrProps extends RootProps {
  correctionLevel: 'L' | 'M' | 'H';
  height?: number;
  size: number;
  style?: React.CSSProperties;
  width?: number;
}

export const QrCode: React.FC<Readonly<QrProps>> = ({
  correctionLevel,
  alt,
  src,
  width,
  height,
  style,
  size,
  ...props
}) => {
  const qrCodeOptions = {
    errorCorrectionLevel: correctionLevel,
    height: size,
    margin: 1,
    type: 'image/png',
    width: size
  };
  const qrCodeBuffer = qrcode.toBuffer(src, qrCodeOptions);

  return (
    <img
      {...props}
      data-id="jsx-email/qr"
      alt={alt}
      src={qrCodeBuffer}
      width={width && width < size ? size : width || size}
      height={height && height < size ? size : height || size}
      style={{
        ...style
      }}
    />
  );
};
