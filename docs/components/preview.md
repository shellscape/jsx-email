---
title: 'Preview'
sidebarTitle: 'Preview'
description: 'A preview text that will be displayed in the inbox of the recipient.'
'og:image': 'https://react.email/static/covers/preview.png'
icon: 'input-text'
---

::: tip
  Email clients have this concept of “preview text” which gives insight into
  what's inside the email before you open. A good practice is to keep that text
  under 90 characters.
:::

## Install

Install component from your command line.

::: code-group

```sh npm
npm install @react-email/preview -E
```

```sh yarn
yarn add @react-email/preview -E
```

```sh pnpm
pnpm add @react-email/preview -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Preview } from '@react-email/preview';

const Email = () => {
  return <Preview>Email preview text</Preview>;
};
```

