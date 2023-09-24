---
title: 'Column'
sidebarTitle: 'Column'
description: 'Display a column that separates content areas vertically in your email. A column needs to be used in combination with a Row component.'
'og:image': 'https://react.email/static/covers/column.png'
icon: 'columns-3'
---

## Install

Install component from your command line.

::: code-group

```sh npm
npm install @react-email/column -E
```

```sh yarn
yarn add @react-email/column -E
```

```sh pnpm
pnpm add @react-email/column -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Row } from '@react-email/row';
import { Column } from '@react-email/column';

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

