import type { ReactNode } from 'react';

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  durationSeconds?: number;
  pauseOnHover?: boolean;
};

export const Marquee = ({
  children,
  className = '',
  durationSeconds = 30,
  pauseOnHover = false
}: MarqueeProps) => {
  const trackClassName = [
    'flex min-w-full shrink-0 items-center justify-around',
    '[animation:jsx-email-marquee-scroll_var(--marquee-duration)_linear_infinite]',
    pauseOnHover && 'group-hover:[animation-play-state:paused]'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`group flex w-full overflow-hidden ${className}`}
      style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
    >
      <style>
        {`
          @keyframes jsx-email-marquee-scroll {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-100%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [style*="--marquee-duration"] > * {
              animation-play-state: paused;
            }
          }
        `}
      </style>
      <div className={trackClassName}>{children}</div>
      <div className={trackClassName} aria-hidden="true">
        {children}
      </div>
    </div>
  );
};
