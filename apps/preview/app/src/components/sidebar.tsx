import * as Collapsible from '@radix-ui/react-collapsible';
import classnames from 'classnames';
import { LayoutGroup, motion } from 'framer-motion';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from './logo';

type SidebarElement = React.ElementRef<'aside'>;
type RootProps = React.ComponentPropsWithoutRef<'aside'>;

interface SidebarProps extends RootProps {
  templateNames: string[];
  title?: string;
}

export const Sidebar = React.forwardRef<SidebarElement, Readonly<SidebarProps>>(
  ({ className, templateNames, title, ...props }, forwardedRef) => (
    <aside ref={forwardedRef} className={className} {...props}>
      <nav className="h-full p-6 w-screen md:w-full md:min-w-[275px] md:max-w-[275px] flex flex-col gap-4 border-r border-dark-bg-border">
        <Logo />
        <Collapsible.Root className="pt-4" defaultOpen>
          <Collapsible.Trigger
            className={classnames('flex items-center gap-1', {
              'cursor-default': templateNames && templateNames.length === 0
            })}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.25 17.25V9.75C19.25 8.64543 18.3546 7.75 17.25 7.75H4.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 7.5L12.5685 5.7923C12.2181 5.14977 11.5446 4.75 10.8127 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex items-center transition ease-in-out duration-200 hover:text-dark-bg-text">
              <h3 className="text-sm font-medium transition ease-in-out duration-200 hover:text-dark-bg-text">
                Email Templates
              </h3>
              {templateNames && templateNames.length > 0 && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 15L8.5359 9.75L15.4641 9.75L12 15Z" fill="currentColor" />
                </svg>
              )}
            </div>
          </Collapsible.Trigger>

          {templateNames && templateNames.length > 0 && (
            <Collapsible.Content className="relative mt-3">
              <div className="absolute left-2.5 w-px h-full bg-slate-6" />

              <div className="py-2 flex flex-col truncate">
                <LayoutGroup id="sidebar">
                  {templateNames &&
                    templateNames.map((item) => {
                      const isCurrentPage = title === item;
                      return (
                        <Link key={item} to={`/${item}`}>
                          <motion.span
                            className={classnames(
                              'text-[14px] flex items-center gap-2 w-full pl-4 h-8 rounded-md relative transition ease-in-out duration-200',
                              {
                                'font-medium': isCurrentPage,
                                'hover:text-dark-bg-text': title !== item,
                                'text-cyan-11': isCurrentPage
                              }
                            )}
                          >
                            {isCurrentPage && (
                              <motion.span
                                layoutId="sidebar"
                                className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-[#78b0a04d]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="bg-[#61efce] w-px absolute top-1 left-2.5 h-6" />
                              </motion.span>
                            )}
                            <svg
                              className="flex-shrink-0"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V9L14 4.75H7.75C6.64543 4.75 5.75 5.64543 5.75 6.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25Z"
                                stroke="currentColor"
                                strokeOpacity="0.927"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 9.25H13.75V5"
                                stroke="currentColor"
                                strokeOpacity="0.927"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {item}
                          </motion.span>
                        </Link>
                      );
                    })}
                </LayoutGroup>
              </div>
            </Collapsible.Content>
          )}
        </Collapsible.Root>
      </nav>
    </aside>
  )
);

Sidebar.displayName = 'Sidebar';
