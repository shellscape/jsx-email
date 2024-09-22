---
title: 'Background'
description: 'A JSX email component for background images in your Email template'
slug: background
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

## Usage

Add the background component to your email template.

```jsx
import { Body, Column, Html, Section } from 'jsx-email';

const Email = () => {
  return (
    <Html lang="en">
      <Body>
        <Background src="link-to-image" bgColor="#FFFFFF" width={600}>
          <Row>
            <Column>Content goes here</Column>
          </Row>
        </Background>
      </Body>
    </Html>
  );
};
```

## Component Props

```tsx
interface BackgroundProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'height' | 'width' | 'bgcolor'> {
  src: string;
  bgColor?: string;
  bgRepeat?: 'repeat' | 'no-repeat';
  height?: number;
  width?: number;
}
```

```tsx
src: string;
```

The path to the image

```tsx
bgColor?: string;
```

The hex code that represents the fallback `background-color` incase the image doesn't load

```tsx
bgRepeat?: 'repeat' | 'no-repeat';
```

A string that represents the value of `background-repeat`.
Default value is `no-repeat`

```tsx
height?: number;
```

The `height` of the container in pixels

```tsx
width?: number;
```

The `width` of the container in pixels
