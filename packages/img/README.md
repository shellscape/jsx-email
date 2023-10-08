[npm]: https://img.shields.io/npm/v/@jsx-email/img
[npm-url]: https://www.npmjs.com/package/@jsx-email/img

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/img

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which displays an image
<div><br>

[`@jsx-email/img` Documentation](https://jsx.email/docs/components/img)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/img

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/img
# yarn add @jsx-email/img
```

## Usage

We recommend using the [`@jsx-email/cli`](../cli) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Img } from '@jsx-email/img';

const Email = () => {
  return <Img src="cat.jpg" alt="Cat" width="300" height="300" />;
};
```

Please see the [`@jsx-email/img` Documentation](https://jsx.email/docs/components/img) for props and additional usage information.

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
