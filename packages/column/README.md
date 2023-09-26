[npm]: https://img.shields.io/npm/v/@jsx-email/column
[npm-url]: https://www.npmjs.com/package/@jsx-email/column

[![npm][npm]][npm-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/column

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component for
<div>

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/column

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/column
# yarn add @jsx-email/column
```


## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Row } from '@jsx-email/row';
import { Column } from '@jsx-email/column';
const Email = () => {
  return(
    <Row>
      <Column>A<Column/>
      <Column>B<Column/>
      <Column>C<Column/>
    </Row>
  );
};
```


## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
