---
title: "Row"
sidebarTitle: "Row"
description: "Display a row that separates content areas horizontally in your email."
"og:image": "https://react.email/static/covers/row.png"
icon: "table-rows"
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/row
```

```console [npm]
npm add @jsx-email/row
```

```console [yarn]
yarn add @jsx-email/row
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Section } from "@jsx-email/section";
import { Row } from "@jsx-email/row";
import { Column } from "@jsx-email/column";

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

