[npm]: https://img.shields.io/npm/v/@jsx-email/markdown
[npm-url]: https://www.npmjs.com/package/@jsx-email/markdown

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/markdown

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which converts markdown input to valid HTML for email
<div><br>

[`@jsx-email/markdown` Documentation](https://jsx.email/docs/components/markdown)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/markdown

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/markdown
# yarn add @jsx-email/markdown
```

## Usage

We recommend using the [`@jsx-email/cli`](../cli) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Markdown } from "@jsx-email/markdown";
import { Html } from "@jsx-email/html";

const Email = () => {
  return (
    <Html lang="en" dir="ltr">
      <Markdown
        markdownCustomStyles={{
          h1: { color: "red" },
          h2: { color: "blue" },
          codeInline: { background: "grey" },
        }}
        markdownContainerStyles={{
          padding: "12px",
          border: "solid 1px black",
        }}
      >{`# Hello, World!`}</Markdown>

      {/* OR */}

      <Markdown children={`# This is a ~~strikethrough~~`} />
    </Html>
  );
```

Please see the [`@jsx-email/markdown` Documentation](https://jsx.email/docs/components/markdown) for props and additional usage information.

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
