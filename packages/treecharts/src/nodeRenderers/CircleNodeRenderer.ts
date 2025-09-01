import { SVG_NS } from "../constants";
import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * CircleNodeRenderer handles rendering of circular nodes
 */
export class CircleNodeRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Create shadow if enabled (using ellipse for shadow to match circle better)
    if (options.shadow) {
      const shadow = this.createCircleShadow(options);
      group.appendChild(shadow);
    }

    // Create the circle
    const circle = this.createCircleElement(options);
    group.appendChild(circle);

    // Create text
    const text = this.createBasicText(options);
    group.appendChild(text);

    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    return {
      element: group,
      bounds: {
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
      },
      centerX,
      centerY,
    };
  }

  private createCircleElement(
    options: Required<NodeOptions>
  ): SVGCircleElement {
    const circle = document.createElementNS(SVG_NS, "circle");

    const radius = Math.min(options.width, options.height) / 2;
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    circle.setAttribute("cx", centerX.toString());
    circle.setAttribute("cy", centerY.toString());
    circle.setAttribute("r", radius.toString());

    // Apply gradient or solid fill
    const gradientUrl = this.createGradient(options);
    const fill = gradientUrl || options.fill;
    circle.setAttribute("fill", fill);

    // Apply common styling
    this.applyCommonStyling(circle, options);

    return circle;
  }

  private createCircleShadow(options: Required<NodeOptions>): SVGCircleElement {
    const shadow = document.createElementNS(SVG_NS, "circle");

    const radius = Math.min(options.width, options.height) / 2;
    const centerX = options.x + options.width / 2 + options.shadowOffset.x;
    const centerY = options.y + options.height / 2 + options.shadowOffset.y;

    shadow.setAttribute("cx", centerX.toString());
    shadow.setAttribute("cy", centerY.toString());
    shadow.setAttribute("r", radius.toString());
    shadow.setAttribute("fill", options.shadowColor);

    return shadow;
  }
}
