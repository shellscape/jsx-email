export const multipartEml = (params: {
  html: string;
  plain: string;
  subject?: string;
}) => `From: Preview <preview@jsx.email>\r
To: Recipient <recipient@example.com>\r
Subject: ${params.subject || 'Preview'}\r
Date: Wed, 13 May 2026 12:00:00 +0000\r
Message-ID: <preview-1@jsx.email>\r
MIME-Version: 1.0\r
Content-Type: multipart/alternative; boundary="canispam-boundary"\r
\r
--canispam-boundary\r
Content-Type: text/plain; charset=utf-8\r
Content-Transfer-Encoding: quoted-printable\r
\r
${params.plain}\r
--canispam-boundary\r
Content-Type: text/html; charset=utf-8\r
Content-Transfer-Encoding: quoted-printable\r
\r
${params.html}\r
--canispam-boundary--\r
`;

export const htmlEml = (html: string, subject = 'Preview') => `From: preview@jsx.email
To: recipient@example.com
Subject: ${subject}
Date: Wed, 13 May 2026 12:00:00 +0000
Message-ID: <preview-1@jsx.email>
MIME-Version: 1.0
Content-Type: text/html; charset=utf-8

${html}
`;

export const plainEml = (plain: string, subject = 'Preview') => `From: preview@jsx.email
To: recipient@example.com
Subject: ${subject}
Date: Wed, 13 May 2026 12:00:00 +0000
Message-ID: <preview-1@jsx.email>
MIME-Version: 1.0
Content-Type: text/plain; charset=utf-8

${plain}
`;
