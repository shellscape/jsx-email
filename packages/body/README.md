[npm]: https://img.shields.io/npm/v/@jsx-email/html
[npm-url]: https://www.npmjs.com/package/@jsx-email/html

[![npm][npm]][npm-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/html

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component for
<div>

## Requirements

This packages requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

<div>
  <br/>
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/clients.svg" alt="JSX email"><br/>
  Compatible with all modern email services
  <br/><br/>
</div>

## Install

```shell
$ pnpm add @jsx-email/$1

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/$1
# yarn add @jsx-email/$1
```

## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Html } from "@jsx-email/html";
import { Body } from "@jsx-email/body";
import { Column } from "@jsx-email/column";
import { Section } from "@jsx-email/section";

const Email = () => {
  return (
    <Html lang="en">
      <Body style={{ backgroundColor: "#61dafb" }}>
        <Section>
          <Column style={{ width: "50%" }}>{/* First column */}</Column>
          <Column style={{ width: "50%" }}>{/* Second column */}</Column>
        </Section>
      </Body>
    </Html>
  );
};
```

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
