[npm]: https://img.shields.io/npm/v/@jsx-email/all
[npm-url]: https://www.npmjs.com/package/@jsx-email/all

[![npm][npm]][npm-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/all

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A package containing all available JSX email components
<div>

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/all

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/all
# yarn add @jsx-email/all
```

## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Heading } from '@jsx-email/all';

const Email = () => {
  return <Heading as="h1">Lorem ipsum</Heading>;
};
```

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
