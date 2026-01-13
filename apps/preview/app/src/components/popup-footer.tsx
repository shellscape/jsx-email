import { Icon } from '@iconify/react';
import { Link as ReactRouterDomLink } from 'react-router-dom';

import { Button } from './ui/button';
import { Link } from './ui/link.js';
import { Separator } from './ui/separator.js';

export const PopupFooter = () => (
  <div className="w-full flex items-center justify-between gap-x-4 gap-y-8 flex-wrap px-8 sm:px-12 py-6">
    <div className="flex items-center gap-x-5">
      <Button asChild>
        <ReactRouterDomLink to="https://jsx.email/docs">Documentation</ReactRouterDomLink>
      </Button>
      <Separator orientation="vertical" className="h-12" />
      <ReactRouterDomLink to="https://jsx.email/github">
        <Icon icon="mdi:github" className="h-8 w-8" />
        <span className="sr-only">Go to JSX Email's Github</span>
      </ReactRouterDomLink>
      <ReactRouterDomLink to="https://jsx.email/discord">
        <Icon icon="ic:baseline-discord" className="h-8 w-8" />
        <span className="sr-only">Go to JSX Email's Discord</span>
      </ReactRouterDomLink>
    </div>
    <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
      <Link to="https://samples.jsx.email">Email Samples</Link>
      <Link to="https://pro.jsx.email">Pro Templates</Link>
    </div>
  </div>
);
