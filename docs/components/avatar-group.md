---
title: AvatarGroup
description: Displays a group of avatars with optional overlap
slug: avatar-group
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

`AvatarGroup` arranges `Avatar` children in a row.

```jsx
import { Avatar, AvatarGroup } from 'jsx-email';

const Email = () => {
  return (
    <AvatarGroup>
      <Avatar name="Bruce Wayne" />
      <Avatar name="Selina Kyle" />
      <Avatar name="Clark Kent" />
    </AvatarGroup>
  );
};
```

Use overlap only when needed:

```jsx
import { Avatar, AvatarGroup } from 'jsx-email';

const Email = () => {
  return (
    <AvatarGroup overlap={true} spacing={10}>
      <Avatar name="Bruce Wayne" />
      <Avatar name="Selina Kyle" />
      <Avatar name="Clark Kent" />
    </AvatarGroup>
  );
};
```

## Component Props

```ts
overlap?: boolean;
```

If `true`, overlaps avatars. Defaults to `false` for compatibility-safe rendering.

```ts
spacing?: number;
```

Spacing in pixels between avatars. Defaults to `8`.

```ts
disableDefaultStyle?: boolean;
```

If `true`, instructs the component _not to add_ default `style` properties to the component. This can be useful when attempting to override default styles with `Tailwind` or class names.

::: tip
This component also expresses all of the [Common Component Props](https://react.dev/reference/react-dom/components/common) for `ComponentProps<'table'>`, except `cellPadding` and `cellSpacing`.
:::
