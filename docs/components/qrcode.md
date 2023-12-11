---
title: QR Code
description: Displays a QR code image
slug: qr-code
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the `QrCode` component to your email template to display a QR code. You can specify the content of the QR code, its size, and the error correction level. Include styles as needed.

```jsx
import { QrCode } from 'jsx-email';

const Email = () => {
  return (
    <QrCode 
      src="https://example.com" 
      alt="QR Code" 
      size={300} 
      correctionLevel="H" 
    />
  );
};
```

::: tip
The `QrCode` component generates a QR code based on the provided `src` prop. It supports various customization options such as size and error correction level.
:::

## Component Props

In addition to expressing all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'img'>`, `QrCode` accepts the following custom props:

### Props

```ts
correctionLevel: 'L' | 'M' | 'H';
```

The error correction level for the QR code. Higher levels offer more resilience at the cost of reduced storage capacity. The available levels are 'L' (low), 'M' (medium), and 'H' (high).

```ts
size: number;
```

The size of the QR code in pixels. This size will apply to both width and height unless overridden by specific `width` or `height` props.

```ts
width?: number;
```

(Optional) The width of the wrapping image in pixels. If not provided, the `size` value will be used.

```ts
height?: number;
```

(Optional) The height of the wrapping image in pixels. If not provided, the `size` value will be used.

```ts
style?: React.CSSProperties;
```

(Optional) Custom CSS styles to be applied to the QR code image.

::: note
Ensure that the `src` prop contains the data or URL you want to encode in the QR code. The QR code will be generated dynamically based on this content.
:::
