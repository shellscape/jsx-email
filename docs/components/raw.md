---
title: 'Raw'
description: Use raw HTML and unescaped text effortlessly
slug: raw
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

This component is especially useful for placing additional templating languages in your rendered email templates, for use in email providers which have their own value injection, or for further processing later in a separate system.

::: warning
It's important to understand that the values set as `content` will be placed into the rendered template unescaped. `jsx-email` goes to great lengths to validate and correct mistakes in HTML which may cause issues in email clients. Please use this component cautiously and thoughtfully.
:::

Add the component to your email template. Include styles where needed.

```jsx
import {Raw } from 'jsx-email';

const hero = true;

const HeroOrVillain = () => {
  return (
    <Raw content={`<#if ${production}>`}/>
      <b>Batman's a hero</b>
    <Raw content={`</#if>`}/>
  );
};
```

Which if used in a template, would yield the following when rendered:

```
<#if true>
  <b>Batman's a hero</b>
</#if>
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
content?: string;
```

The raw text content to render into a template

```ts
disablePlainTextOutput?: boolean;
```

If `true`, the content of the `Raw` component will not be rendered during plain text rendering
