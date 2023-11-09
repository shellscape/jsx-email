---
title: Link
description: Renders a hyperlink to an external resource
slug: link
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the component to your email template. Include styles where needed.

```jsx
import { Link } from '@jsx-email/link';

const Email = () => {
  return <Link href="https://example.com">Example</Link>;
};
```

## Component Props

This component has no custom props, but expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'a'>`. Additionally, the props listed below should be considered.

### Props

```ts
href: string;
```

Link to be triggered when the button is clicked

```ts
target?: string;
```

Specify the target attribute for the button link
