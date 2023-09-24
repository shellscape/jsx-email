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

```sh npm
npm install @react-email/button -E
```

```sh yarn
yarn add @react-email/button -E
```

```sh pnpm
pnpm add @react-email/button -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Button } from '@react-email/button';

const Email = () => {
  return (
    <Button href="https://example.com" style={{ color: '#61dafb' }}>
      Click me
    </Button>
  );
};
```

## Props

<ResponseField name="href" type="string" required>
  Link to be triggered when the button is clicked
</ResponseField>

<ResponseField name="target" type="string" default="_blank">
  Specify the target attribute for the button link
</ResponseField>

