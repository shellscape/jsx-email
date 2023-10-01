[npm]: https://img.shields.io/npm/v/@jsx-email/render
[npm-url]: https://www.npmjs.com/package/@jsx-email/render

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/render

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A package for rendering JSX email components to HTML email
<div>

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/render

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/render
# yarn add @jsx-email/render
```

## Usage

Convert React components into a HTML string.

```jsx
import { MyTemplate } from '../components/MyTemplate';
import { render } from '@jsx-email/render';

const html = render(<MyTemplate firstName="Jim" />);
```

Please see the [`@jsx-email/render` Documentation](https://jsx.email/docs/core/render) for props and additional usage information.

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
