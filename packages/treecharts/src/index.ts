// Export main TreeChart class
export { TreeChart } from "./TreeChart";

// Export types
export * from "./types";

// Export constants
export { DEFAULT_OPTIONS } from "./constants";

// Export utils
export { formatTree } from "./utils/treeFormatter";
export { svgHelpers } from "./utils/svgHelpers";

// Export renderers
export {
  BaseRenderer,
  DirectRenderer,
  RightAngleRenderer,
  CurvedRenderer,
  AllDirectionRenderer,
} from "./renderers";

// Export node renderers
export {
  BaseNodeRenderer,
  RectangleNodeRenderer,
  CircleNodeRenderer,
  NodeWithDescriptionRenderer,
  CollapsibleNodeRenderer,
  ImageNodeRenderer,
} from "./nodeRenderers";

// Default export
import { TreeChart } from "./TreeChart";
export default TreeChart;
