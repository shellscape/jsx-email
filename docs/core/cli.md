---
title: 'CLI'
sidebarTitle: 'CLI'
description: "After installing the React Email package (or cloning a starter), you can start using the command line interface (CLI)."
'og:image': 'https://react.email/static/covers/react-email.png'
icon: 'square-terminal'
---

## `email dev`

Starts a local development server that will watch your files and automatically rebuild your email when you make changes.

**Options**

<ResponseField name="--dir" type="string" default="emails">
  Change the directory of your email templates.
</ResponseField>
<ResponseField name="--port" type="string" default="3000">
  Port to run dev server on
</ResponseField>
<ResponseField name="--skip-install" type="boolean" default="false">
 Do not install dependencies
</ResponseField>

## `email export`

Generates the plain HTML files of your emails into a `out` directory.

**Options**

<ResponseField name="--dir" type="string" default="emails">
  Change the directory of your email templates.
</ResponseField>
<ResponseField name="--outDir" type="string" default="out">
  Change the output directory.
</ResponseField>
<ResponseField name="--pretty" type="boolean" default="false">
  Minify or prettify the generated HTML file.
</ResponseField>
<ResponseField name="--plainText" type="boolean" default="false">
  Set output format as plain text.
</ResponseField>

## `email help <cmd>`

Shows all the options for a specific command.
