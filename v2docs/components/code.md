---
title: Code
description: A JSX email component which displays a syntax-highlighted code block using <a href="https://shiki.matsu.io/">Shiki</a>
slug: code
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Code } from 'jsx-email';

const Email = () => {
  return (
    <Code>
      {`
      import { batman } from 'superheros';
      import { joker } from 'villains';

      const henchmen = joker.help();

      batman.fight(henchmen);
      batman.arrest(joker);
    `}
    </Code>
  );
};
```

## Component Props

```ts
language: string;
```

Specifies the language to use for the highlighter. See the [`shiki` documentation](https://github.com/shikijs/shiki/blob/main/docs/languages.md) for more information on supported languages.

```ts
theme?: string;
```

_Optional_. Defaults to `'nord'`. Specifies the theme to use for the highlighter. See the [`shiki` documentation](https://github.com/shikijs/shiki/blob/main/docs/themes.md) for more information on supported themes, modifying themes, and how to make your own.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'pre'>`.
:::
