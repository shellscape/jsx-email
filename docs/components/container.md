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

```sh npm
npm install @react-email/container -E
```

```sh yarn
yarn add @react-email/container -E
```

```sh pnpm
pnpm add @react-email/container -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';

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

