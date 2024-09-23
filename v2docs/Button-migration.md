## Migrating to the new `Button` component

The new `Button` component in v2 is a big upgrade from the classic button which is now available as [`Butan`]()

> Note: The Butan component is now deprecated and will be removed in the next major version. We strongly recommend migrating to the new Button component to ensure future compatibility.

To take full advantage of the new Button, we strongly recommend using the provided component props (see the Button docs or the details below) to set styles. Avoid using `CSS`, the `style` property, or `Tailwind` classes, as this ensures better compatibility with Outlook and older email clients.

## Component Props

The Only required props are `width` and `height`. While the other props are optional, it is highly recommended to use them instead of relying on `style`, `CSS`, or `Tailwind` classes for styling.

```tsx
width: number;
height: number;
href?: string;
align?: 'left' | 'center' | 'right';
backgroundColor?: string;
borderColor?: string;
borderRadius?: number;
borderSize?: number;
fontSize?: number;
textColor?: string;
withBackground?: boolean;
```

## Old usage of the Button (now `Butan`)

Previously, the Butan component often used inline styles via the `style` prop, like this:

```tsx
<Butan
  style={{
    backgroundColor: '#ff5a5f',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '18px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '300px',
    padding: '19px 0px'
  }}
  href="#"
>
  Click Me!
</Butan>
```

## Migrating to the New Button Component

In the new version, the Button component eliminates the need for inline styles, using props instead. This ensures better compatibility across email clients and allows for a more maintainable codebase.

```tsx
<Button
  width={300}
  height={64}
  backgroundColor={'#ff5a5f'}
  borderRadius={3}
  textColor={'#fff'}
  fontSize={18}
  href="#"
>
  Click Me!
</Button>
```

## Key Changes:

- Inline styles are replaced by props like width, height, backgroundColor, etc.
- This helps maintain consistency and improves compatibility with older email clients (e.g., Outlook).
- The design is now more easily adjustable through component props, making the code cleaner and more reusable.
