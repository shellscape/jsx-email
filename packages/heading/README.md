[npm]: https://img.shields.io/npm/v/@jsx-email/heading
[npm-url]: https://www.npmjs.com/package/@jsx-email/heading

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/heading

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component for a block of heading text.
<div>

[`@jsx-email/heading` Documentation](https://jsx.email/docs/components/heading)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/heading

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/heading
# yarn add @jsx-email/heading
```

## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Heading } from '@jsx-email/heading';

const Email = () => {
  return <Heading as="h1">Lorem ipsum</Heading>;
};
```

## Props

| Name | Type             | Default | Description                                                     |
| ---- | ---------------- | ------- | --------------------------------------------------------------- |
| as   | string           | `h1`    | Render component as `h1`, `h2`, `h3`, `h4`, `h5` or `h6`.       |
| m    | number \| string |         | A shortcut for `margin` CSS property.                           |
| mx   | number \| string |         | A shortcut for `margin-left` and `margin-right` CSS properties. |
| my   | number \| string |         | A shortcut for `margin-top` and `margin-bottom` CSS properties. |
| mt   | number \| string |         | A shortcut for `margin-top` CSS property.                       |
| mr   | number \| string |         | A shortcut for `margin-right` CSS property.                     |
| mb   | number \| string |         | A shortcut for `margin-bottom` CSS property.                    |
| ml   | number \| string |         | A shortcut for `margin-left` CSS property.                      |

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
