'use client';

import * as SlotPrimitive from '@radix-ui/react-slot';
import React from 'react';

import { Shell } from './components/shell';

export const Home = ({ templateParts }: { templateParts: any }) => {
  React.useEffect(() => {
    document.title = 'JSX email';
  }, []);

  return (
    <Shell templateParts={templateParts}>
      <div
        id="landing"
        className="bg-dark-bg max-w-md border border-dark-bg-border m-auto mt-56 rounded-md p-8"
      >
        <h2 className="font-medium">JSX Email Preview</h2>
        <SlotPrimitive.Slot className="mt-2 mb-4 text-sm">
          <SlotPrimitive.Slottable>
            <p>
              Start creating an email template by running{' '}
              <code className="inline-code">email create &lt;template-name&gt;</code>
              <br />
              <br />
              Run <code className="inline-code">email help create</code> for a list of options
              <br />
              <br />
              Happy coding!
            </p>
          </SlotPrimitive.Slottable>
        </SlotPrimitive.Slot>

        <SlotPrimitive.Slot className="mt-4 inline-block focus:ring-2 focus:ring-white/20 focus:outline-none focus:bg-white/90 text-base py-2 px-4 rounded gap-2 bg-cta-bg text-cta-text hover:bg-cta-bg-hover">
          <SlotPrimitive.Slottable>
            <a href="https://jsx.email/docs/introduction">Read our Documentation</a>
          </SlotPrimitive.Slottable>
        </SlotPrimitive.Slot>
      </div>
    </Shell>
  );
};
