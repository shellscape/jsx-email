'use client';

import classnames from 'classnames';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { CodeContainer } from './components/code-container';
import { Mobile } from './components/mobile';
import { Shell } from './components/shell';
import { Views } from './types';

interface PreviewProps {
  html: string;
  jsx: string;
  plainText: string;
  templateNames: string[];
  title: string;
}

const validViews = Object.keys(Views).filter((key) => isNaN(+key));

export const Preview = ({ html, jsx, plainText, templateNames, title }: PreviewProps) => {
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

  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    const handleLoad = () => {
      const iframeDocument =
        iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

      const styleElement = iframeDocument.createElement('style');
      styleElement.innerHTML = `table{
          width: 100% !important; 
        }`;

      iframeDocument.head.appendChild(styleElement);
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, [html]);

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
      templateNames={templateNames}
      title={title}
      html={html}
      activeView={activeView}
      setActiveView={handleViewChange}
    >
      {activeView === Views.Mobile && <Mobile setViewSize={setViewSize} />}
      {activeView === Views.Desktop || activeView === Views.Mobile ? (
        <iframe ref={iframeRef} srcDoc={html} className={iframe} style={iframeStyle} />
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
