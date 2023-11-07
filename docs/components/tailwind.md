---
title: 'Tailwind'
description: 'A JSX email component which enables using Tailwind-style CSS to style emails'
slug: tailwind
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

Our `Tailwind` component is lightning quick and extensible. No other email template system is as flexible or renders smaller with Tailwind styles.

## Usage

Add the component around your email body content.

```jsx
import { Button } from '@jsx-email/button';
import { Tailwind } from '@jsx-email/tailwind';

const Email = () => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#007291'
            }
          }
        }
      }}
    >
      <Button
        href="https://example.com"
        className="bg-brand px-3 py-2 font-medium leading-4 text-white"
      >
        Click me
      </Button>
    </Tailwind>
  );
};
```

::: tip
Note: Most email clients are style-limited and some styles may not work.
:::

## Component Props

```ts
export interface TailwindProps {
  config?: TwindUserConfig;
  isProduction?: boolean;
}
```

```ts
config?: TailwindConfig;
```

This option allows customizing the theme for your template, as well as [Presets](https://twind.style/presets). See: [`TailwindConfig`](https://twind.style/packages/@twind/core~TwindUserConfig) for type information. For more information on theming, please see https://twind.style/rules.

```ts
isProduction?: boolean;
```

If true, any Tailwind class names will be converted to hashed names. e.g. The class `bg-purple-400` is transformed into `#ae387`, with an accompanying class in the associated `<style>` tag. This is adventageous as it reduces the overall size of the rendered email. In email, every byte counts towards your user's experience.

## Tailwind Plugins

The `Tailwind` component isn't compatible with [Tailwind Plugins](https://tailwindcss.com/docs/plugins) out of the box. This is a side-effect of using [`twind`](https://twind.style/) for our Tailwind processor. However, `twind` does support the concept of [Presets](https://twind.style/presets) which act and behave like Tailwind Plugins. While not ideal, complex rulesets and plugins are an unlikely need for formatting emails.

Should you find yourself in need of a Tailwind Plugin for an email template, please stop by our [Discord Channel](https://discord.gg/FywZN57mTg) and we'll be happy to help you.
