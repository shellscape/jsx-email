import { cn } from '../../helpers/cn';

interface SwitchControlProps {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
  tooltip: string;
}

export function SwitchControl({ checked, label, onChange, tooltip }: SwitchControlProps) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-3 py-1.5"
      onClick={() => onChange(!checked)}
    >
      <span className="text-sm text-[var(--text)]" data-tippy-content={tooltip}>
        {label}
      </span>
      <button
        aria-label={label}
        aria-pressed={checked}
        className={cn('switch', checked && 'is-on')}
        onClick={(event) => {
          event.stopPropagation();
          onChange(!checked);
        }}
        type="button"
      >
        <span />
      </button>
    </div>
  );
}
