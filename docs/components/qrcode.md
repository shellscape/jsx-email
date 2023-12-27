---
title: QR Code
description: Displays a QR code image
slug: qr-code
type: component
---

<!--@include: @/include/header.md-->

::: warning
This component utilizes the base64 image format to inline the QR Code image. Please note that not all email clients support that image format. See https://www.caniemail.com/features/image-base64/ for more information.
:::

<!--@include: @/include/install.md-->

## Usage

Add the `QrCode` component to your email template to display a QR code. You can specify the content of the QR code, its size, and the error correction level. Include styles as needed.

```jsx
import { QrCode } from 'jsx-email';

const Email = () => {
  return <QrCode src="https://example.com" alt="QR Code" size={300} correctionLevel="H" />;
};
```

::: tip
The `QrCode` component generates a QR code based on the provided `src` prop. It supports various customization options such as size and error correction level.
:::

## Component Props

```ts
interface QrProps extends RootProps {
  correctionLevel: 'L' | 'M' | 'H';
  height?: number;
  size: number;
  src: string;
  style?: React.CSSProperties;
  width?: number;
}
```

### Props

```ts
correctionLevel: 'L' | 'M' | 'H';
```

The error correction level for the QR code. Higher levels offer more resilience at the cost of reduced storage capacity. The available levels are 'L' (low), 'M' (medium), and 'H' (high).

```ts
height?: number;
```

(Optional) The height of the wrapping image in pixels. If not provided, the `size` value will be used.

```ts
size: number;
```

The size of the QR code in pixels. This size will apply to both width and height unless overridden by specific `width` or `height` props.

```ts
src: string;
```

The data or URL you want to encode in the QR code. The QR code will be generated dynamically based on this content.

```ts
style?: React.CSSProperties;
```

(Optional) Custom CSS styles to be applied to the QR code image.

```ts
width?: number;
```

(Optional) The width of the wrapping image in pixels. If not provided, the `size` value will be used.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'img'>`
:::
