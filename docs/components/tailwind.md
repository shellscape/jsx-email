---
title: 'Tailwind'
sidebarTitle: 'Tailwind'
description: 'A React component to wrap emails with Tailwind CSS.'
'og:image': 'https://react.email/static/covers/tailwind.png'
icon: 'wind'
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/tailwind
```

```console [npm]
npm add @jsx-email/tailwind
```

```console [yarn]
yarn add @jsx-email/tailwind
```

:::

## Getting started

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
              brand: '#007291',
            },
          },
        },
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

## Component Props

### `config`

Type: `object`<br>
Default: ``<br/>
Required: `false`

>
  Customize the default theme for your project with the available properties in
  [Tailwind docs](https://tailwindcss.com/docs/theme).
  ::: tip
    Note: Most email clients are style-limited and some styles may not work.
  :::


## Live example

<Card
  title="Tailwind Demo"
  icon="arrow-up-right-from-square"
  iconType="duotone"
  href="https://demo.react.email/preview/vercel-invite-user"
>
  See the full demo and source code.
</Card>

<Snippet file="support.mdx" />