---
title: 'CLI'
sidebarTitle: 'CLI'
description: "After installing the React Email package (or cloning a starter), you can start using the command line interface (CLI)."
'og:image': 'https://react.email/static/covers/jsx-email.png'
icon: 'square-terminal'
---

## `email dev`

Starts a local development server that will watch your files and automatically rebuild your email when you make changes.

**Options**

### `--dir`

Type: `string`<br>
Default: ``<br/>
Required: `false`

 default="emails">
  Change the directory of your email templates.

### `--port`

Type: `string`<br>
Default: ``<br/>
Required: `false`

 default="3000">
  Port to run dev server on

### `--skip-install`

Type: `boolean`<br>
Default: ``<br/>
Required: `false`

 default="false">
 Do not install dependencies


## `email export`

Generates the plain HTML files of your emails into a `out` directory.

**Options**

### `--dir`

Type: `string`<br>
Default: ``<br/>
Required: `false`

 default="emails">
  Change the directory of your email templates.

### `--outDir`

Type: `string`<br>
Default: ``<br/>
Required: `false`

 default="out">
  Change the output directory.

### `--pretty`

Type: `boolean`<br>
Default: ``<br/>
Required: `false`

 default="false">
  Minify or prettify the generated HTML file.

### `--plainText`

Type: `boolean`<br>
Default: ``<br/>
Required: `false`

 default="false">
  Set output format as plain text.


## `email help <cmd>`

Shows all the options for a specific command.
