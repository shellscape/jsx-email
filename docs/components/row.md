---
title: Row
description: Separates content boundaries horizontally
slug: row
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Column, Row, Section } from 'jsx-email';

const Email = () => {
  return (
    <Section>
      <Row>
        <Column>A</Column>
      </Row>
      <Row>
        <Column>B</Column>
      </Row>
      <Row>
        <Column>C</Column>
      </Row>
    </Section>
  );
};
```

::: info
Though the `Row` component wraps a `table` element, it is not designed to identically mimic a `table`, rather provide a visual row element that has maximum email client compatibility. Setting `cellPadding` or `cellSpacing` on a `Row` component can achieve similar results to using a custom `table` element, but it's not recommended. For custom behavior and for needs like `cellPadding` it's recommended to use a `table` element instead of `Row`.
:::

## Component Props

```ts
disableDefaultStyle?: boolean;
```

If `true`, instructs the component _not to add_ default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>`.
:::
