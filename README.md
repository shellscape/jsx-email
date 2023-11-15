[npm]: https://img.shields.io/npm/v/jsx-email
[npm-url]: https://www.npmjs.com/package/jsx-email

[![npm][npm]][npm-url]
[![Join our Discord](https://img.shields.io/badge/join_our-Discord-5a64ea)](https://discord.gg/FywZN57mTg)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"/><br/><br/>
</div>

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub" class="brackets" />
  <svg xmlns="http://www.w3.org/2000/svg" height="20" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="brackets">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
  JSX email provides a set of React components and helpers for building delightful and responsive email templates, compatible with modern email clients.
  <br/><br/>
  The components handle the heavy lifting of compatibility and client inconsistency so designers and developers can focus on building impactful and engaging templates.
  <br/>
</div>

## Getting Started

Everything to know about the components, props, and usage is available within our [Documentation Site](https://jsx.email/docs/introduction). Please give that a read and let us know if there's anything we can help with.

## Requirements

The packages and components that make up JSX email require an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+

<div>
  <br/>
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/clients.svg" alt="JSX email" class="clients"/><br/>
  Compatible with all modern email services
  <br/><br/>
</div>

## Components

A list of available components can be found on the [`jsx-email` Documentation](https://jsx.email/docs/introduction)

## Advantages Over `react-email`

The goals of this project are to provide an improved focus on Developer Experience, maintenance, fast improvements and fast releases. As such, we feel that `jsx-email` has a number of improvements and advantages over `react-email`. Those include:

- [Email Client Compatibility Checking](https://jsx.email/docs/core/cli#client-compatibility-check)
- Crazy fast Tailwind support
- Support for `<Suspense>` and `async` within Components
- Exclusive Components
- Enhanced Developer Experience (DX)
- Better Command Line tools
- Less complex, smoother Preview Server
- Faster improvements, feature development, and releases
- Community-driven maintenance rather than company-planning priority
- No vendor lock-in for tools. `jsx-email` uses only generic components and tools

## Service Integrations

Email built and rendered with JSX email can be used with any email provider that provides an API for sending email as a `String`.
This includes [AWS SES](https://aws.amazon.com/ses), [Loops](https://loops.so), [Nodemailer](https://nodemailer.com), [Postmark](https://postmarkapp.com),[Resend](https://resend.com), and [SendGrid](https://sendgrid.com). See our documentation on [Email Providers](http://localhost:5173/docs/email-providers) for more info and example usage.

<!-- FIXME: Write and link to example code for integrations on the docs site -->

## Contributing, Working With This Repo

We 💛 contributions! After all, this is a community-driven project. We have no corporate sponsorship or backing. The maintainers and users keep this project going!

Please check out our [Contribution Guide](./CONTRIBUTING.md).

## Attribution 🧡

This project was built upon prior work for `react-email` by Bu Kinoshita ([@Joker](https://twitter.com/Joker)) and Bruce Wayne ([@Batman](https://twitter.com/Batman)).

`jsx-email` is a fork of `react-email`.

We (the maintainers) use JSX email daily. This fork was originally created as a canary channel for fixes from pull requests and issues that had been left unaddressed. JSX email grew faster, and the upstream team didn't give the project the love we felt it needed. When our help wasn't accepted, we felt a new direction was warranted.

## License

[MIT License](./LICENSE.md)
