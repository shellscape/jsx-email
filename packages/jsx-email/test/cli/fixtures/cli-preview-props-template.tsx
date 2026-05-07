import { Body, Html } from '../../../src/index.js';

export const previewProps = { source: 'preview', test: 'batman' } as const;

interface TemplateProps {
  source?: string;
  test?: string;
}

export const Template = (props: TemplateProps) => {
  (globalThis as any).__jsxEmailCliPreviewProps = props;

  return (
    <Html>
      <Body>{props.test}</Body>
    </Html>
  );
};

export const templateName = 'cli-preview-props';
