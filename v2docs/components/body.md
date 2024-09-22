---
title: 'Body'
description: 'A JSX email component for using a React `Body` component to wrap email content'
slug: body
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Body, Column, Html, Section } from 'jsx-email';

const Email = () => {
  return (
    <Html lang="en">
      <Body style={{ backgroundColor: '#61dafb' }}>
        <Section>
          <Column style={{ width: '50%' }}>{/* First column */}</Column>
          <Column style={{ width: '50%' }}>{/* Second column */}</Column>
        </Section>
      </Body>
    </Html>
  );
};
```

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'body'>`.
