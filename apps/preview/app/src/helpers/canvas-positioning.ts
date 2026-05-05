export const canvasOrigin = 50000;
export const floatingPanelInset = 12;
export const fileSystemPanelWidth = 288;
export const collapsedLabPanelWidth = 48;
export const canvasPaddingX = 32;
export const cardAlignmentAdjustment = 6;

export const initialCardOffset =
  floatingPanelInset +
  fileSystemPanelWidth +
  (496 - floatingPanelInset - fileSystemPanelWidth - collapsedLabPanelWidth) / 2 -
  canvasPaddingX -
  cardAlignmentAdjustment;

export function getWorkspaceCenter(canvasRect: DOMRect) {
  const explorerRect = document.getElementById('templates-window')?.getBoundingClientRect();
  const leftEdge = explorerRect
    ? explorerRect.right
    : canvasRect.left + floatingPanelInset + fileSystemPanelWidth;
  const collapsedLabLeftEdge = canvasRect.right - floatingPanelInset - collapsedLabPanelWidth;

  return collapsedLabLeftEdge > leftEdge
    ? leftEdge + (collapsedLabLeftEdge - leftEdge) / 2
    : canvasRect.left + canvasRect.width / 2;
}

export function isZoomExcludedTarget(target: EventTarget | null) {
  return Boolean(
    target instanceof Element && target.closest('#templates-window, #tool-panel')
  );
}
