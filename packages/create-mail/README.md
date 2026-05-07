[npm]: https://img.shields.io/npm/v/create-mail
[npm-url]: https://www.npmjs.com/package/create-mail

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"/><br/><br/>
</div>

# JSX&thinsp;email create-mail

The starter command for JSX email. Use it to scaffold a new JSX email project with the current v3 runtime assumptions.

## Requirements

Generated projects target an [LTS](https://github.com/nodejs/Release) Node version, v22.0.0 or newer, and React v19.1.0 or newer.

## Getting Started

To get started, open a new shell and run:

```sh
npx create-mail my-email-project
```

This will create a new folder called `my-email-project` with a `jsx-email` project setup.

Install the dependencies:

```sh
cd my-email-project
pnpm install
```

Start the preview server:

```sh
pnpm run dev
```

## Options

You can pass a different project name as the first argument:

```sh
npx create-mail <project-name>
```

## License

[MIT License](./LICENSE.md)
