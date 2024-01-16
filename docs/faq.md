---
title: 'Common Questions'
description: 'You know the drill. Questions that get asked oodles'
---

<!--@include: @/include/header.md-->

## Dark and Light Mode

Handling dark and light mode in emails is tricky, and doesn't work exactly like one would expect with relevant experience handling modes on the web. Gmail and Outlook on Windows in particular, have essentially no support for color switching. There's a lot of information (and misinformation) out there about dark and light mode when authoring emails, but we recommend taking a look at the following articles, which hit most of the important bits of info for authoring emails:

- https://www.litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers
- https://web.dev/articles/color-scheme (crucial web development related dark mode info)

## Gmail and Tailwind

Gmail is one of the more restrictive email clients when it comes to CSS classes. When using the `<Tailwind/>` component, set the `production: true` prop for Gmail compatibility. The `Tailwind` component will hash and combine class names for compatibility with Gmail's rules.

## Monorepo Setup

`jsx-email` works out of the box with every monorepo setup. There are no additional or exhaustive setup steps to perform. Enjoy!

## Next.js `import` or `export` Errors

If you're a Next.js user, and you're trying to run `jsx-email` in a server action (or `use server`) and running into an error which looks like this:

```
./node_modules/shikiji/dist/index.mjs
export 'getHighlighterCore' (reexported as 'getHighlighterCore') was not found in './core.mjs' (module has no exports)
```

Then congratulations, you've been affected by Next.js using webpack and webpack not handling `.mjs` files correctly. Luckily, there's a quick fix to get around this limitation. Please follow the [instructions on this issue](https://github.com/antfu/shikiji/issues/13#issuecomment-1749588964). The issue has more information, but the workaround entails adding the following to your `next.config.js` file:

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

If you're a Next.js user and encountering an error when building your project which looks similar to:

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

### II. Disable ESM Externals

Alternatively, you can also turn off `esmExternals` in `next.config.js` which will allow you to keep importing server actions which use `jsx-email` into client components:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false
  }
};

module.exports = nextConfig;
```

## I have another question that isn't answered here!

If you have a question that isn't answered here, please [open an issue](https://github.com/shellscape/jsx-email/issues), start a [Discussion](https://github.com/shellscape/jsx-email/discussions), or [join our friendly Discord](https://discord.gg/FywZN57mTg) and ask away!

If your question relates to a bug or code issue, we really do need you to create a minimal reproduction. Without a reproduction it is nearly impossible for us to work out what whether the problem might be in your code, your individual setup, or a bug in JSX email! The reproduction helps everyone by ensuring we're all working with the same information.

The reproduction should be a small, self-contained project. Try and narrow it down to just demonstrating what is causing the issue.

It's easy to do, and you can either:

- Use the [`jsx-email-repro` StackBlitz reproduction template](https://stackblitz.com/fork/jsx-email-repro); or
- Provide a minimal repository link. Read [this gist](https://gist.github.com/Rich-Harris/88c5fc2ac6dc941b22e7996af05d70ff) for instructions.

Include the reproduction link with your question, and we'll be happy to help!
