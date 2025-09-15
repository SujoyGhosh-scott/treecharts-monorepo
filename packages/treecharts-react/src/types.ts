import { TreeChartOptions, TreeNode } from "treecharts";
import { TreeChart as CoreTreeChart } from "treecharts";

export interface TreeChartProps extends TreeChartOptions {
  data: TreeNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  onRender?: (svg: SVGSVGElement) => void;
  onUpdate?: (svg: SVGSVGElement) => void;
}

export interface TreeChartRef {
  getInstance: () => CoreTreeChart | null;
  getSvg: () => SVGSVGElement | null;
  update: (data: TreeNode) => void;
  setOptions: (options: TreeChartOptions) => void;
  setType: (type: TreeChartOptions["type"]) => void;
  resize: (width: number, height: number) => void;
}
