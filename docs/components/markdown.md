---
title: 'Markdown'
sidebarTitle: 'Markdown'
description: 'A Markdown component that converts markdown to valid jsx-email template code'
icon: 'file-code'
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
import { Markdown } from '@jsx-email/markdown';
import { Html } from '@jsx-email/html';

const Email = () => {
  return (
    <Html lang="en" dir="ltr">
      <Markdown
        markdownCustomStyles={{
          h1: { color: 'red' },
          h2: { color: 'blue' },
          codeInline: { background: 'grey' }
        }}
        markdownContainerStyles={{
          padding: '12px',
          border: 'solid 1px black'
        }}
      >{`# Hello, World!`}</Markdown>

      {/* OR */}

      <Markdown children={`# This is a ~~strikethrough~~`} />
    </Html>
  );
};
```

## Component Props

```ts
export interface MarkdownProps extends React.PropsWithChildren {
  children: string;
  markdownContainerStyles?: React.CSSProperties;
  markdownCustomStyles?: StylesType;
  showDataId?: boolean;
}
```

```ts
children: string | string[];
```

Contains the markdown content that will be rendered in the email template

```ts
markdownContainerStyles?: React.CSSProperties;
```

Provide custom styles for the containing div that wraps the markdown content

```ts
markdownCustomStyles?: StylesType;
```

default="{}">
Provide custom styles for the corresponding html element (p, h1, h2, etc.)
::: tip
Note: Passing a custom style for an element overrides the default styles.
:::

```ts
showDataId?: boolean;
```

default=false>
Controls showing data attributes on elements.
