# @jsx-email/text

## Requirements

This packages requires an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

## Install

```shell
pnpm add @jsx-email/text

# We recommend pnpm - https://pnpm.io
# But npm and yarn are supported
# npm add @jsx-email/text
# yarn add @jsx-email/text
```


## Usage

We recommend using the [../cli](`@jsx-email/cli`) for creating new templates.

Create an email template file (e.g. `Email.tsx`) and import the component:

```jsx
import { Text } from "@jsx-email/text";

const Email = () => {
  return <Text>Lorem ipsum</Text>;
};
```

## License

[MIT License](./LICENSE.md)
