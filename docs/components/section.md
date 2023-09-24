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

```sh npm
npm install @react-email/section -E
```

```sh yarn
yarn add @react-email/section -E
```

```sh pnpm
pnpm add @react-email/section -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Section } from '@react-email/section';
import { Column } from '@react-email/column';
import { Row } from '@react-email/row';
import { Text } from '@react-email/text';

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

