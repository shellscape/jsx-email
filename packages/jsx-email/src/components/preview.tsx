import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'div'>;

export interface PreviewProps extends RootProps {
  children: string | string[];
}

const PREVIEW_MAX_LENGTH = 150;

export const renderWhiteSpace = (text: string) => {
  if (text.length >= PREVIEW_MAX_LENGTH) {
    return null;
  }
  const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';
  return <div>{whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length)}</div>;
};

export const Preview = ({
  children = '',
  ...props
}: React.PropsWithChildren<Readonly<PreviewProps>>) => {
  let text = Array.isArray(children) ? children.join('') : children;
  text = text.substr(0, PREVIEW_MAX_LENGTH);
  return (
    <div
      data-id="@jsx-email/preview"
      style={{
        display: 'none',
        lineHeight: '1px',
        maxHeight: 0,
        maxWidth: 0,
        opacity: 0,
        overflow: 'hidden'
      }}
      {...props}
    >
      {text}
      {renderWhiteSpace(text)}
    </div>
  );
};

Preview.displayName = 'Preview';
