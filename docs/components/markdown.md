---
title: Markdown
description: Converts markdown input to valid HTML for email
slug: markdown
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Html, Markdown } from 'jsx-email';

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
}
```

### Props

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

Provide custom styles for the corresponding html element (p, h1, h2, etc.)

::: tip
Note: Passing a custom style for an element overrides the default styles.
:::
