import * as Popover from '@radix-ui/react-popover';
import * as React from 'react';

import { IconButton, IconPaperAirplane } from './icons';

const PlunkLogo: React.FC<React.ComponentPropsWithoutRef<'svg'>> = (props) => (
  <svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="1080" height="1080" fill="none" />
    <path
      d="M976 284.628C976 348.237 959.54 406.608 926.62 459.74C893.701 512.873 845.817 556.276 782.97 589.952C720.124 623.627 645.306 643.458 558.517 649.445L510.26 919.971C491.556 1023.99 440.68 1076 357.632 1076C311.993 1076 269.721 1062.53 230.816 1035.59C192.659 1008.65 161.984 967.49 138.79 912.113C115.597 856.736 104 788.637 104 707.816C104 555.902 128.316 427.187 176.947 321.671C226.327 215.407 292.166 136.082 374.466 83.6984C457.514 30.5661 548.791 4 648.299 4C718.627 4 778.107 16.3476 826.739 41.0429C876.118 65.7382 913.153 99.4136 937.843 142.069C963.281 183.976 976 231.496 976 284.628ZM578.718 533.826C732.094 514.369 808.783 434.671 808.783 294.731C808.783 245.34 792.323 205.304 759.403 174.622C727.231 143.192 677.103 127.476 609.019 127.476C531.957 127.476 464.621 151.798 407.012 200.44C350.15 249.082 306.008 316.807 274.584 403.615C243.909 489.674 228.571 588.081 228.571 698.836C228.571 745.233 233.06 786.392 242.039 822.312C251.765 858.232 263.736 886.295 277.951 906.501C292.915 925.957 307.13 935.686 320.597 935.686C339.302 935.686 353.517 909.868 363.243 858.232L400.278 646.078C371.099 641.587 358.38 639.717 362.121 640.465C339.676 636.723 325.086 629.988 318.353 620.26C311.619 609.783 308.252 596.687 308.252 580.972C308.252 564.508 312.741 551.412 321.719 541.684C331.446 531.955 344.539 527.091 360.999 527.091C368.481 527.091 374.092 527.465 377.833 528.214C395.789 531.207 409.63 533.078 419.357 533.826C429.083 475.455 442.924 397.254 460.88 299.221C465.369 273.777 475.47 255.817 491.182 245.34C507.641 234.115 526.72 228.503 548.417 228.503C573.107 228.503 590.689 233.367 601.163 243.095C612.386 252.075 617.997 266.668 617.997 286.873C617.997 298.847 617.249 308.575 615.753 316.059L578.718 533.826Z"
      fill="currentColor"
    />
    <path
      d="M304.835 467.541L426.099 489.952L411.851 580.937L391.091 699.816L266.088 676.643L304.835 467.541Z"
      fill="none"
    />
  </svg>
);

export interface SendProps {
  markup: string;
}

export const Send: React.FC<SendProps> = ({ markup }) => {
  const [to, setTo] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const onFormSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSending(true);
      setSubmitError(null);

      const response = await fetch('https://api.useplunk.com/v1/send', {
        body: JSON.stringify({
          body: markup,
          subject: 'Test jsx-email template',
          to
        }),
        headers: {
          Authorization: 'Bearer sk_dbed12137c418c4b2d278d84a634394b2209931a4a239b6f',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      if (response.status !== 200) {
        const error = await response.text();
        setSubmitError(error);
      }
    } catch (error: unknown) {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Popover.Root>
      <Popover.Anchor className="rounded bg-darker-bg absolute top-[20px] right-[20px] w-7 h-7 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_2]" />
      <Popover.Trigger asChild>
        <IconButton
          className="bg-darker-bg p-1 rounded focus:text-dark-bg-text ease-in-out transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-8 hover:text-dark-bg-text absolute top-[20px] right-[20px] hidden md:block"
          title="Send preview email"
        >
          <IconPaperAirplane />
        </IconButton>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={25}
          align="end"
          className="w-80 -mt-10 p-3 bg-dark-bg border border-dark-bg-border text-dark-bg-text rounded-lg"
        >
          <Popover.Close
            aria-label="Close"
            className="absolute right-2 flex items-start justify-center w-6 h-6 text-xs transition duration-300 ease-in-out rounded-full"
          >
            ✕
          </Popover.Close>
          <form onSubmit={onFormSubmit}>
            <label htmlFor="to" className="text-xs uppercase mb-2 block">
              Recipient
            </label>
            <input
              autoFocus={true}
              className="appearance-none rounded-lg px-2 py-1 mb-3 outline-none w-full bg-slate-3 border placeholder-slate-10 border-slate-6 text-slate-12 text-sm focus:ring-1 focus:ring-slate-12 transition duration-300 ease-in-out"
              onChange={(e) => setTo(e.target.value)}
              defaultValue={to}
              placeholder="you@example.com"
              type="email"
              id="to"
              required
            />

            <p className="inline-block mb-3 text-error-text">{submitError}</p>
            <div className="flex items-center justify-between">
              <p className="inline-block text-xs">
                Powered by{' '}
                <a
                  className="hover:text-slate-12 transition ease-in-out duration-300"
                  href="https://www.useplunk.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Plunk
                  <PlunkLogo height={20} width={20} className="ml-1 inline" />
                </a>
              </p>
              <button
                type="submit"
                disabled={to.length === 0 || isSending}
                className="disabled:bg-slate-11 disabled:border-transparent outline-none text-sm font-medium px-3 py-1 transition ease-in-out duration-200 relative bg-cta-bg text-cta-text rounded-md"
              >
                Send
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
