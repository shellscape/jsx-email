import classNames from 'classnames';
import * as React from 'react';

import type { TemplatePart, Views } from '../types';

import { Sidebar } from './sidebar';
import { Nav } from './nav';

type ShellElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

interface ShellProps extends RootProps {
  activeView?: Views;
  html?: string;
  setActiveView?: (view: string) => void;
  templateParts: TemplatePart[];
}

export const Shell = React.forwardRef<ShellElement, Readonly<ShellProps>>(
  ({ title, templateParts, children, html, activeView, setActiveView }, forwardedRef) => {
    const [showNav] = React.useState(false);
    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <div ref={forwardedRef} className="flex justify-between h-full">
          <Sidebar
            className={classNames('w-screen max-w-full md:max-w-[275px]', {
              'translate-x-[-100%] lg:translate-x-0 absolute lg:relative': !showNav,
              'translate-x-0': showNav
            })}
            templateParts={templateParts}
            title={title}
          />
          <main
            className={classNames('bg-darker-bg', {
              'w-[calc(100%_-_275px)]': showNav,
              'w-screen lg:w-[calc(100%_-_275px)]': !showNav
            })}
          >
            {title && (
              <Nav
                title={title}
                activeView={activeView}
                setActiveView={setActiveView}
                markup={html}
              />
            )}
            <div className="relative h-[calc(100vh_-_70px)] overflow-auto">
              <div className="mx-auto">{children}</div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

Shell.displayName = 'Shell';
