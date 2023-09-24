---
title: 'Font'
sidebarTitle: 'Font'
description: 'A React Font component to set your fonts.'
'og:image': 'https://react.email/static/covers/font.png'
icon: 'book-font'
---

## Install

Install component from your command line.

::: code-group

```sh npm
npm install @react-email/font -E
```

```sh yarn
yarn add @react-email/font -E
```

```sh pnpm
pnpm add @react-email/font -E
```

:::

## Getting started

Add the component to your email template. This applies your font to all tags inside your email.
Note, that not all email clients supports web fonts, this is why it is important to configure your `fallbackFontFamily`.
To view all email clients that supports web fonts [see](https://www.caniemail.com/features/css-at-font-face/)

```jsx
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Font } from '@react-email/font';

const Email = () => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
    </Html>
  );
};
```

## Props

<ResponseField name="fontFamily" type="string">
  The font family you want to use. If the webFont property is configured, this
  should contain the name of that font
</ResponseField>

<ResponseField name="fallbackFontFamily" type="string">
  The fallback font family the system should you, if web fonts are not supported
  or the chosen font is not installed on the system.
</ResponseField>

<ResponseField name="webFont" type="{url: string, format: string} | undefined">
  The webFont the supported email client should use
</ResponseField>

<ResponseField name="fontWeight" type="number | string">
  The weight of the font
</ResponseField>

<ResponseField name="fontStyle" type="string">
  The style of the font
</ResponseField>

