---
title: 'Known Issues'
description: 'Known issues you may encounter using the JSX Email project'
slug: known-issues
type: faq
---

<!--@include: @/include/header.md-->

## Next.js

### Webpack error - `export 'getHighlighterCore'`

Next.js webpack does not support importing `.mjs` files out of the box. As `JSX.email` uses [shikii](https://github.com/antfu/shikiji) under the hood, this causes Next.js to throw the following error:

```
export 'getHighlighterCore' (reexported as 'getHighlighterCore') was not found in './core.mjs' (module has no exports)
```

To workaround this Next.js limitation, add the following to your `next.config.js` file:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    });

    return config;
  }
};

module.exports = nextConfig;
```

### Build error - `x await isn't allowed in non-async function`

If you are using Next.js and encounter an error when building your project like this:

```
8058.js from Terser
  x await isn't allowed in non-async function
```

This is a known issue with Next.js and Webpack. This may happen when a server action is directly imported into a client component. To workaround this, you can import the server action into a server component first, and then pass it into your client component as a prop. For example:

### `page.jsx`

```jsx
import { MyForm } from './MyForm';
import { myEmailAction } from './myEmailAction';

export async function Page() {
  return <MyForm action={myEmailAction} />;
}
```

### `MyForm.jsx`

```js
'use client';
export function MyForm({ action }) {
  return <form action={action}>...</form>;
}
```

### `myEmailAction.js`

```js
'use server';
import { render } from 'jsx-email';
import { MyEmail } from '@/emails/MyEmail';

export async function myEmailAction() {
  const body = await render(<MyEmail />);
  ...
}
```
