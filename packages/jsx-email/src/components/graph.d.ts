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
export declare const Graph: JsxEmailComponent<GraphProps>;
//# sourceMappingURL=graph.d.ts.map