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
import { Link } from 'jsx-email';

const Email = () => {
  return <Link href="https://example.com">Example</Link>;
};
```

## Component Props

```ts
disableDefaultStyle?: boolean;
```

If `false`, instructs the component not to add default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

```ts
href: string;
```

Link to be triggered when the button is clicked.

```ts
target?: string;
```

Specify the target attribute for the button link.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'a'>`.
:::