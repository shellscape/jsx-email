---
title: 'Common Questions'
description: 'You know the drill. Questions that get asked oodles'
---

<!--@include: @/include/header.md-->

## Next.js `import` or `export` Errors

If you're a Next.js user, and you're trying to run `jsx-email` in a server action (or `use server`) and running into an error which looks like this:

```
./node_modules/shikiji/dist/index.mjs
export 'getHighlighterCore' (reexported as 'getHighlighterCore') was not found in './core.mjs' (module has no exports)
```

Then congratulations, you've been affected by Next.js using webpack and webpack not handling `.mjs` files correctly. Luckily, there's a quick fix to get around this limitation. Please follow the instructions on this issue: https://github.com/antfu/shikiji/issues/13#issuecomment-1749588964. The issue has more information, but the workaround entails adding the following to your `next.config.js` file:

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

## Next.js `x await isn't allowed in non-async function` Build Errors

If you're a Next.js and encounting an error when building your project which looks similar to:

```
8058.js from Terser
  x await isn't allowed in non-async function
```

Then congratulations, you've been affected by Next.js using webpack, and some naughty configuration within Next.js. This is a [known issue with Next.js and Webpack](https://github.com/vercel/next.js/discussions/57535), and this may happen when a server action (or `use server`) is directly imported into a client component. To workaround this, there are two options:

### I. Change imports

You can import the server action into a server component first, and then pass it into your client component as a prop. For example:

```jsx
// page.jsx
import { MyForm } from './MyForm';
import { myEmailAction } from './myEmailAction';

export async function Page() {
  return <MyForm action={myEmailAction} />;
}

// MyForm.jsx
'use client';
export function MyForm({ action }) {
  // Note the passing of `action` as a prop
  return <form action={action}>...</form>;
}

// myEmailAction.js
'use server';
import { render } from 'jsx-email';
import { MyEmail } from '@/emails/MyEmail';

export async function myEmailAction() {
  const body = await render(<MyEmail />);
  ...
}
```

#### II. Disable EXM Externals

Alternatively, you can also turn off `esmExternals` in `next.config.js` which will allow you to keep importing server actions which use `jsx-email` into client components:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false,
  }
};

module.exports = nextConfig;
```

