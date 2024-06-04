import { debug } from '../debug.js';
import type { JsxEmailComponent } from '../types.js';

export interface GraphProps {
  background?: string;
  className?: string;
  /** The Chart.js configuration for the graph. Adjust it as much as you want in the sandbox
   * @docs https://jsx.email/docs/components/graph
   *
   * @sandbox https://quickchart.io/sandbox
   *
   * @props https://www.chartjs.org/docs/2.9.4/configuration/
   */
  config: Record<string, any>;
  height?: number;
  title: string;
  width?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/graph' } : {};

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
