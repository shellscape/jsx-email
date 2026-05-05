import { useLayoutEffect, useRef } from 'react';

import {
  canvasOrigin,
  getWorkspaceCenter,
  initialCardOffset
} from '../../helpers/canvas-positioning';
import { usePreviewStore } from '../../stores/preview-store';
import { EmptyCard } from './empty-card';
import { TemplateCard } from './template-card';
import { useCanvasZoom } from './use-canvas-zoom';

export function Canvas() {
  const cards = usePreviewStore((state) => state.cards);
  const focusRequest = usePreviewStore((state) => state.focusRequest);
  const selectedId = usePreviewStore((state) => state.selectedId);
  const templates = usePreviewStore((state) => state.templates);
  const zoom = usePreviewStore((state) => state.zoom);
  const setZoom = usePreviewStore((state) => state.setZoom);
  const canvasRef = useRef<HTMLElement | null>(null);
  const cardNodes = useRef(new Map<string, HTMLDivElement>());
  const initialized = useRef(false);
  const previousSelectedId = useRef<string | null>(null);
  const { isAltDown, isZoomKeyDown, setIsAltDown } = useCanvasZoom({ canvasRef, setZoom, zoom });

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas || initialized.current) return;
      canvas.scrollLeft = canvasOrigin;
      canvas.scrollTop = canvasOrigin;
      initialized.current = true;
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useLayoutEffect(() => {
    if (!focusRequest) return;

    const frame = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const card = cardNodes.current.get(focusRequest.id);
      if (!canvas || !card) return;
      const canvasRect = canvas.getBoundingClientRect();
      const workspaceCenter = getWorkspaceCenter(canvasRect);
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;

      canvas.scrollTo({
        behavior: previousSelectedId.current ? 'smooth' : 'auto',
        left: canvas.scrollLeft + cardCenter - workspaceCenter,
        top: canvas.scrollTop
      });
      previousSelectedId.current = focusRequest.id;
    });

    return () => cancelAnimationFrame(frame);
  }, [focusRequest, cards.length]);

  function setCardNode(id: string, node: HTMLDivElement | null) {
    if (node) cardNodes.current.set(id, node);
    else cardNodes.current.delete(id);
  }

  return (
    <>
      {isZoomKeyDown && (
        <div
          aria-hidden
          className="fixed inset-0 z-[35]"
          style={{ cursor: isAltDown ? 'zoom-out' : 'zoom-in' }}
        />
      )}
      <main
        className="canvas-grid h-screen cursor-[var(--canvas-cursor)] overflow-auto px-8 pb-16 pt-[88px] [--canvas-cursor:auto]"
        onMouseLeave={(event) => {
          event.currentTarget.style.setProperty('--grid-x', '-999px');
          event.currentTarget.style.setProperty('--grid-y', '-999px');
          event.currentTarget.style.setProperty('--canvas-cursor', 'auto');
        }}
        onMouseMove={(event) => {
          if (isZoomKeyDown && event.altKey !== isAltDown) setIsAltDown(event.altKey);
          event.currentTarget.style.setProperty(
            '--canvas-cursor',
            isZoomKeyDown ? (event.altKey || isAltDown ? 'zoom-out' : 'zoom-in') : 'auto'
          );
          event.currentTarget.style.setProperty('--grid-x', `${event.clientX}px`);
          event.currentTarget.style.setProperty('--grid-y', `${event.clientY}px`);
        }}
        ref={canvasRef}
      >
        <div
          className="mr-16 origin-top-left"
          style={{
            marginLeft: `${canvasOrigin + initialCardOffset}px`,
            marginTop: `${canvasOrigin}px`,
            minHeight: `${canvasOrigin * 2 + 2400}px`,
            transform: `scale(${zoom / 100})`,
            width: `${canvasOrigin * 2}px`
          }}
        >
          {cards.length === 0 ? (
            <EmptyCard />
          ) : (
            <div className="inline-flex flex-nowrap items-start gap-6 pr-[340vw]">
              {cards.map((card) => {
                const template = templates.find((item) => item.id === card.templateId);
                if (!template) return null;
                return (
                  <TemplateCard
                    card={card}
                    key={card.id}
                    selected={selectedId === card.id}
                    setCardNode={setCardNode}
                    template={template}
                  />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
