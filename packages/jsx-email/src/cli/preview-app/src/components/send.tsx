import * as Popover from '@radix-ui/react-popover';
import * as React from 'react';

import { Text } from './text';

export const Send = ({ markup }: { markup: string }) => {
  const [to, setTo] = React.useState('');
  const [subject, setSubject] = React.useState('Testing React Email');
  const [isSending, setIsSending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onFormSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSending(true);
      setSubmitError(null);

      const response = await fetch('https://react.email/api/send/test', {
        body: JSON.stringify({
          html: markup,
          subject,
          to
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      });

      if (response.status === 429) {
        const { error } = await response.json();
        setSubmitError(error);
      }
    } catch (error: unknown) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="outline-none text-sm font-medium px-4 py-2 transition ease-in-out duration-200 relative bg-darker-bg border border-dark-bg-border rounded-md">
          Send
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          className="w-80 -mt-10 p-3 bg-dark-bg border border-dark-bg-border text-dark-bg-text rounded-lg"
        >
          <Popover.Close
            aria-label="Close"
            className="absolute right-2 flex items-start justify-center w-6 h-6 text-xs transition duration-300 ease-in-out rounded-full"
          >
            ✕
          </Popover.Close>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="to" className="text-xs uppercase mb-2 block">
              Recipient
            </label>
            <input
              autoFocus={true}
              className="appearance-none rounded-lg px-2 py-1 mb-3 outline-none w-full bg-slate-3 border placeholder-slate-10 border-slate-6 text-slate-12 text-sm focus:ring-1 focus:ring-slate-12 transition duration-300 ease-in-out"
              onChange={(e) => setTo(e.target.value)}
              defaultValue={to}
              placeholder="you@example.com"
              type="email"
              id="to"
              required
            />
            <label htmlFor="subject" className="text-xs uppercase mb-2 block">
              Subject
            </label>
            <input
              className="appearance-none rounded-lg px-2 py-1 mb-3 outline-none w-full bg-slate-3 border placeholder-slate-10 border-slate-6 text-slate-12 text-sm focus:ring-1 focus:ring-slate-12 transition duration-300 ease-in-out"
              onChange={(e) => setSubject(e.target.value)}
              defaultValue={subject}
              placeholder="My Email"
              type="text"
              id="subject"
              required
            />
            <input type="checkbox" className="appearance-none checked:bg-blue-500" />
            <Text className="inline-block mb-3 text-error-text">{submitError}</Text>
            <div className="flex items-center justify-between">
              <Text className="inline-block" size="1">
                Powered by{' '}
                <a
                  className="hover:text-slate-12 transition ease-in-out duration-300"
                  href="https://resend.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resend
                </a>
              </Text>
              <button
                type="submit"
                disabled={subject.length === 0 || to.length === 0 || isSending}
                className="disabled:bg-slate-11 disabled:border-transparent outline-none text-sm font-medium px-3 py-1 transition ease-in-out duration-200 relative bg-cta-bg text-cta-text rounded-md"
              >
                Send
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
