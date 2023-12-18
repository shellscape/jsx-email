---
title: 'ColorScheme'
description: A JSX email component which provides meta and style foundations for color scheme support
slug: color-scheme
type: component
---

<!--@include: @/include/header.md-->

::: tip
Please be sure to read our FAQ about Dark Mode in the context of email templates: https://jsx.email/docs/faq#dark-and-light-mode
:::

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template.

```jsx
import { Body, ColorScheme, Head, Html } from 'jsx-email';

const Email = () => {
  return (
    <Html>
      <Head>
        <ColorScheme mode="light only" />
      </Head>
      <Body></Body>
    </Html>
  );
};
```

## Component Props

```ts
export interface ColorSchemeProps {
  mode?: Mode;
}
```

### Individual Props

```ts
mode?: ColorSchemeMode;
```

Default: `'normal'`<br/>

Selects the color scheme mode that informs the email client which mode to render.

Supported Values:

- `'dark'`
- `'dark only'` The email client will only ever render the content in the dark color scheme and forbids the email client from overriding the color scheme.
- `'light'`
- `'light dark'` The email client will choose the light or dark theme to match the user’s preference. If the user’s preference does not match something in the list, the email client will choose which mode to display.
- `'light dark only'` The email client will choose the first of the listed schemes that it supports taking user preference into account and forbids the email client from overriding the color scheme.
- `'light only'` The email client will only ever render the content in the light color scheme and forbids the email client from overriding the color scheme.
- `'normal'` Indicates that the email supports the page's supported color schemes, if they are set, or that it supports no color schemes at all otherwise.
