import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Button } from '../../components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/Popover';
import { ToggleGroup } from '../../components/ui/toggle-group';
import { useAppStore } from '../../composables/useAppStore';
import { useScroll } from '../../composables/useScroll';
import { Views } from '../../lib/types';

import { CodePreview } from './code-preview';
import { RenderPreview, tableWidthPolicyValues, type TableWidthPolicy } from './render-preview';

const brokenImageFallbackModeValues = ['off', 'on'] as const;
type BrokenImageFallbackMode = (typeof brokenImageFallbackModeValues)[number];

const defaultTableWidthPolicy: TableWidthPolicy = 'root-only';
const defaultBrokenImageFallbackMode: BrokenImageFallbackMode = 'on';

const isView = (value: string | null): value is Views => {
  return Object.values(Views).includes(value as Views);
};

const isTableWidthPolicy = (value: string | null): value is TableWidthPolicy => {
  return tableWidthPolicyValues.includes(value as TableWidthPolicy);
};

const isBrokenImageFallbackMode = (value: string | null): value is BrokenImageFallbackMode => {
  return brokenImageFallbackModeValues.includes(value as BrokenImageFallbackMode);
};

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

  const viewParam = searchParams.get('view');
  const currentView = isView(viewParam) ? viewParam : Views.Desktop;

  const tableWidthPolicyParam = searchParams.get('tableWidthPolicy');
  const tableWidthPolicy = isTableWidthPolicy(tableWidthPolicyParam)
    ? tableWidthPolicyParam
    : defaultTableWidthPolicy;

  const brokenImageFallbackModeParam = searchParams.get('brokenAvatarFallbackMode');
  const brokenImageFallbackMode = isBrokenImageFallbackMode(brokenImageFallbackModeParam)
    ? brokenImageFallbackModeParam
    : defaultBrokenImageFallbackMode;

  useEffect(() => {
    const nextSearchParams = new URLSearchParams(searchParams);
    let shouldUpdate = false;

    if (!isView(viewParam)) {
      nextSearchParams.set('view', Views.Desktop);
      shouldUpdate = true;
    }

    if (!isTableWidthPolicy(tableWidthPolicyParam)) {
      nextSearchParams.set('tableWidthPolicy', defaultTableWidthPolicy);
      shouldUpdate = true;
    }

    if (!isBrokenImageFallbackMode(brokenImageFallbackModeParam)) {
      nextSearchParams.set('brokenAvatarFallbackMode', defaultBrokenImageFallbackMode);
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      setSearchParams(nextSearchParams);
    }
  }, [urlKey]);

  function setPreviewSearchParam(name: string, value: string) {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(name, value);
    setSearchParams(nextSearchParams);
  }

  function changeView(value: string) {
    if (isView(value)) {
      setPreviewSearchParam('view', value);
    }
  }

  function changeTableWidthPolicy(value: string) {
    if (isTableWidthPolicy(value)) {
      setPreviewSearchParam('tableWidthPolicy', value);
    }
  }

  function changeBrokenImageFallbackMode(value: string) {
    if (isBrokenImageFallbackMode(value)) {
      setPreviewSearchParam('brokenAvatarFallbackMode', value);
    }
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
          <ToggleGroup.Root type="single" value={currentView} onValueChange={changeView}>
            {Object.entries(Views).map(([key, value], index) => (
              <ToggleGroup.Item key={index} value={value}>
                {key}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs text-neutral-500">Table Width</span>
            <ToggleGroup.Root
              type="single"
              value={tableWidthPolicy}
              onValueChange={changeTableWidthPolicy}
            >
              <ToggleGroup.Item value="root-only">Root</ToggleGroup.Item>
              <ToggleGroup.Item value="all">All</ToggleGroup.Item>
              <ToggleGroup.Item value="none">None</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-xs text-neutral-500">Broken Avatar Fallback</span>
            <ToggleGroup.Root
              type="single"
              value={brokenImageFallbackMode}
              onValueChange={changeBrokenImageFallbackMode}
            >
              <ToggleGroup.Item value="off">Off</ToggleGroup.Item>
              <ToggleGroup.Item value="on">On</ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>
      </div>
      {/* body */}
      <div className="h-full w-full grid overflow-auto relative">
        {(Views.Desktop === currentView || Views.Device === currentView) && (
          <RenderPreview
            emulateBrokenImageFallback={brokenImageFallbackMode === 'on'}
            mode={currentView}
            tableWidthPolicy={tableWidthPolicy}
            template={currentTemplate}
          />
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
