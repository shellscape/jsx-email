---
title: 'Email Provider Integrations'
description: 'Use JSX email with an Email Provider of your choice'
---

<!--@include: @/include/header.md-->

Using JSX email with email providers or integrations is as simple as rendering the template you've already built. Rendering transforms your template from JSX/TSX into HTML, and optionally plain text. That's accomplished with the [@jsx-email/render](/docs/core/render) core package. _We're going to assume that you've made it through the [Quick Start Guide](/docs/quick-start) before arriving here, and have an email template to use._

While JSX email can be used with just about any emal provider that takes a string for content input, this page will demonstrate use with a few popular providers.

## AWS SES

```tsx
import { render } from '@jsx-email/render';
import { SES } from '@aws-sdk/client-ses';

import { BatmanTemplate } from './emails/Batman.tsx';

const ses = new SES({ region: process.env.AWS_SES_REGION });
const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);

await ses.sendEmail({
  Source: 'penguin@joker.us',
  Destination: {
    ToAddresses: ['bruce@wayneinc.com']
  },
  Message: {
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
});
```

## Mailersend

```tsx
import { render } from '@jsx-email/render';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

import { BatmanTemplate } from './emails/Batman.tsx';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || ''
});

const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);
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
import { render } from '@jsx-email/render';
import nodemailer from 'nodemailer';

import { BatmanTemplate } from './emails/Batman.tsx';

const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);
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
import { render } from '@jsx-email/render';
import { ServerClient } from 'postmark';

import { BatmanTemplate } from './emails/Batman.tsx';

const client = new ServerClient(process.env.POSTMARK_API_KEY);
const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);

client.sendEmail({
  From: 'penguin@joker.us',
  To: 'bruce@wayneinc.com',
  Subject: 'Did you get that thing I sent you?',
  HtmlBody: html
});
```

## Resend

```tsx
import { Resend } from 'resend';

import { BatmanTemplate } from './emails/Batman.tsx';

const resend = new Resend('re_123456789');

resend.sendEmail({
  from: 'penguin@joker.us',
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?',
  react: <BatmanTemplate firstName="Bruce" lastName="Wayne" />
});
```

## Sendgrid

```tsx
import { render } from '@jsx-email/render';
import sendgrid from '@sendgrid/mail';

import { BatmanTemplate } from './emails/Batman.tsx';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const html = render(<BatmanTemplate firstName="Bruce" lastName="Wayne" />);

sendgrid.send({
  from: 'penguin@joker.us',
  to: 'bruce@wayneinc.com',
  subject: 'Did you get that thing I sent you?',
  html: html
});
```
