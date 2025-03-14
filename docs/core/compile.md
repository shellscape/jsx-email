---
title: 'Compile'
description: 'Compile jsx-email templates into a bundle'
params: -D
slug: render
type: package
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

```jsx
import { readFile } from 'node:fs/promises;';
import { resolve } from 'node:path';

import { compile } from 'jsx-email/compile';

const templatePath = resolve(__dirname, './emails/Batman');
const outDir = resolve(__dirname, '.compiled');

const compiledFiles = await compile({ files: [templatePath], hashFiles: false, outDir });
```

::: tip
Once compiled into a bundle, the file can be imported and passed to render such like:

```jsx
import { Template } from './.compiled/batman.js';

import { render } from 'jsx-email';

const html = render(<Template />);
```

Note that whether or not to use a file extension in the import depends on your project's settings. When using TypeScript you may have to adjust types to avoid errors, using this method.
:::

## Method Options

```ts
export interface Options {
  disableDefaultStyle?: boolean;
  inlineCss?: boolean;
  minify?: boolean;
  plainText?: boolean | PlainTextOptions;
  pretty?: boolean;
}
```

### Options

```ts
files: string[];
```

An array of absolute paths for JSX/TSX template files to compile

```ts
hashFiles?: boolean;
```

Default: true. If `true`, adds the build hash to compiled file names. Set this to `false` if hashing and unique output filenames aren't needed.

```ts
outDir: string;
```

An absolute path to output the compiled file(s)

```ts
writeMeta?: boolean;
```

If `true`, writes the ESBuild metadata for the compiled file(s)
