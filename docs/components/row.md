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

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>`.
