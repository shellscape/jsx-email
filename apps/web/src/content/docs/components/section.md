---
title: 'Section'
description: 'Creates section boundaries that can be formatted with columns and rows'
slug: section
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Column, Row, Section, Text } from 'jsx-email';

const Email = () => {
  return (
    <>
      {/* A simple `section` */}
      <Section>
        <Text>Hello World</Text>
      </Section>

      {/* Formatted with `rows` and `columns` */}
      <Section>
        <Row>
          <Column>Column 1, Row 1</Column>
          <Column>Column 2, Row 1</Column>
        </Row>
        <Row>
          <Column>Column 1, Row 2</Column>
          <Column>Column 2, Row 2</Column>
        </Row>
      </Section>
    </>
  );
};
```

::: info
Though the `Section` component wraps a `<table>` element, it's not designed to mimic a `table` and has a specific use for email client compatibility and does not support setting `cellPadding` or `cellSpacing`. If attempting to use `Section` as a table, please consider using a `<table>` element. If using `Row` and `Column` with a `Section` and the need arises to set either `cellPadding` or `cellSpacing`, please set those properties on the appropriate `Row` component(s).
:::

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>` except for `cellPadding` and `cellSpacing`.
