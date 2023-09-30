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

```console [pnpm]
pnpm add @jsx-email/html
```

```console [npm]
npm add @jsx-email/html
```

```console [yarn]
yarn add @jsx-email/html
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@jsx-email/button';
import { Html } from '@jsx-email/html';

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

## Component Props

### `lang`

Type: `string`<br>
Default: `en`<br/>
Required: `false`

Identify the language of text content on the email

### `dir`

Type: `string`<br>
Default: `ltr`<br>

Identify the direction of text content on the email


