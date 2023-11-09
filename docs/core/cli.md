---
title: 'CLI'
description: 'The Command Line Interface and developer tooling for JSX email'
params: -D
slug: cli
type: package
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

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

## Build

The `build` command compiles and renders an email template to HTML for use with an email provider. The command takes a directory or single file as input:

```console
$ cd ~/code/email-app
$ email build ./emails
```

Or for a single file:

```console
$ cd ~/code/email-app
$ email build ./emails/Batman.tsx
```

### Client Compatibility Check

As part of the build process, `jsx-email` can run a client compatibility check on the ouput, comparing it to the compatibility tables from `[caniuse.com](https://caniemail.com/) and display any email client compatibility issues. This check will not throw an error or block any pipelines, and is purely informative.

To enable this check, use the `--check` flag.

```console
$ email build ./emails/Batman.tsx --check
```

## Preview

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
