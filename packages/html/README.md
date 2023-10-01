[npm]: https://img.shields.io/npm/v/@jsx-email/html
[npm-url]: https://www.npmjs.com/package/@jsx-email/html

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/html

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component to wrap emails.
<div>

[`@jsx-email/html` Documentation](https://jsx.email/docs/components/html)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/html

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/html
# yarn add @jsx-email/html
```

## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Button } from '@jsx-email/button';
import { Html } from '@jsx-email/html';

const Email = () => {
  return (
    <Html lang="en">
      <Button href="https://example.com" style={{ color: '#61dafb' }}>
        Click me
      </Button>
    </Html>
  );
};
```

## Props

| Name | Type   | Default | Description                                         |
| ---- | ------ | ------- | --------------------------------------------------- |
| lang | string | `en`    | Identify the language of text content on the email  |
| dir  | string | `ltr`   | Identify the direction of text content on the email |

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
