'use client';

import classnames from 'classnames';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { CodeContainer } from './components/code-container';
import { Mobile } from './components/mobile';
import { Shell } from './components/shell';
import { Views } from './types';
import { Send } from './components/send';

interface PreviewProps {
  html: string;
  jsx: string;
  plainText: string;
  templateParts: any;
  title: string;
}

const validViews = Object.keys(Views).filter((key) => isNaN(+key));

const patchIframe = (frame: HTMLIFrameElement) => {
  const doc = frame.contentDocument || frame.contentWindow.document;
  const styleElement = doc.createElement('style');

  styleElement.innerHTML = `
/* Added by jsx-email for mobile view */
table { overflow-wrap: anywhere; width: 100% !important; }
`;
  doc.head.appendChild(styleElement);
};

export const Preview = ({ html, jsx, plainText, templateParts, title }: PreviewProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = (searchParams.get('view') as Views) || Views.Desktop;
  const [viewSize, setViewSize] = React.useState<null | string>(null);
  const [activeView, setActiveView] = React.useState(view);
  const iframe = classnames('w-full h-[calc(100vh_-_70px)]', {
    'mt-2 mx-auto shadow-md': activeView === Views.Mobile
  });
  let iframeStyle = {};

  React.useEffect(() => {
    document.title = `JSX email • ${title}`;

    if (view && validViews.includes(view)) setActiveView(view);
  }, [searchParams]);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const handleLoad = () => {
      if (activeView === Views.Mobile) patchIframe(iframeRef.current);
    };

    if (iframeRef.current) iframeRef.current.addEventListener('load', handleLoad);

    return () => {
      if (iframeRef.current) iframeRef.current.removeEventListener('load', handleLoad);
    };
  }, [html, activeView]);

  const handleViewChange = (view: Views) => {
    setActiveView(view);
    navigate(`${pathname}?view=${view}`);
  };

  if (activeView === Views.Mobile) {
    const [width, height] = (viewSize || '430,932').split(',');
    iframeStyle = { height: `${height}px`, width: `${width}px` };
  } else {
    iframeStyle = void 0;
  }

  return (
    <Shell
      templateParts={templateParts}
      title={title}
      html={html}
      activeView={activeView}
      setActiveView={handleViewChange}
    >
      {activeView === Views.Mobile && <Mobile setViewSize={setViewSize} />}
      {activeView === Views.Desktop || activeView === Views.Mobile ? (
        <>
          <Send markup={html} />
          <iframe
            id="preview-frame"
            ref={iframeRef}
            srcDoc={html}
            className={iframe}
            style={iframeStyle}
          />
        </>
      ) : (
        <div>
          <CodeContainer
            raws={[
              { content: jsx, language: 'jsx' },
              { content: html, language: 'html' },
              { content: plainText, language: 'plain' }
            ]}
            activeView={activeView}
            setActiveView={handleViewChange}
          />
        </div>
      )}
    </Shell>
  );
};
