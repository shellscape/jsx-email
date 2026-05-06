import { Icon } from '@iconify/react';
import { Link as ReactRouterDomLink } from 'react-router-dom';

export const Link = ({
  children,
  className,
  ...props
}: Parameters<typeof ReactRouterDomLink>[0]) => (
  <ReactRouterDomLink className="inline-flex gap-2 font-medium group/link" {...props}>
    <span>{children}</span>
    <Icon
      icon="lucide:arrow-up-right"
      className="w-6 h-6 opacity-20 group-hover/link:opacity-100 transition duration-300"
    />
  </ReactRouterDomLink>
);
