---
title: 'Container'
sidebarTitle: 'Container'
description: 'A layout component that centers all the email content.'
'og:image': 'https://react.email/static/covers/container.png'
icon: 'grid'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/container
```

```console [npm]
npm add @jsx-email/container
```

```console [yarn]
yarn add @jsx-email/container
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@jsx-email/button';
import { Container } from '@jsx-email/container';

const Email = () => {
  return (
    <Container>
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Container>
  );
};
```

