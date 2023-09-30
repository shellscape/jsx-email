---
title: 'CLI'
sidebarTitle: 'CLI'
description: "After installing the React Email package (or cloning a starter), you can start using the command line interface (CLI)."
'og:image': 'https://react.email/static/covers/jsx-email.png'
icon: 'square-terminal'
---

## Installation

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

To view help for specific commands, use `email help <command>`. e.g. `email help build`.
