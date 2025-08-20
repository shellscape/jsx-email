import { Icon } from '@iconify/react';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixSelect from '@radix-ui/react-select';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Separator } from '../../components/ui/Separator';
import { plunkApiBearerTokenProvidedOnlyForJsxEmailUiDoNotUseElsewhere } from '../../lib/consts';
import devices from '../../lib/devices.json';
import { Views } from '../../lib/types';

import { FlaotingToolbarPositioningController } from './FloatingToolbarPositioningController';
import type { BaseRendererProps } from './types';

const PlunkLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="1080" height="1080" fill="none" />
    <path
      d="M976 284.628C976 348.237 959.54 406.608 926.62 459.74C893.701 512.873 845.817 556.276 782.97 589.952C720.124 623.627 645.306 643.458 558.517 649.445L510.26 919.971C491.556 1023.99 440.68 1076 357.632 1076C311.993 1076 269.721 1062.53 230.816 1035.59C192.659 1008.65 161.984 967.49 138.79 912.113C115.597 856.736 104 788.637 104 707.816C104 555.902 128.316 427.187 176.947 321.671C226.327 215.407 292.166 136.082 374.466 83.6984C457.514 30.5661 548.791 4 648.299 4C718.627 4 778.107 16.3476 826.739 41.0429C876.118 65.7382 913.153 99.4136 937.843 142.069C963.281 183.976 976 231.496 976 284.628ZM578.718 533.826C732.094 514.369 808.783 434.671 808.783 294.731C808.783 245.34 792.323 205.304 759.403 174.622C727.231 143.192 677.103 127.476 609.019 127.476C531.957 127.476 464.621 151.798 407.012 200.44C350.15 249.082 306.008 316.807 274.584 403.615C243.909 489.674 228.571 588.081 228.571 698.836C228.571 745.233 233.06 786.392 242.039 822.312C251.765 858.232 263.736 886.295 277.951 906.501C292.915 925.957 307.13 935.686 320.597 935.686C339.302 935.686 353.517 909.868 363.243 858.232L400.278 646.078C371.099 641.587 358.38 639.717 362.121 640.465C339.676 636.723 325.086 629.988 318.353 620.26C311.619 609.783 308.252 596.687 308.252 580.972C308.252 564.508 312.741 551.412 321.719 541.684C331.446 531.955 344.539 527.091 360.999 527.091C368.481 527.091 374.092 527.465 377.833 528.214C395.789 531.207 409.63 533.078 419.357 533.826C429.083 475.455 442.924 397.254 460.88 299.221C465.369 273.777 475.47 255.817 491.182 245.34C507.641 234.115 526.72 228.503 548.417 228.503C573.107 228.503 590.689 233.367 601.163 243.095C612.386 252.075 617.997 266.668 617.997 286.873C617.997 298.847 617.249 308.575 615.753 316.059L578.718 533.826Z"
      fill="currentColor"
    />
    <path
      d="M304.835 467.541L426.099 489.952L411.851 580.937L391.091 699.816L266.088 676.643L304.835 467.541Z"
      className="fill-dark-bg"
    />
  </svg>
);

const SelectItem = ({ className, children, ...props }: RadixSelect.SelectItemProps) => (
  <RadixSelect.Item
    className={clsx(
      'relative flex items-center px-4 py-2 rounded-md text-xs text-light-bg-text',
      'outline-none select-none data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-neutral-900'
    )}
    {...props}
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    <RadixSelect.ItemIndicator className="absolute left-0 inline-flex items-center">
      <Icon icon="mdi:check" />
    </RadixSelect.ItemIndicator>
  </RadixSelect.Item>
);

interface HtmlRendererPreviewProps extends BaseRendererProps {
  mode: Views.Desktop | Views.Device;
}

interface IframeStyle {
  height?: `${number}px`;
  width?: `${number}px`;
}

export const RenderPreview = ({ mode, template }: HtmlRendererPreviewProps) => {
  const styleAddons = /* html */ `
    <style>
      table { overflow-wrap: anywhere; width: 100% !important; }
    </style>
  `;

  const defaultDevice = devices.phones[3];

  const iframeElRef = useRef<HTMLIFrameElement>();

  // const [activeDevice, setActiveDevice] = useState(() => devices.phones[0].name)
  const [iframeStyle, setIframeStyle] = useState<IframeStyle>(
    () =>
      ({
        height: `${defaultDevice.height}px`,
        width: `${defaultDevice.width}px`
      }) as IframeStyle
  );

  function setIFrameViewSize(size: string) {
    const [width, height] = size.split(',');
    setIframeStyle({
      height,
      width
    } as IframeStyle);
  }

  function stringifyDevice({
    height,
    width,
    name
  }: {
    height: string;
    name: string;
    width: string;
  }) {
    return `${width}px,${height}px,${name}`;
  }

  return (
    <div
      className={clsx(
        mode === Views.Desktop && 'h-full flex flex-col',
        mode === Views.Device && 'h-max flex flex-col'
      )}
    >
      {/* menu */}
      {mode === Views.Device && (
        <div className="w-full h-12 bg-white dark:bg-black flex items-center shrink-0">
          <RadixSelect.Root
            defaultValue={stringifyDevice(defaultDevice)}
            onValueChange={setIFrameViewSize}
          >
            <RadixSelect.Trigger
              className={clsx(
                'mx-auto flex select-none items-center justify-center rounded-md px-4 py-2 text-xs font-medium',
                'bg-white dark:bg-black m-auto border-2 border-neutral-200 dark:border-neutral-800',
                'hover:bg-neutral-100 dark:hover:bg-neutral-900'
              )}
            >
              <RadixSelect.Value />
              <RadixSelect.Icon className="ml-2">
                <Icon icon="mdi:chevron-down" />
              </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
              <RadixSelect.Content className="bg-white dark:bg-black border-2 border-neutral-200 dark:border-neutral-800 text-light-bg-text p-2 rounded-md shadow-lg">
                <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white dark:bg-black text-light-bg-text">
                  <Icon icon="mdi:chevron-up" />
                </RadixSelect.ScrollUpButton>
                <RadixSelect.Viewport>
                  {devices.phones.map((device, index) => (
                    <SelectItem key={device.name + index} value={stringifyDevice(device)}>
                      {device.name}{' '}
                      <span className="text-neutral-500 text-xs ml-1">
                        ({device.width}x{device.height})
                      </span>
                    </SelectItem>
                  ))}
                  <div className="px-2 w-full">
                    <Separator className="my-4 opacity-30" />
                  </div>
                  {devices.tablets.map((device, index) => (
                    <SelectItem key={device.name + index} value={stringifyDevice(device)}>
                      {device.name}{' '}
                      <span className="text-neutral-500 text-xs ml-1">
                        ({device.width}x{device.height})
                      </span>
                    </SelectItem>
                  ))}
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-light-bg text-light-bg-text">
                  <Icon icon="mdi:chevron-down" />
                </RadixSelect.ScrollDownButton>
              </RadixSelect.Content>
            </RadixSelect.Portal>
          </RadixSelect.Root>
        </div>
      )}
      {/* renderer */}
      <div className="w-full h-full relative">
        <FlaotingToolbarPositioningController>
          <SendPreviewEmail html={template.html} />
        </FlaotingToolbarPositioningController>
        <iframe
          ref={iframeElRef}
          srcDoc={template.html + styleAddons}
          className={clsx('w-full h-full', mode === Views.Device && 'mt-6 mb-24 mx-auto')}
          style={mode === Views.Device ? iframeStyle : {}}
        />
      </div>
    </div>
  );

  function SendPreviewEmail({ html }: { html: string }) {
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sendState, setSendState] = useState<'idle' | 'sending' | 'error' | 'sent'>('idle');
    const [sendError, setSendError] = useState<string>(null);

    async function handleSend(e: React.FormEvent) {
      try {
        e.preventDefault();
        setSendState('sending');
        setSendError(null);

        const response = await fetch('https://api.useplunk.com/v1/send', {
          body: JSON.stringify({
            body: html,
            subject: 'Test jsx-email template',
            to: email
          }),
          headers: {
            Authorization: `Bearer ${plunkApiBearerTokenProvidedOnlyForJsxEmailUiDoNotUseElsewhere}`,
            'Content-Type': 'application/json'
          },
          method: 'POST'
        });

        if (response.status !== 200) {
          const error = await response.text();
          setSendError(error);
          return;
        }
      } catch (error: unknown) {
        setSendError('Something went wrong. Please try again.');
      } finally {
        setSendState('error');
      }

      setSendState('sent');

      setTimeout(() => {
        setIsModalOpen(false);
        setSendState('idle');
      }, 3000);
    }

    return (
      <RadixPopover.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <RadixPopover.Trigger asChild>
          <Button size="icon" className="pointer-events-auto animate-[bounce_1s_ease-out_3]">
            <Icon icon={isModalOpen ? 'material-symbols:close' : 'material-symbols:send'} />
          </Button>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            align="end"
            className="w-60 sm:w-80 bg-white dark:bg-black border-2 border-neutral-200 dark:border-neutral-800 rounded-md mt-2 p-4"
          >
            <form onSubmit={handleSend}>
              <label className="text-sm font-bold inline-block mb-2" htmlFor="email">
                RECIPIENT
              </label>
              <Input
                id="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mb-3"
              />
              <div className="w-full flex justify-between items-center">
                <div className="text-sm">
                  Powered by&nbsp;
                  <a className="hover:underline" href="https://useplunk.com" target="_blank">
                    Plunk <PlunkLogo className="h-5 w-5 ml-1 inline-block" />
                  </a>
                </div>
                <Button
                  size="sm"
                  type="submit"
                  disabled={!email.length || sendState === 'error'}
                  className={clsx(
                    (sendState === 'sending' || sendState === 'sent') && 'pointer-events-none'
                  )}
                >
                  {sendState === 'idle' && 'Send'}
                  {sendState === 'sending' && (
                    <Icon icon="mingcute:loading-3-fill" className="animate-spin" />
                  )}
                  {sendState === 'sent' && (
                    <>
                      <Icon icon="mdi:email-check" /> Sent!
                    </>
                  )}
                  {sendState === 'error' && 'Error'}
                </Button>
              </div>
              {sendError && <p className="text-sm mt-4">Error while sending email: {sendError}</p>}
            </form>
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    );
  }
};
