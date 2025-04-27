export { BaseRenderer } from "./BaseRenderer";
export { DirectRenderer } from "./DirectRenderer";
export { RightAngleRenderer } from "./RightAngleRenderer";
export { CurvedRenderer } from "./CurvedRenderer";
export { AllDirectionRenderer } from "./AllDirectionRenderer";

import { BaseRenderer } from "./BaseRenderer";
import { DirectRenderer } from "./DirectRenderer";
import { RightAngleRenderer } from "./RightAngleRenderer";
import { CurvedRenderer } from "./CurvedRenderer";
import { AllDirectionRenderer } from "./AllDirectionRenderer";
import { TreeType, FormattedTree, TreeChartOptions } from "../types";

/**
 * Factory function to create the appropriate renderer based on tree type
 *
 * @param type Type of tree visualization
 * @param formattedTree Formatted tree data
 * @param options Rendering options
 * @returns The appropriate renderer instance
 */
export function createRenderer(
  type: TreeType,
  formattedTree: FormattedTree,
  options: TreeChartOptions
): BaseRenderer {
  switch (type) {
    case "direct":
      return new DirectRenderer(formattedTree, options);
    case "right-angle":
      return new RightAngleRenderer(formattedTree, options);
    case "curved":
      return new CurvedRenderer(formattedTree, options);
    case "all-direction":
      return new AllDirectionRenderer(formattedTree, options);
    default:
      return new DirectRenderer(formattedTree, options);
  }
}
