[npm]: https://img.shields.io/npm/v/jsx-email
[npm-url]: https://www.npmjs.com/package/jsx-email

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"/><br/><br/>
</div>

# JSX&thinsp;email

Build and send emails using React and TypeScript.

JSX email provides a set of React components and helpers for building delightful, responsive email templates that work across modern email clients. The components handle compatibility and client inconsistencies so designers and developers can focus on building impactful templates instead of fighting email rendering quirks.

## Version 3.0.0

Version 3 modernizes the runtime, package exports, preview app, scaffold, plugins, and CLI. It requires Node.js `22.0.0` or newer and React `19.1.0` or newer. Please read the [v3 Migration Guide](https://jsx.email/docs/v3/migration) before upgrading existing projects.

To browse the source code and documentation markdown for v2.8.4, use the [jsx-email-v2.8.4 tag](https://github.com/shellscape/jsx-email/tree/jsx-email-v2.8.4).

## Getting Started

Everything to know about components, props, and usage is available in the [Documentation](https://jsx.email/docs/introduction).

For new projects, use `create-mail`:

```sh
npx create-mail my-email-project
```

## Requirements

The packages and components that make up JSX email require an [LTS](https://github.com/nodejs/Release) Node version, v22.0.0 or newer, and React v19.1.0 or newer.

## Components

A list of available components can be found in the [JSX email documentation](https://jsx.email/docs/introduction).

## Featured Features

The goals of this project are to provide an improved focus on Developer Experience, maintenance, fast improvements, and fast releases. JSX email includes:

- [Email Client Compatibility Checking](https://jsx.email/docs/core/cli#client-compatibility-check)
- Exclusive Components
- Handles cross-client inconsistencies for you
- Optional Configuration Files
- Plugins
- Crazy fast Tailwind support
- Support for `<Suspense>` and `async` within Components
- Enhanced Developer Experience (DX)
- Wonderful Command Line tools
- Works with Monorepos out of the box. No exhaustive setup needed.
- A smooth and simple Preview Server
- Fast improvements, feature development, and releases
- Community-driven, not Company-driven
- No vendor lock-in for tools. `jsx-email` uses only generic components and tools

## Service Integrations

Email built and rendered with JSX email can be used with any email provider that provides an API for sending email as a string. This includes [AWS SES](https://aws.amazon.com/ses), [Loops](https://loops.so), [Nodemailer](https://nodemailer.com), [Postmark](https://postmarkapp.com), [Resend](https://resend.com), [Plunk](https://www.useplunk.com/), and [SendGrid](https://sendgrid.com). See [Email Providers](https://jsx.email/docs/email-providers) for more info and example usage.

## Contributing, Working With This Repo

We welcome contributions. This is a community-driven project with no corporate sponsorship or backing. The maintainers and users keep this project going.

Please check out our [Contribution Guide](./CONTRIBUTING.md).

We, the maintainers, use JSX email daily.

## License

[MIT License](./LICENSE.md)
