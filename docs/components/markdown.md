---
title: "Markdown"
sidebarTitle: "Markdown"
description: "A Markdown component that converts markdown to valid react-email template code"
icon: "file-code"
---

## Install

Install component from your command line.

::: code-group

```sh npm
npm install @react-email/markdown -E
```

```sh yarn
yarn add @react-email/markdown -E
```

```sh pnpm
pnpm add @react-email/markdown -E
```

:::

## Getting started

Add the component to your email template. Include styles where needed.

```jsx
import { Markdown } from "@react-email/markdown";
import { Html } from "@react-email/html";

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

## Props

<ResponseField name="children" type="string">
  Contains the markdown content that will be rendered in the email template
</ResponseField>
<ResponseField name="markdownContainerStyles" type="object" default="{}">
  Provide custom styles for the containing div that wraps the markdown content
</ResponseField>
<ResponseField name="markdownCustomStyles" type="object" default="{}">
  Provide custom styles for the corresponding html element (p, h1, h2, etc.)
  ::: tip
    Note: Passing a custom style for an element overrides the default styles.
  :::
</ResponseField>

