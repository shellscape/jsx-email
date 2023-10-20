---
title: 'CLI'
description: 'The Command Line Interface and developer tooling for JSX email'
slug: cli
---

<!--@include: @/include/header.md-->

## Installation

```shell
pnpm add @jsx-email/cli -D

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/cli -D
# bun add @jsx-email/cli -D
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
  create      <template name>
  help        [<command>]
  preview     <template dir path>

Options
  --help      Displays this message
  --version   Displays the current @jsx-email/cli version

Examples
  $ email
  $ email --help
  $ email build ./src/templates/Invite.tsx
  $ email create invite
  $ email preview ./src/templates
```

To view help for specific commands, use `email help <command>`. e.g. `email help build`.

## Preview Tool

JSX email ships with a Preview Tool as part of the CLI. Our Preview is fast, simple, and smooth. It doesn't require installing any crazy dependencies, downloading additional "clients," or copying your project's dependencies. It just works. And the best part: it works with monorepos out of the box.

To use the Preview Tool, open your terminal and navigate to your project. We're assuming you've already installed the CLI as shown above, and that you've already run `email create` to create an email in an `emails` directory.

```console
$ cd ~/code/email-app
$ email preview ./emails
```

The Preview Tool will start up and open a new window in your browser, and you'll be presented with a page that looks like:

![Preview 1](/preview-1.png)<br/><br/>
![Preview 1](/preview-2.png)<br/><br/>
![Preview 1](/preview-3.png)<br/><br/>
![Preview 1](/preview-4.png)
