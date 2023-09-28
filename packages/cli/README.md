[npm]: https://img.shields.io/npm/v/@jsx-email/cli
[npm-url]: https://www.npmjs.com/package/@jsx-email/cli

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# @jsx-email/cli

![jsx-email](../../assets/brackets.svg) The Command Line Interface and developer tooling for JSX email.

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/cli -D

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/cli -D
# yarn add @jsx-email/cli -D
```

Nearly all installations of this package will want it installed into `devDependencies` so please make sure to add the `-D` flag.

## Usage

Installing this package will add an `email` binary, which will be available to `pnpm exec`, `npx`, and `yarn`.

Invoking the CLI without parameters or flags will produce help information in the console. From there, all of the functions of the CLI can be viewed, along with any applicable parameters and flags:

```console
→ pnpm exec email

@jsx-email/cli v0.0.0

A CLI for working with Email Templates made with jsx-email

Usage
  $ email [...options]

Commands
  build       <template path>
  help        [<command>]
  preview     <template dir path>

Options
  --help      Displays this message
  --version   Displays webpack-nano and webpack versions

Examples
  $ email
  $ email --help
  $ email build ./src/templates/Invite.tsx
  $ email create invite
  $ email preview ./src/templates
```

For more documentation and information using the CLI, please review our [Documentation](https://jsx.email/docs/cli)

## Attribution 🧡

This package was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

## License

[MIT License](./LICENSE.md)
