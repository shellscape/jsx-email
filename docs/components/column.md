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

To set background color in html email, it wraps the `bgcolor` prop of `<td>` tags

```tsx
bgImage: string;
```

To set background images in html email, it wraps the `background` prop of `<td>` tags

:::tip
This component expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'td'>`.
:::
