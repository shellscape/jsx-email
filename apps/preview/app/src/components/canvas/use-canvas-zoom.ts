import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { isZoomExcludedTarget } from '../../helpers/canvas-positioning';
import { isZoomKey, maxZoom, minZoom, nextZoom } from '../../helpers/zoom';

interface UseCanvasZoomOptions {
  canvasRef: RefObject<HTMLElement | null>;
  setZoom: (zoom: number) => void;
  zoom: number;
}

export function useCanvasZoom({ canvasRef, setZoom, zoom }: UseCanvasZoomOptions) {
  const pendingZoomAnchor = useRef<ZoomAnchor | null>(null);
  const [isZoomKeyDown, setIsZoomKeyDown] = useState(false);
  const [isAltDown, setIsAltDown] = useState(false);
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

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
      changeZoom(event.altKey || isAltDown ? -1 : 1, {
        x: event.clientX,
        y: event.clientY
      });
    }

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [isAltDown, isZoomKeyDown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    function handleWheel(event: WheelEvent) {
      const { ctrlKey, metaKey } = event;
      if (!ctrlKey && !metaKey) return;
      if (isZoomExcludedTarget(event.target)) return;

      event.preventDefault();

      const { current } = zoomRef;
      const anchor = { x: event.clientX, y: event.clientY };
      const delta = -event.deltaY;

      if (ctrlKey) {
        // Pinch / Ctrl+scroll — continuous
        const next = Math.round(Math.min(maxZoom, Math.max(minZoom, current + delta * 0.5)));
        if (next !== current) {
          setZoomAnchor(current, anchor);
          setZoom(next);
        }
      } else {
        // Cmd+scroll — step zoom
        changeZoom(delta > 0 ? 1 : -1, anchor);
      }
    }

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [canvasRef]);

  useEffect(() => {
    function handleZoomEvent(event: Event) {
      const direction = Number((event as CustomEvent<number>).detail);
      if (direction === -1 || direction === 1) changeZoom(direction);
    }

    function handleKeyDown(event: KeyboardEvent) {
      setIsAltDown(event.altKey);
      if (isZoomKey(event)) setIsZoomKeyDown(true);

      const isMod = event.metaKey || event.ctrlKey;
      if (!isMod) return;

      if (event.key === '=' || event.key === '+') {
        event.preventDefault();
        changeZoom(1);
      } else if (event.key === '-') {
        event.preventDefault();
        changeZoom(-1);
      } else if (event.key === '0') {
        event.preventDefault();
        const { current } = zoomRef;
        if (current !== 100) {
          setZoomAnchor(current);
          setZoom(100);
        }
      }
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
  }, []);

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

  function setZoomAnchor(currentZoom: number, anchorPoint?: { x: number; y: number }) {
    const canvas = canvasRef.current;
    const content = canvas?.firstElementChild;
    if (!canvas || !content) return;

    const canvasRect = canvas.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const scale = currentZoom / 100;
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

  function changeZoom(direction: number, anchorPoint?: { x: number; y: number }) {
    const { current } = zoomRef;
    const next = nextZoom(current, direction);
    if (next === current) return;
    setZoomAnchor(current, anchorPoint);
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
