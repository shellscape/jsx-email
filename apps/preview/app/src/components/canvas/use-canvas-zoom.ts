import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { isZoomExcludedTarget } from '../../helpers/canvas-positioning';
import { isZoomKey, nextZoom } from '../../helpers/zoom';

interface UseCanvasZoomOptions {
  canvasRef: RefObject<HTMLElement | null>;
  setZoom: (zoom: number) => void;
  zoom: number;
}

export function useCanvasZoom({ canvasRef, setZoom, zoom }: UseCanvasZoomOptions) {
  const pendingZoomAnchor = useRef<ZoomAnchor | null>(null);
  const [isZoomKeyDown, setIsZoomKeyDown] = useState(false);
  const [isAltDown, setIsAltDown] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('is-zooming-in', isZoomKeyDown && !isAltDown);
    root.classList.toggle('is-zooming-out', isZoomKeyDown && isAltDown);

    return () => root.classList.remove('is-zooming-in', 'is-zooming-out');
  }, [isAltDown, isZoomKeyDown]);

  useEffect(() => {
    if (!isZoomKeyDown) return undefined;

    function handleDocumentClick(event: MouseEvent) {
      if (isZoomExcludedTarget(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      changeZoom(event.altKey || isAltDown ? -1 : 1, { x: event.clientX, y: event.clientY });
    }

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [isAltDown, isZoomKeyDown, zoom]);

  useEffect(() => {
    function handleZoomEvent(event: Event) {
      const direction = Number((event as CustomEvent<number>).detail);
      if (direction === -1 || direction === 1) changeZoom(direction);
    }
    function handleKeyDown(event: KeyboardEvent) {
      setIsAltDown(event.altKey);
      if (isZoomKey(event)) setIsZoomKeyDown(true);
    }
    function handleKeyUp(event: KeyboardEvent) {
      setIsAltDown(event.altKey);
      if (isZoomKey(event)) setIsZoomKeyDown(false);
    }
    function handleBlur() {
      setIsZoomKeyDown(false);
      setIsAltDown(false);
    }

    window.addEventListener('preview-canvas-zoom', handleZoomEvent);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('preview-canvas-zoom', handleZoomEvent);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [zoom]);

  useLayoutEffect(() => {
    const anchor = pendingZoomAnchor.current;
    if (!anchor) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      pendingZoomAnchor.current = null;
      return;
    }

    const nextScale = zoom / 100;
    canvas.scrollTo({
      behavior: 'auto',
      left: anchor.scrollLeft + anchor.localX * (nextScale - anchor.scale),
      top: anchor.scrollTop + anchor.localY * (nextScale - anchor.scale)
    });
    pendingZoomAnchor.current = null;
  }, [canvasRef, zoom]);

  function changeZoom(direction: number, anchorPoint?: { x: number; y: number }) {
    const next = nextZoom(zoom, direction);
    if (next === zoom) return;
    const canvas = canvasRef.current;
    const content = canvas?.firstElementChild;

    if (canvas && content) {
      const canvasRect = canvas.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const scale = zoom / 100;
      const anchorX = anchorPoint?.x ?? canvasRect.left + canvasRect.width / 2;
      const anchorY = anchorPoint?.y ?? canvasRect.top + canvasRect.height / 2;
      pendingZoomAnchor.current = {
        localX: (anchorX - contentRect.left) / scale,
        localY: (anchorY - contentRect.top) / scale,
        scale,
        scrollLeft: canvas.scrollLeft,
        scrollTop: canvas.scrollTop
      };
    }

    setZoom(next);
  }

  return { changeZoom, isAltDown, isZoomKeyDown, setIsAltDown };
}

interface ZoomAnchor {
  localX: number;
  localY: number;
  scale: number;
  scrollLeft: number;
  scrollTop: number;
}
