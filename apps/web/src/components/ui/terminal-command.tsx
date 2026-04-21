import { cn } from '@/helpers/cn';

interface TerminalCommandProps {
  className?: string;
  command: string;
  prompt?: string;
  runner: string;
}

export function TerminalCommand({
  className,
  command,
  prompt = '$',
  runner
}: TerminalCommandProps) {
  return (
    <div
      data-slot="terminal-command"
      className={cn(
        'overflow-hidden rounded-[6px] border border-[var(--mode-card-border)] bg-[var(--stone-7)] text-docs-text',
        className
      )}
    >
      <div className="flex items-center gap-2 bg-[var(--stone-7)] px-3 pt-3">
        <span className="size-2.5 rounded-full bg-[var(--amber-0)]" />
        <span className="size-2.5 rounded-full bg-[var(--amber-4)]" />
        <span className="size-2.5 rounded-full bg-[var(--mint-2)]" />
      </div>
      <code className="block overflow-x-auto p-4 [font-family:SFMono-Regular,Consolas,Menlo,Monaco,monospace] text-[0.95rem] leading-6 text-docs-text-subtle">
        <span className="mr-2 text-docs-text-subtle">{prompt}</span>
        <span>{runner} </span>
        <span className="font-semibold text-docs-text-strong">{command}</span>
      </code>
    </div>
  );
}
