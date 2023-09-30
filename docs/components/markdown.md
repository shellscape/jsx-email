---
title: "Markdown"
sidebarTitle: "Markdown"
description: "A Markdown component that converts markdown to valid jsx-email template code"
icon: "file-code"
---

## Install

Install component from your command line.

::: code-group

```console [pnpm]
pnpm add @jsx-email/markdown
```

```console [npm]
npm add @jsx-email/markdown
```

```console [yarn]
yarn add @jsx-email/markdown
```

:::

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Markdown } from "@jsx-email/markdown";
import { Html } from "@jsx-email/html";

const Email = () => {
  return (
    <Html lang="en" dir="ltr">
      <Markdown
        markdownCustomStyles={{
          h1: { color: "red" },
          h2: { color: "blue" },
          codeInline: { background: "grey" },
        }}
        markdownContainerStyles={{
          padding: "12px",
          border: "solid 1px black",
        }}
      >{`# Hello, World!`}</Markdown>

      {/* OR */}

      <Markdown children={`# This is a ~~strikethrough~~`} />
    </Html>
  );
};
```

## Component Props

### `children`

Type: `string`<br>
Default: ``<br/>
Required: `false`

Contains the markdown content that will be rendered in the email template

### `markdownContainerStyles`

Type: `object`<br>
Default: ``<br/>
Required: `false`

 default="{}">
  Provide custom styles for the containing div that wraps the markdown content

### `markdownCustomStyles`

Type: `object`<br>
Default: ``<br/>
Required: `false`

 default="{}">
  Provide custom styles for the corresponding html element (p, h1, h2, etc.)
  ::: tip
    Note: Passing a custom style for an element overrides the default styles.
  :::


