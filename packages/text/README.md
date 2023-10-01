[npm]: https://img.shields.io/npm/v/@jsx-email/text
[npm-url]: https://www.npmjs.com/package/@jsx-email/text

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/text

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which renders a paragraph element
<div>

[`@jsx-email/text` Documentation](https://jsx.email/docs/components/text)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/text

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/text
# yarn add @jsx-email/text
```

## Usage

We recommend using the [../cli](`@jsx-email/cli`) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Text } from '@jsx-email/text';

const Email = () => {
  return <Text>Lorem ipsum</Text>;
};
```

Please see the [`@jsx-email/text` Documentation](https://jsx.email/docs/components/text) for props and additional usage information.

## License

[MIT License](./LICENSE.md)
