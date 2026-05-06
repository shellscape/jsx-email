import { useEffect, useRef, useState } from 'react';

export function useScroll() {
  interface ScrollInfo {
    edges: {
      horizontal: 'right' | 'left' | false;
      vertical: 'top' | 'bottom' | false;
    };
  }

  const targetElRef = useRef(null);
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    edges: { horizontal: 'left', vertical: 'top' }
  });

  useEffect(() => {
    updateScrollInfo();

    if (!targetElRef || !targetElRef.current) return undefined;

    const targetEl = targetElRef.current as unknown as HTMLElement;

    targetEl.addEventListener('scroll', updateScrollInfo);

    return () => {
      targetEl.removeEventListener('scroll', updateScrollInfo);
    };
  }, []);

  async function updateScrollInfo() {
    const targetEl = targetElRef.current as unknown as HTMLElement;
    if (!targetEl) return;

    const boundingRect = targetEl.getBoundingClientRect();

    const modScrollInfo: ScrollInfo = JSON.parse(JSON.stringify(scrollInfo));

    if (Math.floor(targetEl.scrollLeft) <= 0) modScrollInfo.edges.horizontal = 'left';
    else if (
      Math.ceil(targetEl.scrollLeft) + Math.ceil(boundingRect.width) >=
      Math.ceil(targetEl.scrollWidth)
    )
      modScrollInfo.edges.horizontal = 'right';
    else modScrollInfo.edges.horizontal = false;

    if (Math.floor(targetEl.scrollTop) <= 0) modScrollInfo.edges.vertical = 'top';
    else if (
      Math.ceil(targetEl.scrollTop) + Math.ceil(boundingRect.height) >=
      Math.ceil(targetEl.scrollHeight)
    )
      modScrollInfo.edges.vertical = 'bottom';
    else modScrollInfo.edges.vertical = false;

    setScrollInfo(modScrollInfo);
  }

  return {
    ref: targetElRef,
    scroll: scrollInfo
  };
}
