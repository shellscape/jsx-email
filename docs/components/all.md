---
title: 'All (The Things)'
description: 'This package exports all of the JSX email components'
slug: all
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Using this package, all JSX email components can be accessed from a single import. For folks who prefer that style, versus importing individual component packages.

```jsx
import { Button, Heading } from '@jsx-email/all';

const Email = () => {
  return (
    <Heading as="h1">Batman</Heading>;
    <Button href="https://example.com" style={{ color: '#61dafb' }}>
      Click me
    </Button>
  );
};
```

