---
title: 'Quick Start'
description: 'Quick Start'
---

## Quick Start

In this doc you'll find information on quickly getting started using JSX email. For more in-depth information, please see the other sections of our Documentation.

## Prerequisites

- [Node.js](https://nodejs.org/en/) v18.0.0+
- React v18.2.0

## Installation

The easiest way to get started is by using the JSX email CLI.

```shell
$ pnpm add @jsx-email/cli -g

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/cli
# yarn add @jsx-email/cli
```

If you want to avoid global installation, you can use npx instead:

```shell
$ pnpm exec email <command>

# With npm or yarn
# npx email <command>
# yarn email <command>
```

## Create A Template

First, we'll create a directory for our email templates, and then add a new template:

```sh
$ mkdir ./emails
$ email create BatmanEmail --out=./emails
```

This command will create a new template named `BatmanEmail.tsx` in the `./emails` directory.

::: tip
If you'd rather create a `.jsx` file, use the `--jsx` flag
:::

## Superstruct

[Superstruct](docs.superstructjs.org) is a fantastic validation package that predates `zod` and `yup`. It's smaller and faster than alternatives and uses a delightful API without chaining or cruft. JSX email uses it as an option for defining `prop` types and creating props for use in email previews.

## Email Previews

One of the major benefits of JSX email over alternatives is our incredibly slim and fast preview server, which requires no additional dependency installation, complex mounting, or difficult setup rules for monorepos. To run the preview server, run the following command in your terminal:

```sh
$ email preview ./emails
```

The CLI will startup a preview server and open a new browser tab at `http://localhost:55420`. It's that simple.

::: tip
Please use `email help preview` to view optional flags, including setting the port.
:::

## Building Your Template

The next step is to build your template. This can be done with the CLI, or with the [Core Render Package](/docs/core/render) in code. While most people will need to render emails dynamically at runtime using `@jsx-email/render`, the CLI is capable of rendering both static and dynamic emails that take props as input. To build your email into an HTML document, run:

```sh
$ email build ./emails/BatmanEmail.tsx
```

::: tip
Please use `email help build` to view optional flags, including providing props and setting the output path.
:::
