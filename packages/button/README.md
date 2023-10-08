[npm]: https://img.shields.io/npm/v/@jsx-email/button
[npm-url]: https://www.npmjs.com/package/@jsx-email/button

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/button

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which styles an [anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) to appear as a button
<div><br>

[`@jsx-email/button` Documentation](https://jsx.email/docs/components/button)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/button

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/button
# yarn add @jsx-email/button
```

## Usage

We recommend using the [`@jsx-email/cli`](../cli) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Button } from '@jsx-email/button';

const Email = () => {
  return (
    <Button href="https://example.com" style={{ color: '#61dafb', padding: '10px 20px' }}>
      Click me
    </Button>
  );
};
```

Please see the [`@jsx-email/button` Documentation](https://jsx.email/docs/components/button) for props and additional usage information.

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
