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
      <Conditional mso={true}>
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
mso?: boolean;
```

If `true`, the conditional comment begins with `<!--[if mso]>`. If `false`, the conditional comment block uses a common hack and appears as `<!--[if !mso]><!--> ... <!--<![endif]-->`.
