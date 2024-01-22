import * as Collapsible from '@radix-ui/react-collapsible';
import classnames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { TemplatePart } from '../types';

import { Logo } from './logo';

type SidebarElement = React.ElementRef<'aside'>;
type RootProps = React.ComponentPropsWithoutRef<'aside'>;

interface SidebarProps extends RootProps {
  templateParts: TemplatePart[];
  title?: string;
}

interface SidebarSectionProps {
  currentPageTitle: string;
  isSubSection?: boolean;
  templateParts: TemplatePart[];
  title: string;
}

const FolderPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 ml-1"
  >
    <path
      fillRule="evenodd"
      d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const FolderMinus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 ml-1"
  >
    <path
      fillRule="evenodd"
      d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"
      clipRule="evenodd"
    />
  </svg>
);

const FileName = () => (
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
);

const SidebarSection = ({
  templateParts,
  currentPageTitle,
  isSubSection,
  title = 'Email Templates'
}: SidebarSectionProps) => {
  const { pathname: basePathName } = useLocation();
  const pathname = decodeURIComponent(
    basePathName.startsWith('/') ? basePathName.slice(1) : basePathName
  );

  const [isOpen, setIsOpen] = React.useState(
    !isSubSection || pathname.indexOf(title.toLowerCase()) > -1
  );

  return (
    <Collapsible.Root
      className={isSubSection ? 'py-1' : 'pt-4'}
      id={isSubSection ? `${title.replace(' ', '')}-sidebar-tree` : 'sidebar-tree'}
      onOpenChange={setIsOpen}
      defaultOpen={isOpen}
    >
      <Collapsible.Trigger
        className={classnames('flex items-center gap-1', {
          'cursor-default': templateParts && templateParts.length === 0
        })}
      >
        {isOpen ? <FolderMinus /> : <FolderPlus />}
        <div className="flex items-center transition ease-in-out duration-200 hover:text-dark-bg-text">
          <h3
            className={classnames(
              'text-sm transition ease-in-out duration-200 hover:text-dark-bg-text',
              { 'font-medium': currentPageTitle === title || !isSubSection, 'ml-2': isSubSection }
            )}
          >
            {title}
          </h3>
        </div>
      </Collapsible.Trigger>

      {templateParts && templateParts.length > 0 && (
        <Collapsible.Content
          className={classnames('relative collapsible-content', {
            'mt-1': isSubSection,
            'mt-3': !isSubSection
          })}
        >
          <div className="absolute left-2.5 w-px h-full bg-slate-6" />

          <div
            className={isSubSection ? 'py-0 flex flex-col truncate' : 'py-2 flex flex-col truncate'}
          >
            <div id={isSubSection ? `${title.replace(' ', '')}-sidebar` : 'sidebar'}>
              {templateParts &&
                templateParts.map((item) => {
                  const isCurrentPage = pathname === item.path;
                  const isParent = item.children && item.children.length > 0;
                  return isParent ? (
                    <div className="pl-4" key={item.name}>
                      <SidebarSection
                        templateParts={item.children}
                        currentPageTitle={currentPageTitle}
                        title={item.name}
                        isSubSection
                      />
                    </div>
                  ) : (
                    <Link
                      data-name={item.name}
                      id={
                        isSubSection
                          ? `${title.replace(' ', '')}-link-${item.name}`
                          : `link-${item.name}`
                      }
                      key={item.name}
                      to={`/${item.path}`}
                    >
                      <span
                        className={classnames(
                          'text-[14px] flex items-center gap-2 w-full pl-4 h-8 rounded-md relative transition ease-in-out duration-200',
                          {
                            'font-medium': isCurrentPage,
                            'hover:text-dark-bg-text': currentPageTitle !== item.name,
                            'text-cyan-11': isCurrentPage
                          }
                        )}
                      >
                        {isCurrentPage && (
                          <span className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-[#78b0a04d] animate-nav-fade-in">
                            <div className="bg-[#61efce] w-px absolute top-1 left-2.5 h-6 transition-all ease-in-out" />
                          </span>
                        )}
                        <FileName />
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
            </div>
          </div>
        </Collapsible.Content>
      )}
    </Collapsible.Root>
  );
};

export const Sidebar = React.forwardRef<SidebarElement, Readonly<SidebarProps>>(
  ({ className, templateParts, title, ...props }, forwardedRef) => (
    <aside ref={forwardedRef} className={className} {...props}>
      <nav className="h-full p-6 w-screen md:w-full md:min-w-[275px] md:max-w-[275px] flex flex-col gap-4 border-r border-dark-bg-border">
        <Logo />
        <SidebarSection
          templateParts={templateParts}
          currentPageTitle={title}
          title="Email Templates"
        />
      </nav>
    </aside>
  )
);

Sidebar.displayName = 'Sidebar';
