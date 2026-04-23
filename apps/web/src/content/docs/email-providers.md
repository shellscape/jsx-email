---
title: 'Email Provider Integrations'
description: 'Use JSX email with an Email Provider of your choice'
---

<!--@include: @/include/header.md-->

Using JSX email with email providers or integrations is as simple as rendering the template you've already built. Rendering transforms your template from JSX/TSX into HTML, and optionally plain text. That's accomplished with the [jsx-email `render`](/docs/core/render) method. _We're going to assume that you've made it through the [Quick Start Guide](/docs/quick-start) before arriving here, and have an email template to use._

While JSX email can be used with just about any email provider that takes a string for content input, this page will demonstrate use with a few popular providers.

## AWS SES

```tsx
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { render } from 'jsx-email';

import { Template } from './emails/Batman.tsx';

const ses = new SESv2Client({ region: process.env.AWS_SES_REGION });
const html = await render(<Template firstName="Bruce" lastName="Wayne" />);

await ses.send(
  new SendEmailCommand({
    FromEmailAddress: 'penguin@joker.us',
    Destination: {
      ToAddresses: ['bruce@wayneinc.com']
    },
    Content: {
      Simple: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Did you get that thing I sent you?'
        }
      }
    }
  })
);
```

## Mailersend

```tsx
import { render } from 'jsx-email';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

import { Template } from './emails/Batman.tsx';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || ''
});

const html = render(<Template firstName="Bruce" lastName="Wayne" />);
const sentFrom = new Sender('penguin@joker.us', 'Copperpot');
const recipients = [new Recipient('bruce@wayneinc.com', 'Bruce Wayne')];

const params = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setSubject('This is a Subject')
  .setHtml(html);

mailerSend.email.send(params);
```

## Nodemailer

```tsx
import { render } from 'jsx-email';
import nodemailer from 'nodemailer';

import { Template } from './emails/Batman.tsx';

const html = render(<Template firstName="Bruce" lastName="Wayne" />);
const transport = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    user: 'batman',
    pass: 'j0ker$mells!1'
  }
});

await transport.sendMail({
  from: 'penguin@joker.us',
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?',
  html: html
});
```

## Postmark

```tsx
import { render } from 'jsx-email';
import { ServerClient } from 'postmark';

import { Template } from './emails/Batman.tsx';

const client = new ServerClient(process.env.POSTMARK_API_KEY);
const html = render(<Template firstName="Bruce" lastName="Wayne" />);

client.sendEmail({
  From: 'penguin@joker.us',
  To: 'bruce@wayneinc.com',
  Subject: 'Did you get that thing I sent you?',
  HtmlBody: html
});
```

## Resend

::: tip
The `resend` package ships with support for `react-email` with its `react` property on `sendEmail`. However, `react-email` is fairly far behind `jsx-email` in terms of functionality, and its render method cannot process the advanced features in `jsx-email`. Because of that, users should run jsx-email's `render` method as shown below, to render html first, and pass that to the `sendEmail` function.
:::

```tsx
import { render } from 'jsx-email';
import { Resend } from 'resend';

import { Template } from './emails/Batman.tsx';

const resend = new Resend('re_123456789');
const template = <Template firstName="Bruce" lastName="Wayne" />;
const html = await render(template);

resend.sendEmail({
  from: 'penguin@joker.us',
  html,
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?'
});
```

## Sendgrid

```tsx
import sendgrid from '@sendgrid/mail';
import { render } from 'jsx-email';

import { Template } from './emails/Batman.tsx';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const html = render(<Template firstName="Bruce" lastName="Wayne" />);

sendgrid.send({
  from: 'penguin@joker.us',
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?',
  html: html
});
```

## Plunk

```tsx
import Plunk from '@plunk/node';
import { render } from 'jsx-email';

import { Template } from './emails/Batman.tsx';

const plunk = new Plunk(process.env.PLUNK_API_KEY);

const html = render(<Template firstName="Bruce" lastName="Wayne" />);

plunk.emails.send({
  from: 'penguin@joker.us',
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?',
  body: html
});
```
