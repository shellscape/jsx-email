[npm]: https://img.shields.io/npm/v/@jsx-email/cli
[npm-url]: https://www.npmjs.com/package/@jsx-email/cli

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

# email-setup

![jsx-email](../../assets/brackets.svg) The starter command for JSX email.

## Requirements

This package requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Getting started

To get started, open a new shell and run:

```sh
npx create-jsx-email
```

This will create a new folder called `jsx-email-starter` with a `jsx-email` project setup.

Install the dependencies

```sh
cd jsx-email-starter
pnpm install
```

Start the preview server

```sh
pnpm run dev
```

## Options

Alternatively, you can pass a parameter to specify the name of the folder:

```sh
npx create-jsx-email <project-name>
```

## License

[MIT License](./LICENSE.md)