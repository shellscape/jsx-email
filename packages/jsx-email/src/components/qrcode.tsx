import * as React from 'react';

import qrcode, { type QRCodeToBufferOptions } from 'qrcode';

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
  src = '',
  width,
  height,
  style,
  size,
  ...props
}) => {
  const qrCodeOptions = {
    errorCorrectionLevel: correctionLevel,
    margin: 1,
    type: 'png',
    width: size
  } satisfies QRCodeToBufferOptions;
  const qrCodeBuffer = qrcode.toBuffer(src, qrCodeOptions);

  return (
    <img
      {...props}
      data-id="jsx-email/qr"
      alt={alt}
      // @ts-ignore
      src={qrCodeBuffer}
      width={width && width < size ? size : width || size}
      height={height && height < size ? size : height || size}
      style={{
        ...style
      }}
    />
  );
};
