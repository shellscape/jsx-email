import * as RadixToggleGroup from '@radix-ui/react-toggle-group';

// import classNames from "classnames";

const Root = ({ children, ...props }: RadixToggleGroup.ToggleGroupSingleProps | undefined) => (
  <RadixToggleGroup.Root
    {...props}
    className="flex items-center gap-2 p-2 rounded-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black border-2"
  >
    {children}
  </RadixToggleGroup.Root>
);

const Item = ({ children, ...props }: RadixToggleGroup.ToggleGroupItemProps | undefined) => (
  <RadixToggleGroup.Item
    {...props}
    className="p-2 rounded-full text-sm font-medium data-[state=on]:bg-black data-[state=on]:dark:bg-white data-[state=on]:text-white data-[state=on]:dark:text-black data-[state=on]:px-4 data-[state=off]:hover:underline"
  >
    {children}
  </RadixToggleGroup.Item>
);

export const ToggleGroup = {
  Item,
  Root
};
