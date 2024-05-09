import { Suspense } from 'react';
// @ts-ignore
import { type BuiltinLanguage } from 'shiki';

import { debug } from '../debug.js';
import { useData } from '../renderer/suspense.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

type RootProps = BaseProps<'pre'>;

export interface CodeProps extends RootProps {
  children: string;
  language: BuiltinLanguage;
  theme?: string;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/code' } : {};

const Renderer = (props: React.PropsWithChildren<CodeProps>) => {
  const { children, language, style, theme = 'nord', ...rest } = props;
  const code = children as string;
  const highlight = async () => {
    // Note: When building CJS with thsy, tsc thinks that this isn't already dynamic
    // @ts-ignore
    const { codeToHtml } = await import('shiki');
    const html = await codeToHtml(code, { lang: language, theme });
    return html;
  };
  const html = useData(props, highlight);

  return <div {...rest} {...debugProps} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const Code: JsxEmailComponent<CodeProps> = ({ children, ...props }) => {
  if (typeof children !== 'string')
    throw new Error('Code: component children must be of type string');

  return (
    <>
      <Suspense fallback={<div>waiting</div>}>
        <Renderer {...props}>{children}</Renderer>
      </Suspense>
    </>
  );
};

Code.displayName = 'Code';
