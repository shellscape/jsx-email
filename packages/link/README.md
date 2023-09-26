[npm]: https://img.shields.io/npm/v/@jsx-email/link
[npm-url]: https://www.npmjs.com/package/@jsx-email/link

[![npm][npm]][npm-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/link

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component for
<div>

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/link

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/link
# yarn add @jsx-email/link
```


## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Link } from "@jsx-email/link";

const Email = () => {
  return <Link href="https://example.com">Example</Link>;
};
```

## Props

| Name   | Type   | Default  | Description                                      |
| ------ | ------ | -------- | ------------------------------------------------ |
| href   | string |          | Link to be triggered when the button is clicked  |
| target | string | `_blank` | Specify the target attribute for the button link |


## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
