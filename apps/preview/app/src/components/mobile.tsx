import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import classnames from 'classnames';
import * as React from 'react';

import devices from '../devices.json';

interface MobileProps extends React.ComponentPropsWithoutRef<'header'> {
  setViewSize: (size: string) => void;
}

const Group = (key: keyof typeof devices) => {
  const item = classnames(
    'relative flex items-center px-4 py-2 rounded-md text-xs text-light-bg-text',
    '!outline-none !select-none data-[highlighted]:bg-select-item-hover'
  );
  const items = devices[key].map((device) => (
    <Select.Item className={item} value={`${device.width},${device.height}`} key={device.name}>
      <Select.ItemText>{device.name}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex items-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  ));

  return <Select.Group>{items}</Select.Group>;
};

const button = 'flex items-center justify-center';
const chevron = `${button} h-[25px] bg-light-bg text-light-bg-text`;
const list = 'bg-light-bg text-light-bg-text p-2 rounded-md shadow-md';
const trigger = classnames(
  'inline-flex select-none items-center justify-center rounded-md px-4 py-2 text-xs font-medium',
  'bg-light-bg text-light-bg-text !outline-none m-auto',
  'hover:bg-select-item-hover'
);

export const Mobile = React.forwardRef<React.ElementRef<'header'>, Readonly<MobileProps>>(
  ({ className, title, setViewSize, ...props }, forwardedRef) => (
    <header
      ref={forwardedRef}
      className={classnames(
        'bg-dark-bg flex relative items-center px-6 justify-between h-[70px] border-b border-dark-bg-border',
        className
      )}
      {...props}
    >
      <Select.Root defaultValue="430,932" onValueChange={setViewSize}>
        <Select.Trigger className={trigger}>
          <Select.Value />
          <Select.Icon className="ml-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={list}>
            <Select.ScrollUpButton className={chevron}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {Group('phones')}
              <Select.Separator className="bg-light-bg-text h-px m-3 opacity-20" />
              {Group('tablets')}
            </Select.Viewport>
            <Select.ScrollDownButton className={chevron}>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </header>
  )
);

Mobile.displayName = 'Mobile';
