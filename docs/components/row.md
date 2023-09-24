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

```sh npm
npm install @react-email/row -E
```

```sh yarn
yarn add @react-email/row -E
```

```sh pnpm
pnpm add @react-email/row -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Section } from "@react-email/section";
import { Row } from "@react-email/row";
import { Column } from "@react-email/column";

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

