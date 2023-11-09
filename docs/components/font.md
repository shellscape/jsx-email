---
title: Font
description: Sets up custom fonts for use in email
slug: font
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

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
            format: 'woff2'
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

```ts
export interface FontProps {
  fallbackFontFamily: FallbackFont | FallbackFont[];
  fontFamily: string;
  fontStyle?: FontStyle;
  fontWeight?: FontWeight;
  webFont?: {
    format: FontFormat;
    url: string;
  };
}
```

### Props

```ts
fallbackFontFamily: FallbackFont | FallbackFont[];
```

The fallback font family the system should you, if web fonts are not supported or the chosen font is not installed on the system.

```ts
fontFamily: string;
```

The font family you want to use. If the webFont property is configured, this should contain the name of that font. Note: Do not insert multiple fonts here, use `fallbackFontFamily` for that\_

```ts
fontStyle?: FontStyle;`
```

Default: `'normal'`<br/>

The style of the font.

```ts
fontWeight?: FontWeight;`
```

Default: `400`<br/>

The weight of the font.

```ts
webFont?: {
  format: FontFormat;
  url: string;
}
```

The webFont the supported email client should use. _Note: Not all clients support web fonts. For support check: [https://www.caniemail.com/features/css-at-font-face](https://www.caniemail.com/features/css-at-font-face)_
