import type { ChartConfiguration } from 'chart.js';

import { debug } from '../debug';
import type { JsxEmailComponent } from '../types';

export interface GraphProps {
  background?: string;
  className?: string;
  config: ChartConfiguration & Record<string, any>;
  height?: number;
  title: string;
  width?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/html' } : {};

export const Graph: JsxEmailComponent<GraphProps> = ({
  config,
  title,
  width,
  height,
  background,
  className
}) => {
  const baseURL = 'https://quickchart.io/chart';
  let url = `${baseURL}?c=${encodeURIComponent(JSON.stringify(config))}`;
  if (width) {
    url += `&w=${width}`;
  }
  if (height) {
    url += `&h=${height}`;
  }
  if (background) {
    url += `&bkg=${background}`;
  }

  return (
    <img
      {...debugProps}
      className={className}
      src={url}
      alt={title}
      width={width}
      height={height}
    />
  );
};
