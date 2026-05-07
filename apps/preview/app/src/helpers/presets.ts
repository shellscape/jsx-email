import type { PreviewPreset } from '../types/templates';

export const previewPresets: PreviewPreset[] = [
  { label: '100%', name: 'Full Width', width: null },
  { label: '430px', name: 'iPhone 15 Pro Max', width: 430 },
  { label: '393px', name: 'iPhone 15 Pro', width: 393 },
  { label: '375px', name: 'iPhone 13 mini', width: 375 },
  { label: '360px', name: 'Gmail Mobile', width: 360 },
  { height: 1180, label: '820x1180', name: 'iPad Air 4', width: 820 },
  { height: 1112, label: '834x1112', name: 'iPad Pro 10.5"', width: 834 },
  { height: 1024, label: '768x1024', name: 'iPad Mini 4', width: 768 }
];
