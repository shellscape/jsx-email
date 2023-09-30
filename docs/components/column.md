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

```console [pnpm]
pnpm add @jsx-email/column
```

```console [npm]
npm add @jsx-email/column
```

```console [yarn]
yarn add @jsx-email/column
```

:::

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

