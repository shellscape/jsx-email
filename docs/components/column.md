---
title: Column
description: A JSX email component which displays columns that separate content bounaries vertically
slug: column
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Row } from '@jsx-email/row';
import { Column } from '@jsx-email/column';

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

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'td'>`.
