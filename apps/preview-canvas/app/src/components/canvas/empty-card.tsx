export function EmptyCard() {
  return (
    <div className="empty-card-shell mt-24 flex h-[520px] w-[var(--card-width)] items-center justify-center rounded-[var(--radius)] border border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--surface-raised)_88%,transparent)] text-[var(--text)] backdrop-blur-sm">
      <div className="empty-card-panel max-w-md rounded-[6px] border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="font-medium text-[var(--text-strong)]">jsx-email Preview</h2>
        <p className="mb-4 mt-2 text-sm leading-6 text-[var(--text)]">
          Start creating an email template by running{' '}
          <code className="docs-inline-code">email create &lt;template-name&gt;</code>
          <br />
          <br />
          Run <code className="docs-inline-code">email help create</code> for a list of options
          <br />
          <br />
          Happy coding!
        </p>
        <a
          className="inline-flex h-10 items-center justify-center rounded-[6px] bg-[var(--control-active)] px-4 text-sm font-medium text-[var(--control-active-text)]"
          href="https://jsx.email/docs/introduction"
          rel="noreferrer"
          target="_blank"
        >
          Read our Documentation
        </a>
      </div>
    </div>
  );
}
