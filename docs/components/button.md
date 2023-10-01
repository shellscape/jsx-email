---
title: 'Button'
sidebarTitle: 'Button'
description: 'A link that is styled to look like a button.'
'og:image': 'https://react.email/static/covers/button.png'
icon: 'b'
---

::: tip
Semantics: Quite often in the email world we talk about buttons, when actually
we mean links. Behind the scenes this is a `<a>` tag, that is styled like a `<button>` tag.
:::

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/button
```

```console [npm]
npm add @jsx-email/button
```

```console [yarn]
yarn add @jsx-email/button
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@jsx-email/button';

const Email = () => {
  return (
    <Button href="https://example.com" style={{ color: '#61dafb' }}>
      Click me
    </Button>
  );
};
```

## Component Props

```ts
// extends primitive props from <a> tag
type RootProps = React.ComponentPropsWithoutRef<'a'>;

export interface ButtonProps extends RootProps {
  pX?: number;
  pY?: number;
}
```

```ts
href: string;
```

The url to navigate to when the button is clicked.

```ts
target?: string;
```

Specifies the value of the `"target"` attribute for the button `target`.

```ts
pX?: number;
```

The horizontal padding applied to the button.

```ts
pY?: number;
```

The vertical padding applied to the button.
