[npm]: https://img.shields.io/npm/v/@jsx-email/font
[npm-url]: https://www.npmjs.com/package/@jsx-email/font

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/font

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which sets up custom fonts for use in email
<div><br>

[`@jsx-email/font` Documentation](https://jsx.email/docs/components/font)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/font

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/font
# yarn add @jsx-email/font
```

## Usage

We recommend using the [`@jsx-email/cli`](../cli) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Html } from '@jsx-email/html';
import { Head } from '@jsx-email/head';
import { Font } from '@jsx-email/font';

const Email = () => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fallbackFontFamily="Verdana"
          fontFamily="Roboto"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2'
          }}
        />
      </Head>
    </Html>
  );
};
```

Please see the [`@jsx-email/font` Documentation](https://jsx.email/docs/components/font) for props and additional usage information.

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
