import { MailOut, Refresh } from 'iconoir-react';
import { FormEvent } from 'react';

import { plunkApiBearerTokenProvidedOnlyForJsxEmailUiDoNotUseElsewhere } from '../../helpers/consts';
import { usePreviewStore } from '../../stores/preview-store';
import { PlunkLogo } from '../plunk-logo';

interface SendEmailSectionProps {
  cardId: string;
  html: string;
}

export function SendEmailSection({ cardId, html }: SendEmailSectionProps) {
  const lab = usePreviewStore((state) => state.labs[cardId]);
  const updateLab = usePreviewStore((state) => state.updateLab);
  const sendEmail = lab?.sendEmail || '';
  const sendState = lab?.sendState || 'idle';

  async function handleSend(event: FormEvent) {
    event.preventDefault();
    if (!sendEmail.trim() || sendState === 'sending') return;

    updateLab(cardId, { sendError: null, sendState: 'sending' });

    try {
      const startedAt = Date.now();
      const response = await fetch('https://api.useplunk.com/v1/send', {
        body: JSON.stringify({
          body: html,
          subject: 'Test jsx-email template',
          to: sendEmail
        }),
        headers: {
          Authorization: `Bearer ${plunkApiBearerTokenProvidedOnlyForJsxEmailUiDoNotUseElsewhere}`,
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      const waitMs = Math.max(0, 4000 - (Date.now() - startedAt));
      if (waitMs > 0) await new Promise((resolve) => window.setTimeout(resolve, waitMs));

      if (response.status !== 200) {
        updateLab(cardId, { sendError: await response.text(), sendState: 'error' });
        return;
      }

      updateLab(cardId, { sendError: null, sendState: 'sent' });
      window.setTimeout(() => updateLab(cardId, { sendState: 'idle' }), 3000);
    } catch {
      updateLab(cardId, {
        sendError: 'Something went wrong. Please try again.',
        sendState: 'error'
      });
    }
  }

  return (
    <form onSubmit={handleSend}>
      <label
        className="mb-2 block text-xs uppercase tracking-[0.08em] text-[var(--text-subtle)]"
        htmlFor="preview-send-to"
      >
        Recipient
      </label>
      <input
        className="send-input mb-3"
        id="preview-send-to"
        onChange={(event) =>
          updateLab(cardId, {
            sendEmail: event.target.value,
            sendError: null,
            sendState: sendState === 'error' ? 'idle' : sendState
          })
        }
        placeholder="you@example.com"
        required
        type="email"
        value={sendEmail}
      />
      {lab?.sendError && (
        <p className="mb-3 text-xs leading-5 text-[var(--text)]">
          Error while sending email: {lab.sendError}
        </p>
      )}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[var(--text-subtle)]">
          Powered by{' '}
          <a
            className="inline-flex items-center gap-1 hover:underline"
            href="https://useplunk.com"
            rel="noreferrer"
            target="_blank"
          >
            Plunk <PlunkLogo className="h-5 w-5" />
          </a>
        </p>
        <button
          className="send-button inline-flex h-9 w-[82px] cursor-pointer items-center justify-center gap-1.5 rounded-[6px] px-3 text-sm font-medium disabled:cursor-not-allowed"
          disabled={!sendEmail.trim().length || sendState === 'sending' || sendState === 'sent'}
          type="submit"
        >
          {sendState === 'idle' && 'Send'}
          {sendState === 'sending' && (
            <>
              <Refresh className="send-spin size-4" />
              Send
            </>
          )}
          {sendState === 'sent' && (
            <>
              <MailOut className="size-4" />
              Sent!
            </>
          )}
          {sendState === 'error' && 'Error'}
        </button>
      </div>
    </form>
  );
}
