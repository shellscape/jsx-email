interface PreviewProps {}

export const Preview: React.FC<Readonly<PreviewProps>> = () => (
  <>
    <div data-skip="true">This should be hidden from plain text</div>
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--[if mso]><i style="mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
      }}
    />
    <h1>This should be rendered in plain text</h1>
    <head>
      <style dangerouslySetInnerHTML={{ __html: 'body { color: white; }' }}></style>
    </head>
  </>
);

// eslint-disable-next-line import/no-default-export
export default Preview;
