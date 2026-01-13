import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Button } from '../../components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover';
import { ToggleGroup } from '../../components/ui/ToggleGroup';
import { useAppStore } from '../../composables/useAppStore';
import { useScroll } from '../../composables/useScroll';
import { Views } from '../../lib/types';

import { CodePreview } from './CodePreview';
import { RenderPreview } from './RenderPreview';

export const Preview = observer(() => {
  const appStore = useAppStore();

  const { pathname: basePathName, key: urlKey } = useLocation();
  const { ref: mobilePreviewOptionsRef, scroll: mobilePreviewOptionsScroll } = useScroll();

  const pathname = decodeURIComponent(
    basePathName.startsWith('/') ? basePathName.slice(1) : basePathName
  );

  const id = `emails/${pathname.split('/').slice(1).join('/')}`;

  const currentTemplate = appStore.templates.records[id];

  const [searchParams, setSearchParams] = useSearchParams();

  const currentView = searchParams.get('view') as Views;

  useEffect(() => {
    if (!searchParams.get('view')) {
      const next = new URLSearchParams(searchParams);
      next.set('view', Views.Desktop);
      setSearchParams(next);
    }
  }, [urlKey]);

  function changeView(view: Views) {
    const next = new URLSearchParams(searchParams);
    next.set('view', view);
    setSearchParams(next);
  }

  return (
    <div className="w-full h-full flex flex-col contain-strict">
      {/* header */}
      <div className="w-full flex items-center flex-wrap gap-x-8 gap-y-2 sticky top-0 justify-between py-4 bg-white dark:bg-black border-b-2 border-b-neutral-200 dark:border-b-neutral-800 border-b-solid">
        <div className="px-7">
          <span className="text-sm text-neutral-500 line-clamp-1">/{currentTemplate.path}</span>
          <h1 className="text-2xl font-bold">{currentTemplate.templateName}</h1>
        </div>
        <div
          ref={mobilePreviewOptionsRef}
          className={clsx(
            'flex items-center gap-3 overflow-x-auto px-7 w-full scrollbar-none fade-to-20',
            mobilePreviewOptionsScroll.edges.horizontal !== 'left' && 'fade-l-12',
            mobilePreviewOptionsScroll.edges.horizontal !== 'right' && 'fade-r-12'
          )}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="size-12">
                <Icon icon="bi:question" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={-6} className="text-sm">
              The Desktop and Mobile views are <em>an approximation</em> of what your email template
              will looke like on various devices. It should not be considered a source of truth, but
              rather a guide for styling and layout. Always send a test email to your target email
              clients for Quality Control, before sending emails in production.
            </PopoverContent>
          </Popover>
          <ToggleGroup.Root type="single" value={searchParams.get('view')}>
            {Object.entries(Views).map(([key, value], index) => (
              <ToggleGroup.Item key={index} value={value} onClick={() => changeView(value)}>
                {key}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>
      </div>
      {/* body */}
      <div className="h-full w-full grid overflow-auto relative">
        {(Views.Desktop === currentView || Views.Device === currentView) && (
          <RenderPreview mode={currentView} template={currentTemplate} />
        )}
        {(Views.Jsx === currentView ||
          Views.Html === currentView ||
          Views.Plain === currentView) && (
          <CodePreview mode={currentView} template={currentTemplate} />
        )}
      </div>
    </div>
  );
});
