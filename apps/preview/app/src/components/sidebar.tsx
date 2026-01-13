import { Icon } from '@iconify/react';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useAppStore } from '../composables/useAppStore';
import type { TemplatePart } from '../lib/types';

import { Logo } from './Logo.js';
import { Separator } from './ui/separator.js';

interface DirectoryTreeProps {
  isSubSection?: boolean;
  templateParts: TemplatePart[];
  title: string;
}

const version = '2.5.4';

export const DirectoryTree = observer(
  ({ templateParts, isSubSection, title = 'Email Templates' }: DirectoryTreeProps) => {
    const { pathname: basePathName, search } = useLocation();
    const pathname = decodeURIComponent(
      basePathName.startsWith('/') ? basePathName.slice(1) : basePathName
    );

    const [isOpen, setIsOpen] = useState(
      !isSubSection || pathname.indexOf(title.toLowerCase()) > -1
    );

    const appStore = useAppStore();

    return (
      <Collapsible.Root
        className=""
        id={isSubSection ? `${title.replace(' ', '')}-sidebar-tree` : 'sidebar-tree'}
        onOpenChange={setIsOpen}
        defaultOpen={isOpen}
      >
        <Collapsible.Trigger
          className={clsx('flex w-full hover:underline items-center gap-2 py-1', {
            'cursor-default': templateParts && templateParts.length === 0,
            'pb-1': !isSubSection
          })}
        >
          <Icon
            icon={
              isOpen ? 'material-symbols:folder-open-outline' : 'material-symbols:folder-outline'
            }
            className="h-6 w-6"
          />
          <div className="flex items-center transition ease-in-out duration-200">
            <h3 className="transition ease-in-out duration-200 font-semibold">{title}</h3>
          </div>
        </Collapsible.Trigger>

        {templateParts && templateParts.length > 0 && (
          <Collapsible.Content className="relative collapsible-content">
            <div className="absolute left-2.5 w-[2px] h-full bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col truncate mb-2">
              <div id={isSubSection ? `${title.replace(' ', '')}-sidebar` : 'sidebar'}>
                {templateParts &&
                  templateParts.map((item) => {
                    const isCurrentPage = pathname === `emails/${item.path}`;
                    const isParent = item.children && item.children.length > 0;

                    return isParent ? (
                      <div className="pl-4" key={item.name}>
                        <DirectoryTree
                          templateParts={item.children}
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
                        to={`/emails/${item.path}${search}`}
                        className={clsx({
                          'hover:underline': !isCurrentPage
                        })}
                        onClick={() => appStore.sidebar.setIsOpen(false)}
                      >
                        <span
                          className={clsx(
                            'flex items-center gap-2 w-full pl-4 h-8 rounded-md relative transition ease-in-out duration-200',
                            { 'font-semibold': isCurrentPage }
                          )}
                        >
                          {isCurrentPage && (
                            <span className="absolute inset-y-0 right-0 left-2.5 rounded-r-lg bg-neutral-600/5 dark:bg-neutral-400/5 animate-nav-fade-in">
                              <span className="bg-black dark:bg-white w-[2px] absolute left-0 inset-y-0 inline-block transition-all ease-in-out" />
                            </span>
                          )}
                          <span className="relative flex items-center gap-2">
                            <Icon icon="mdi:file-outline" className="h-6 w-6" />
                            {item.template.templateName}
                          </span>
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
  }
);

const SidebarTemplatesTree = observer(
  (props: Omit<DirectoryTreeProps, 'templateParts' | 'isSubSection'>) => {
    const appStore = useAppStore();

    return <DirectoryTree templateParts={appStore.templates.parts} {...props} />;
  }
);

const ColorSchemePicker = observer(() => {
  const appStore = useAppStore();

  const colorSchemes = [
    {
      icon: 'ic:outline-computer',
      name: 'system'
    },
    {
      icon: 'tabler:sun-filled',
      name: 'light'
    },
    {
      icon: 'tabler:moon-filled',
      name: 'dark'
    }
  ] as const satisfies { icon: string; name: string }[];

  return (
    <RadixToggleGroup.Root
      type="single"
      className="inline-flex items-center gap-1 rounded-full border-2 border-neutral-200 dark:border-neutral-800 p-1"
      value={appStore.colorScheme.preference}
    >
      {colorSchemes.map((colorScheme, index) => (
        <RadixToggleGroup.Item
          key={index}
          value={colorScheme.name}
          className="p-1 rounded-full data-[state=on]:outline hover:text-black dark:hover:text-white outline-2 outline-neutral-200 dark:outline-neutral-800 data-[state=off]:text-neutral-300 dark:data-[state=off]:text-neutral-700"
          onClick={() => appStore.colorScheme.setPreference(colorScheme.name)}
        >
          <Icon icon={colorScheme.icon} className="w-4 h-4" />
        </RadixToggleGroup.Item>
      ))}
    </RadixToggleGroup.Root>
  );
});

export const Sidebar = observer(() => {
  const appStore = useAppStore();

  useEffect(() => {
    function handleResize() {
      appStore.sidebar.setIsOpen(window.innerWidth > appStore.sidebar.breakpoint);
    }

    addEventListener('resize', handleResize);

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={clsx(
        'w-full max-w-[360px] border-r-solid border-r-2 bg-white dark:bg-black border-r-neutral-200 dark:border-r-neutral-800 max-lg:absolute left-0 top-0 z-[10]',
        !appStore.sidebar.isOpen && 'max-lg:hidden'
      )}
    >
      <div className="overflow-y-auto h-[100dvh] flex justify-between flex-col relative">
        <div>
          {/* header */}
          <div className="px-8 pt-8 pb-12 max-lg:mt-12">
            <div className="flex items-center gap-5">
              <Link className="flex items-center gap-2.5 font-bold" to="/">
                <Logo className="h-[38px]" />
                <span>jsx.email</span>
              </Link>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-sm">v{version}</span>
            </div>
          </div>
          {/* body */}
          <div className="px-8 pb-48">
            <SidebarTemplatesTree title="Email Templates" />
          </div>
        </div>
        {/* color scheme */}
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-sm pt-2 px-8 pb-4 w-full flex flex-col items-center justify-center gap-5 sticky bottom-0">
          <ColorSchemePicker />
          <p className="text-center max-w-[22ch] mb-5">
            Looking for inspiration? Check out{' '}
            <a href="https://pro.jsx.email" target="_blank" className="underline">
              pro.jsx.email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});

export const Header = observer(() => {
  const appStore = useAppStore();

  return (
    <div className="w-full py-4 px-4 sticky top-0 border-b-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black lg:hidden z-[20]">
      <div className="flex items-center gap-5">
        <button onClick={() => appStore.sidebar.setIsOpen(!appStore.sidebar.isOpen)}>
          <Icon
            icon={appStore.sidebar.isOpen ? 'material-symbols:close' : 'tabler:menu'}
            className="h-8 w-8"
          />
        </button>
        <Separator orientation="vertical" className="h-8" />
        <Link className="flex items-center gap-2.5 font-bold" to="/">
          <Logo className="h-[30px]" />
          <span>jsx.email</span>
        </Link>
      </div>
    </div>
  );
});
