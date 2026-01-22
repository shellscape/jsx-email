---
title: 'Conditional'
description: Use HTML conditional comments effortlessly
slug: conditional
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Conditional, Head } from 'jsx-email';

const Email = () => {
  return (
    <Head>
      <Conditional head mso={true}>
        <meta content="batman" />
      </Conditional>
    </Head>
  );
};
```

## Component Props

```ts
interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}
```

::: info
The `expression` prop or the `mso` prop must be defined, but not both.
:::

### Props

```ts
expression?: string;
```

If provided, the string will be used as the conditional expression within the HTML comment. e.g. a value of `lt ie 10` would result in a conditional comment block starting with `<!--[if lt ie 10]>`.

```ts
head?: boolean;
```

If `true`, the conditional expression will be placed in the `head` section of your email template.

Note: the component renders an intermediate `<jsx-email-cond>` element which HTML parsers may hoist out of a literal `<head>` tag. If you need the conditional to reliably land in `<head>`, use `head` / `data-head`.

For `mso` conditionals, `head` scope also affects the closer: head-scoped MSO blocks close with `<![endif]-->`, while non-head MSO blocks keep the `<![endif]/-->` closer.

```ts
mso?: boolean;
```

If `true`, the conditional comment begins with `<!--[if mso]>`. If `false`, the conditional comment block uses a common hack and appears as `<!--[if !mso]><!--> ... <!--<![endif]-->`.
