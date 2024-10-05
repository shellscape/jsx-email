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

jsx-email v0.0.0

A CLI for working with Email Templates made with jsx-email

Usage
  $ email [...options]

Commands
  build       <template file or dir path>
  check       <template file path>
  create      <template name>
  help        [<command>]
  preview     <template dir path>

Options
  --help      Displays this message
  --version   Displays the current jsx-email version

Examples
  $ email
  $ email --help
  $ email build ./src/templates/Invite.tsx
  $ email create invite
  $ email preview ./src/templates
```

## Build

::: tip
To view info, flags, and options for the `build` command, run `email help build`.
:::

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

## Check

::: tip
To view info, flags, and options for the `check` command, run `email help check`.
:::

`jsx-email` can run a client compatibility check on any template, comparing it to the compatibility tables from `[caniuse.com](https://caniemail.com/) and display any email client incompatibility issues. This check is incredibly helpful in diagnosing and debugging display issues between multiple email clients.

```console
$ email check ./emails/Batman.tsx
```

Example output:

```console
Checking email template for Client Compatibility...

Found 1 files:
   ./emails/Batman.tsx

Starting build...

Build complete

./emails/Batman.tsx

  error  Class selector is not supported by:
           gmail.mobile-webmail
           protonmail.desktop-webmail
           protonmail.ios

  error  border-radius is not supported by:
           outlook.windows
           outlook.windows-mail

  ...

  warn  target attribute is only partially supported by:
          apple-mail.macos
          apple-mail.ios
          outlook.windows
          outlook.windows-mail
          outlook.ios
          outlook.android

Check Complete: 14 error(s), 20 warning(s)
```

## Preview

::: tip
To view info, flags, and options for the `preview` command, run `email help preview`.
:::

JSX email ships with a Preview Tool as part of the CLI. Our Preview is fast, simple, and smooth. It doesn't require installing any crazy dependencies, downloading additional "clients," or copying your project's dependencies. It just works. And the best part: it works with monorepos out of the box.

The preview also supports static local assets. For a good example of how to handle local assets like images, please have a look at [the demo AirBnB template](https://github.com/shellscape/jsx-email/blob/main/apps/demo/emails/airbnb-review.tsx). Notice that `baseUrl` is set using a condition on `import.meta.jsxEmail.isPreview`. That `import.meta` property is specific to `jsx-email` and will be replaced appropriately at build time. Local assets are served from the templates root directory, in this case `apps/demos/emails`, at the server root. So a `apps/demos/emails/batman.png` file would be served at `/batman.png` in the browser. We recommend using a `static` or `assets` directory in your templates root directory, so it's clear where files are being served from when viewing in the Preview Tool.

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

## Deploying Your Preview App

As part of the CLI, users have the ability to build their templates into a deployable preview app. The resulting app can be deployed anywhere, not just select service providers. To build templates into a deployable app, run:

```console
$ email preview <templates-path> --build-path <build-path>
```

where `<build-path>` is the path you want the build output files placed.
