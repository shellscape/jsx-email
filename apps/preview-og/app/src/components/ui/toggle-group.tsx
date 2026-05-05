import * as RadixToggleGroup from '@radix-ui/react-toggle-group';

// import classNames from "classnames";

const Root = ({ children, ...props }: RadixToggleGroup.ToggleGroupSingleProps | undefined) => (
  <RadixToggleGroup.Root
    {...props}
    className="flex items-center gap-2 p-1 rounded-sm border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black border-2"
  >
    {children}
  </RadixToggleGroup.Root>
);

const Item = ({ children, ...props }: RadixToggleGroup.ToggleGroupItemProps | undefined) => (
  <RadixToggleGroup.Item
    {...props}
    className="cursor-pointer p-2 rounded-sm text-sm font-medium data-[state=on]:bg-black data-[state=on]:dark:bg-white data-[state=on]:text-white data-[state=on]:dark:text-black px-4 data-[state=off]:hover:bg-accent"
  >
    {children}
  </RadixToggleGroup.Item>
);

export const ToggleGroup = {
  Item,
  Root
};
