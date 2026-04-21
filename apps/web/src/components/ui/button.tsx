import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/helpers/cn';

const buttonVariants = cva(
  "group/button inline-flex min-h-[38px] shrink-0 cursor-pointer items-center justify-center rounded border bg-clip-padding px-[13px] text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-docs-border/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'border-docs-border-soft bg-[var(--surface-muted)] text-docs-text hover:border-docs-border hover:bg-docs-surface-raised',
        alt: 'border-[var(--button-alt-border)] bg-[var(--button-alt-bg)] [color:var(--button-alt-fg)] hover:border-[var(--button-alt-hover-border)] hover:bg-[var(--button-alt-hover-bg)] hover:[color:var(--button-alt-hover-fg)]',
        brand:
          'border-[var(--brand-active)] bg-docs-brand [color:var(--brand-button-fg)] hover:bg-[var(--brand-hover)] active:bg-[var(--brand-active)]',
        info: 'border-[var(--blue-hover)] bg-[var(--blue)] text-[var(--button-info-fg)] hover:bg-[var(--blue-hover)]',
        ghost:
          'border-docs-border-soft bg-transparent text-docs-text hover:border-[var(--blue)] hover:bg-[var(--ghost-hover-bg)]',
        link: 'min-h-0 border-transparent bg-transparent p-0 text-[var(--link-accent)] underline-offset-4 hover:underline'
      },
      size: {
        default: 'gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        xs: "min-h-6 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: 'min-h-8 gap-1 px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
        lg: 'min-h-10 gap-1.5 px-4 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9 min-h-0 p-0',
        'icon-xs': "size-6 min-h-0 p-0 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8 min-h-0 p-0',
        'icon-lg': 'size-10 min-h-0 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    rel?: string;
    target?: string;
  };

function Button({
  className,
  href,
  nativeButton,
  rel,
  render: renderProp,
  target,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  const render = href ? <a href={href} rel={rel} target={target} /> : renderProp;

  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      nativeButton={href ? false : nativeButton}
      render={render}
      className={cn(buttonVariants({ variant, size, className }))}
    />
  );
}

export { Button, buttonVariants };
