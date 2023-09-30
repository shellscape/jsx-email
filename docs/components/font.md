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

```console [pnpm]
pnpm add @jsx-email/font
```

```console [npm]
npm add @jsx-email/font
```

```console [yarn]
yarn add @jsx-email/font
```

:::

## Usage

Add the component to your email template. This applies your font to all tags inside your email.
Note, that not all email clients supports web fonts, this is why it is important to configure your `fallbackFontFamily`.
To view all email clients that supports web fonts [see](https://www.caniemail.com/features/css-at-font-face/)

```jsx
import { Html } from '@jsx-email/html';
import { Head } from '@jsx-email/head';
import { Font } from '@jsx-email/font';

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

## Component Props

### `fontFamily`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The font family you want to use. If the webFont property is configured, this
should contain the name of that font

### `fallbackFontFamily`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The fallback font family the system should you, if web fonts are not supported
or the chosen font is not installed on the system.

### `webFont`

Type: `{url: string, format: string} | undefined`<br>

The webFont the supported email client should use

### `fontWeight`

Type: `number | string`<br>

The weight of the font

### `fontStyle`

Type: `string`<br>
Default: ``<br/>
Required: `false`

The style of the font


