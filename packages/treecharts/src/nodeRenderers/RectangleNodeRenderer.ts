import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * RectangleNodeRenderer handles rendering of rectangular nodes
 */
export class RectangleNodeRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Create shadow if enabled
    const shadow = this.createShadow(options);
    if (shadow) {
      group.appendChild(shadow);
    }

    // Create the rectangle
    const rect = this.createRectangleElement(options);
    group.appendChild(rect);

    // Create text
    const text = this.createBasicText(options);
    group.appendChild(text);

    // Add to SVG
    this.svg.appendChild(group);

    return {
      element: group,
      bounds: {
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
      },
      centerX: options.x + options.width / 2,
      centerY: options.y + options.height / 2,
    };
  }
}
