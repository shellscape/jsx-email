---
title: 'HTML'
sidebarTitle: 'HTML'
description: 'A React html component to wrap emails.'
'og:image': 'https://react.email/static/covers/html.png'
icon: 'file-code'
---

## Install

Install component from your command line.

::: code-group

```sh npm
npm install @react-email/html -E
```

```sh yarn
yarn add @react-email/html -E
```

```sh pnpm
pnpm add @react-email/html -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@react-email/button';
import { Html } from '@react-email/html';

const Email = () => {
  return (
    <Html lang="en" dir="ltr">
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Html>
  );
};
```

## Props

<ResponseField name="lang" type="string" default="en">
  Identify the language of text content on the email
</ResponseField>
<ResponseField name="dir" type="string" default="ltr" >
  Identify the direction of text content on the email
</ResponseField>

