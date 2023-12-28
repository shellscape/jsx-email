import { Cross2Icon, QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import * as Popover from '@radix-ui/react-popover';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import classnames from 'classnames';
import { LayoutGroup } from 'framer-motion';
import * as React from 'react';

import { Views } from '../types';

import { NavButton } from './nav-button';

interface NavProps extends React.ComponentPropsWithoutRef<'header'> {
  activeView?: Views;
  markup?: string;
  setActiveView?: (view: Views) => void;
  title: string;
}

export const Nav = React.forwardRef<React.ElementRef<'header'>, Readonly<NavProps>>(
  ({ className, title, markup, activeView, setActiveView, ...props }, forwardedRef) => (
    <header
      ref={forwardedRef}
      className={classnames(
        'bg-dark-bg flex relative items-center px-6 justify-between h-[70px] border-b border-dark-bg-border',
        className
      )}
      {...props}
    >
      <div className={`items-center overflow-hidden hidden lg:flex`}>
        <h2 className="text-base font-bold truncate text">{title}</h2>
      </div>

      <div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              className="align-top h-[20px] w-[20px] pt-[9px] mr-4"
              aria-label="Preview Information"
            >
              <QuestionMarkCircledIcon className="h-[20px] w-[20px]" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="note" sideOffset={5}>
              <div className="pt-4 text-xs">
                The Desktop and Mobile views are <em>an approximation</em> of what your email
                template will looke like on various devices. It should not be considered a source of
                truth, but rather a guide for styling and layout. Always send a test email to your
                target email clients for Quality Control, before sending emails in production.
              </div>
              <Popover.Close className="note-close" aria-label="Close">
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="note-arrow" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        <LayoutGroup id="topbar">
          {setActiveView && (
            <ToggleGroup.Root
              className="inline-block items-center bg-darker-bg border border-dark-bg-border rounded overflow-hidden"
              type="single"
              value={activeView}
              aria-label="View mode"
              onValueChange={(value) => {
                if (value) setActiveView(value as Views);
              }}
            >
              <NavButton
                activeView={activeView}
                addClassNames="px-1 py-1 sm:px-3 sm:py-2"
                label={Views.Desktop}
              />
              <NavButton activeView={activeView} label={Views.Mobile} />
              <NavButton activeView={activeView} label={Views.Jsx} />
              <NavButton activeView={activeView} label={Views.Html} />
              <NavButton activeView={activeView} label={Views.Plain} />
            </ToggleGroup.Root>
          )}
        </LayoutGroup>
      </div>
    </header>
  )
);

Nav.displayName = 'Nav';
