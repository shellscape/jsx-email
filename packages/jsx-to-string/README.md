[npm]: https://img.shields.io/npm/v/@jsx-email/jsx-to-string
[npm-url]: https://www.npmjs.com/package/@jsx-email/jsx-to-string

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/jsx-to-string

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A package for rendering JSX components to HTML strings.
<div><br>

[`@jsx-email/jsx-to-string` Documentation](https://jsx.email/docs/core/jsx-to-string)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/jsx-to-string

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/jsx-to-string
# yarn add @jsx-email/jsx-to-string
```

## Usage

Convert React components into a HTML string.

```jsx
import { jsxToString } from '@jsx-email/jsx-to-string';

const html = jsxToString(<MyTemplate firstName="Jim" />);
```

Please see the [`@jsx-email/jsx-to-string` Documentation](https://jsx.email/docs/core/jsx-to-string) for props and additional usage information.

## License

[MIT License](./LICENSE.md)
