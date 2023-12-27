---
title: 'Tailwind'
description: 'A JSX email component which enables using Tailwind-style CSS to style emails'
slug: tailwind
type: component
---

<!--@include: @/include/header.md-->

<!--@include: @/include/install.md-->

Our `Tailwind` component is lightning quick and extensible. No other email template system is as flexible or renders smaller with Tailwind styles. That's because we leverage the insanely fast and flexible [UnoCSS](https://unocss.dev/) project for Atomic CSS - including Tailwind _and_ [Windi CSS](https://windicss.org/) support. Not only do you get Tailwind support, but also the vast ecosystem of UnoCSS possibilities.

::: tip
These are docs for the unified `jsx-email` package, and the Tailwind component contained within.

Docs for the deprecated `@jsx-email/tailwind` v3.0.0+ can be found at https://github.com/shellscape/jsx-email/blob/tailwind-v3.0.4/docs/components/tailwind.md
:::

## Usage

Add the component around your email body content.

```jsx
import { Button, Tailwind } from 'jsx-email';

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
Note: Most email clients are style-limited and some styles may not work. It's always recommended to use `email check` to check your CSS for client compatibility.
:::

## Component Props

```ts
export interface TailwindProps {
  config?: UnoCssConfig;
  production?: boolean;
}
```

```ts
config?: UnoCssConfig;
```

This option allows customizing the theme for your template, using [UnoCSS Configuration](https://unocss.dev/config/) as well as UnoCSS `layers`, `presets`, `rules`, `separators`, `shortcuts`, and `variants`. See: [Configuration](https://unocss.dev/guide/config-file) for type and further information. For more information on theming and any of the other customization options, please see https://unocss.dev/config/.

```ts
production?: boolean;
```

If true, any Tailwind class names will be converted to hashed names. e.g. The class `bg-purple-400` is transformed into `#ae387`, with an accompanying class in the associated `<style>` tag. This is adventageous as it reduces the overall size of the rendered email. In email, every byte counts towards your user's experience.

## Tailwind Plugins

The `Tailwind` component isn't compatible with [Tailwind Plugins](https://tailwindcss.com/docs/plugins) out of the box. This is a side-effect of using [UnoCSS](https://unocss.dev/) for our Tailwind processor. However, UnoCSS does have a set of commonly-used equivalent core [UnoCSS presets](https://unocss.dev/presets/), [Community Presets](https://unocss.dev/presets/community), and [Transformers](https://unocss.dev/transformers/variant-group). While not entirely ideal for 1:1 Tailwind plugin support, complex rulesets and plugins are an unlikely need for formatting emails. If you'd like to port a Tailwind plugin to an UnoCSS present, there is [documentation for that](https://unocss.dev/guide/presets) as well.

Should you find yourself in need of a Tailwind Plugin for an email template, please stop by our [Discord Channel](https://discord.gg/FywZN57mTg) and we'll be happy to help you.
