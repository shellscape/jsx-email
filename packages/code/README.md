[npm]: https://img.shields.io/npm/v/@jsx-email/code
[npm-url]: https://www.npmjs.com/package/@jsx-email/code

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/code

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  A JSX email component which displays a syntax-highlighted code block using <a href="https://shiki.matsu.io/">Shiki</a>
<div><br>

[`@jsx-email/code` Documentation](https://jsx.email/docs/components/code)

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/code

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/code
# yarn add @jsx-email/code
```

## Usage

We recommend using the [`@jsx-email/cli`](../cli) for [creating new templates](https://jsx.email/docs/quick-start#create-a-template).

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { getCode } from '@jsx-email/code';

const Code = await getCode({ language: 'js', theme: 'nord' });

const Email = () => {
  return (
    <Code>
      {`
      import { batman } from 'superheros';
      import { joker } from 'villains';

      const henchmen = joker.help();

      batman.fight(henchmen);
      batman.arrest(joker);
    `}
    </Code>
  );
};
```

Please see the [`@jsx-email/code` Documentation](https://jsx.email/docs/components/code) for props and additional usage information.

## License

[MIT License](./LICENSE.md)
