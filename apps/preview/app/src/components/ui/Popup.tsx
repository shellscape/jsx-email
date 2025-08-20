import * as RadixDialog from '@radix-ui/react-dialog';

const Root = ({ children, ...props }: RadixDialog.DialogProps) => (
  <RadixDialog.Root {...props}>{children}</RadixDialog.Root>
);

const Trigger = ({ children, ...props }: RadixDialog.DialogTriggerProps) => (
  <RadixDialog.Trigger {...props}>{children}</RadixDialog.Trigger>
);

const Body = ({ children }) => (
  <div className="px-4 w-full pointer-events-none flex items-center justify-center">
    <div className="inline-block bg-white dark:bg-black w-full max-w-screen-md rounded-xl relative pointer-events-auto">
      {children}
    </div>
  </div>
);

const Modal = ({ children, ...props }: RadixDialog.DialogPortalProps) => (
  <RadixDialog.Portal {...props}>
    <RadixDialog.Content
      {...props}
      className="flex items-center justify-center h-screen inset-x-0 top-0"
    >
      <RadixDialog.Close className="focus:border-none focus:outline-none cursor-auto">
        <div className="inline-block absolute inset-0 bg-neutral-400/80" />
      </RadixDialog.Close>
      <Body>{children}</Body>
    </RadixDialog.Content>
  </RadixDialog.Portal>
);

const Close = ({ children, ...props }: RadixDialog.DialogCloseProps) => (
  <RadixDialog.Close {...props}>{children}</RadixDialog.Close>
);

const { Title } = RadixDialog;
const { Description } = RadixDialog;

export const Popup = {
  Body,
  Close,
  Description,
  Modal,
  Root,
  Title,
  Trigger
};
