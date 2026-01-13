import { observer } from 'mobx-react';

import { PopupFooter } from '../components/popup-footer';
import { Popup } from '../components/ui/popup';
import { Separator } from '../components/ui/separator';
import { useAppStore } from '../composables/useAppStore';

export const IndexView = observer(() => {
  const appStore = useAppStore();

  const hasNoRecords = Object.keys(appStore.templates.records).length === 0;

  return (
    <>
      {/* no templates found */}
      <Popup.Root open={hasNoRecords}>
        <Popup.Modal>
          <div className="p-8 sm:p-12">
            <Popup.Title className="font-bold text-2xl mb-4">
              Welcome to the JSX.Email Preview
            </Popup.Title>
            <Popup.Description className="max-w-[54ch]">
              <span className="block mb-7">
                The preview server successfully started, but no templates were found in the target
                directory.
              </span>
              <span className="block mb-7">Start making a new email template by running</span>
              <span className="text-block-inline-code mb-7">
                pnpm email create {'<template-name>'}.
              </span>
              <span className="block mb-7">
                Run <span className="text-block-inline-code">pnpm email help create</span> for a
                list of options.
              </span>
              <span className="block">Happy coding!</span>
            </Popup.Description>
          </div>
          <Separator />
          <PopupFooter />
        </Popup.Modal>
      </Popup.Root>
      {/* templates found but not selected */}
      {!hasNoRecords && (
        <div className="relative w-full h-full flex items-center justify-center">
          <Popup.Body>
            <div className="p-8 sm:p-12">
              <h2 className="font-bold text-2xl mb-4">Select a Template</h2>
              <p className="max-w-[54ch]">
                <span className="block mb-7">
                  Choose the template you'd like to preview from the left menu.
                </span>
                <span className="block mb-7">
                  Run <span className="text-block-inline-code">pnpm email help create</span> for a
                  list of options.
                </span>
                <span className="block">Happy coding!</span>
              </p>
            </div>
            <Separator />
            <PopupFooter />
          </Popup.Body>
        </div>
      )}
    </>
  );
});
