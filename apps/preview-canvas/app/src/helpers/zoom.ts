export const minZoom = 25;
export const maxZoom = 130;
export const zoomStep = 10;

export function nextZoom(value: number, direction: number) {
  if (direction > 0) {
    const next = Math.ceil((value + 1) / zoomStep) * zoomStep;
    return Math.min(maxZoom, Math.max(minZoom, next));
  }

  const next = Math.floor((value - 1) / zoomStep) * zoomStep;
  return Math.max(minZoom, Math.min(maxZoom, next));
}

export function isZoomKey(event: KeyboardEvent | React.KeyboardEvent) {
  return event.code === 'KeyZ' || event.key.toLowerCase() === 'z';
}
