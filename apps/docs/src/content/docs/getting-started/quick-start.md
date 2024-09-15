---
title: 'Quick Start'
description: 'Quick Start'
---

## Quick Start

In this doc you'll find information on quickly getting started using JSX email. For more in-depth information, please see the other sections of our Documentation.

::: info
This guide, along with the rest of the documentation here, assume that the reader has fundamental Node and NPM skills and is familiar with using command line tools on Window, Linux, or Mac OS.

For those not familiar with the bits above, here are some links to resources that we'd recommend reading before working with this project:

- [Node Fundamentals](https://www.codecademy.com/learn/learn-nodejs-fundamentals/modules/intro-to-node-js/cheatsheet)
- [NPM Fundamentals](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)
- [Executing Local NPM Packages](https://jaireina.medium.com/executing-local-npm-packages-226820ad2c31)
- [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) and [`pnpm exec`](https://pnpm.io/cli/exec)
- [How to use relative paths on windows CMD?](https://superuser.com/a/1270599)
  :::

## Prerequisites

- [Node.js](https://nodejs.org/en/) v18.0.0+
- React v18.2.0

## New Projects

If you're starting a new project — whether that's a project solely for email templates, or a project that will eventually host additional code — our [`create-jsx-email`](https://github.com/shellscape/jsx-email/tree/main/packages/create-jsx-email) utility is a perfect choice, and the fastest way to get started. The utility will scaffold a new project and get everything ready for developing new email templates. To begin, make sure you have a terminal (or command line) open and your current working directory is the directory you'd like to create a new project. Run the following command in your terminal (without the `$` symbol):

```console
$ npm create jsx-email
```

This command will install and execute `create-jsx-email`, create a `email-project` directory, and add a starter template.

While the _Existing Projects_ section below can be safely skipped, the information beneath it is useful and worth giving a read before working with JSX email, as it contains infmroation on the project and template that was just created.

## Existing Projects

The happy path for adding JSX email to an existing project is by using the JSX email CLI:

<!--@include: @/include/install.md-->

If you want to avoid global installation, you can use `pnpm dlx`, `npx`, or `yarn` instead like so:

```shell
$ pnpm dlx email <command>
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

[Superstruct](https://docs.superstructjs.org/) is a fantastic validation package that predates `zod` and `yup`. It's smaller and faster than alternatives and uses a delightful API without chaining or cruft. JSX email uses it as an option for defining `prop` types and creating props for use in email previews.

## Email Previews

One of the major benefits of JSX email over alternatives is our incredibly slim and fast preview server, which requires no additional dependency installation, complex mounting, or difficult setup rules for monorepos. To run the preview server, run the following command in your terminal:

```sh
# MacOS and Linux
$ email preview ./emails
```

::: info
Windows paths are different than MacOS or Linux paths. `./emails` above will not work on Windows. Please see the link above regarding Windows relative paths if you are unfamiliar with how they work on the Command Line
:::

The CLI will startup a preview server and open a new browser tab at `http://localhost:55420`. It's that simple.

::: tip
Please use `email help preview` to view optional flags, including setting the port.
:::

## Building Your Template

The next step is to build your template. This can be done with the CLI, or with the [`render` method](/docs/core/render) in code. While most people will need to render emails dynamically at runtime using `render`, the CLI is capable of rendering both static and dynamic emails that take props as input. To build your email into an HTML document, run:

```sh
$ email build ./emails/BatmanEmail.tsx
```

::: tip
Please use `email help build` to view optional flags, including providing props and setting the output path.
:::
