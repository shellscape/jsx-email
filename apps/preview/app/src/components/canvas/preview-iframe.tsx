import { useLayoutEffect, useRef, useState } from 'react';

interface PreviewIframeProps {
  html: string;
  title: string;
}

export function PreviewIframe({ html, title }: PreviewIframeProps) {
  const [renderedHtml, setRenderedHtml] = useState(html);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pendingScroll = useRef<{ x: number; y: number } | null>(null);

  useLayoutEffect(() => {
    if (html === renderedHtml) return;

    const frame = iframeRef.current;
    pendingScroll.current = {
      x: frame?.contentWindow?.scrollX || 0,
      y: frame?.contentWindow?.scrollY || 0
    };
    setRenderedHtml(html);
  }, [html, renderedHtml]);

  return (
    <iframe
      className="block h-full w-full border-0"
      onLoad={() => {
        const scroll = pendingScroll.current;
        const frame = iframeRef.current;
        if (!scroll || !frame?.contentWindow) return;
        frame.contentWindow.scrollTo(scroll.x, scroll.y);
        pendingScroll.current = null;
      }}
      ref={iframeRef}
      sandbox="allow-same-origin"
      srcDoc={renderedHtml}
      title={title}
    />
  );
}
