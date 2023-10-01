---
title: 'Tailwind'
description: 'A JSX email component which enables using Tailwind CSS to style emails'
slug: tailwind
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component around your email body content.

```jsx
import { Button } from '@jsx-email/button';
import { Tailwind } from '@jsx-email/tailwind';

const Email = () => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291'
            }
          }
        }
      }}
    >
      <Button
        href="https://example.com"
        className="bg-brand px-3 py-2 font-medium leading-4 text-white"
      >
        Click me
      </Button>
    </Tailwind>
  );
};
```

::: tip
Note: Most email clients are style-limited and some styles may not work.
:::

## Component Props

```ts
export interface TailwindProps {
  config?: TailwindConfig;
}
```

```ts
config?: TailwindConfig;
```

Customize the default theme for your project with the available properties in [Tailwind Documentation](https://tailwindcss.com/docs/theme).
