---
title: "Section"
sidebarTitle: "Section"
description: "Display a section that can also be formatted using rows and columns."
"og:image": "https://react.email/static/covers/section.png"
icon: "rectangles-mixed"
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/section
```

```console [npm]
npm add @jsx-email/section
```

```console [yarn]
yarn add @jsx-email/section
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Section } from '@jsx-email/section';
import { Column } from '@jsx-email/column';
import { Row } from '@jsx-email/row';
import { Text } from '@jsx-email/text';

const Email = () => {
  return (
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
  );
};
```

