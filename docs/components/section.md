---
title: 'Section'
description: 'Creates section bordaries that can be formatted with columns and rows'
slug: section
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Section } from '@jsx-email/section';
import { Column } from '@jsx-email/column';
import { Row } from '@jsx-email/row';
import { Text } from '@jsx-email/text';

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

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>`.
