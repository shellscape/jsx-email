---
title: Column
description: A JSX email component which displays columns that separate content bounaries vertically
slug: column
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Column, Row } from 'jsx-email';

const Email = () => {
  return (
    <Row>
      <Column>A</Column>
      <Column>B</Column>
      <Column>C</Column>
    </Row>
  );
};
```

## Component Props

```tsx
export interface ColumnProps extends BaseProps<'td'> {
  bgColor?: string;
  bgImage?: string;
}
```

```tsx
bgColor: string;
```

Used to set the background color in HTML email by wrapping the `bgcolor` property of `<td>` elements

```tsx
bgImage: string;
```

Used to set background images in HTML email by wrapping the `background` property of `<td>` elements

:::tip
This component expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'td'>`.
:::
