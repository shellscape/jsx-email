import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../helpers/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'icon' | 'default';
  variant?: 'default' | 'outline' | 'ghost';
}

export function Button({
  children,
  className,
  size: _size,
  variant = 'default',
  ...props
}: ButtonProps) {
  void _size;

  return (
    <button
      className={cn(
        'app-button cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed',
        variant === 'default' &&
          'is-active hover:bg-[var(--control-active)] hover:text-[var(--control-active-text)]',
        variant === 'outline' &&
          'border border-[var(--border)] bg-[var(--surface-raised)] text-[var(--text)] hover:bg-[var(--control-hover)]',
        variant === 'ghost' && '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
