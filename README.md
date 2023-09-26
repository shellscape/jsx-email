
[npm]: https://img.shields.io/npm/v/@jsx-email/html
[npm-url]: https://www.npmjs.com/package/@jsx-email/html

[![npm][npm]][npm-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

<div align="center">
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/npm-header.svg" alt="JSX email"><br/><br/>
</div>

<div>
  <img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/brackets.svg" alt="JSX email" valign="sub">
  JSX email provides a set of React components and helpers for building delightful and responsive email templates, compatible with modern email clients.
  <br/><br/>
  The components handle the heavy lifting of compatibility and client insonsistency so designers and developers can focus on building impactful and engaging templates.
  <br/>
<div>

## Getting Started

Everything to know about the components, props, and usage is available within our [Documentation Site](https://jsx.email/docs). Please give that a read and let us know if there's anything we can help with.

## Requirements

The packages and components that make up JSX email require an [LTS](https://github.com/nodejs/Release) Node version (v18.0.0+) and React v18.2.0+.

<div>
  <br/>
	<img src="https://raw.githubusercontent.com/shellscape/jsx-email/main/assets/clients.svg" alt="JSX email"><br/>
  Compatible with all modern email services
  <br/><br/>
</div>

## Components

A list of available components found here:

|                                     |                                                                                           |
| ------------------------------------| ----------------------------------------------------------------------------------------- |
| [body](packages/body)               |                                         |
| [button](packages/button)           |                                         |
| [column](packages/column)           |                                         |
| [container](packages/container)     |                                         |
| [font](packages/font)               |                                         |
| [head](packages/head)               |                                         |
| [heading](packages/heading)         |                                         |
| [hr](packages/hr)                   |                                         |
| [html](packages/html)               |                                         |
| [image](packages/image)             |                                         |
| [link](packages/link)               |                                         |
| [markdown](packages/markdown)       |                                         |
| [preview](packages/preview)         |                                         |
| [row](packages/row)                 |                                         |
| [section](packages/section)         |                                         |
| [tailwind](packages/tailwind)       |                                         |
| [text](packages/text)               |                                         |
|                                     |                                                                                           |

## Helper Packages

A list of available helper packages found here:

|                                     |                                                            |
| ----------------------------------- | ---------------------------------------------------------- |
| [all](packages/all)                 | A package containing all available JSX email components    |
| [cli](packages/cli)                 | A CLI for working with Email Templates made with jsx-email |
| [render](packages/render)           | Render JSX email components to HTML email                  |
|                                     |                                                            |

## Service Integrations

Email built and rendered with JSX email can be used with any email provider that provides an API for sending email as a `String`.
This includes [AWS SES](https://aws.amazon.com/ses), [Loops](https://loops.so), [Nodemailer](https://nodemailer.com), [Postmark](https://postmarkapp.com),[Resend](https://resend.com), and [SendGrid](https://sendgrid.com).

<!-- FIXME: Write and link to example code for integrations on the docs site -->

## Contributing, Working With This Repo

We 💛 contributions! After all, this is a community-driven project. We have no corporate sponsorship or backing. The maintainers and users keep this project going!

Please check out our [Contribution Guide](./CONTRIBUTING.md).

## Attribution 🧡

This project was built upon prior work for `react-email` by Bu Kinoshita ([@bukinoshita](https://twitter.com/bukinoshita)) and Zeno Rocha ([@zenorocha](https://twitter.com/zenorocha)).

`JSX email` is a fork of `react-email`. The goals of this project are to provide similar benefits, with an improved focus on Developer Experience, maintenance, fast improvements and fast releases. Improvements over `react-email` include:

- Smoother Developer Experience (DX)
- Better Command Line tools
- Less complex, smoother Preview Server
- Faster improvements and releases
- Community-driven maintenance
- No vendor lock-in for tools. `jsx-email` uses only generic components and tools.

## License

[MIT License](./LICENSE.md)
