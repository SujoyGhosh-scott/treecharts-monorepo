import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * ShapeNodeRenderer handles rendering of various geometric shapes
 * Supports ellipse, diamond, hexagon, triangle, pentagon, octagon, star, and custom shapes
 */
export class ShapeNodeRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Create shadow if enabled
    const shadow = this.createShadow(options);
    if (shadow) {
      group.appendChild(shadow);
    }

    // Create the shape based on type
    const shape = this.createShape(options);
    group.appendChild(shape);

    // Apply gradient or solid fill
    const gradientUrl = this.createGradient(options);
    const fill = gradientUrl || options.fill;
    shape.setAttribute("fill", fill);

    // Apply common styling
    this.applyCommonStyling(shape, options);

    // Create text if provided
    if (options.text && options.text.trim()) {
      const text = this.createBasicText(options);
      group.appendChild(text);
    }

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

  /**
   * Create the appropriate shape based on the node type
   */
  private createShape(options: Required<NodeOptions>): SVGElement {
    switch (options.type) {
      case "ellipse":
        return this.createEllipse(options);
      case "diamond":
        return this.createDiamond(options);
      case "hexagon":
        return this.createHexagon(options);
      case "triangle":
        return this.createTriangle(options);
      case "pentagon":
        return this.createPentagon(options);
      case "octagon":
        return this.createOctagon(options);
      case "star":
        return this.createStar(options);
      case "custom":
        return this.createCustomShape(options);
      default:
        // Fallback to ellipse for unknown shape types
        return this.createEllipse(options);
    }
  }

  /**
   * Create an ellipse node
   */
  private createEllipse(options: Required<NodeOptions>): SVGEllipseElement {
    const ellipse = document.createElementNS(SVG_NS, "ellipse");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    ellipse.setAttribute("cx", centerX.toString());
    ellipse.setAttribute("cy", centerY.toString());
    ellipse.setAttribute("rx", (options.width / 2).toString());
    ellipse.setAttribute("ry", (options.height / 2).toString());

    return ellipse;
  }

  /**
   * Create a diamond node
   */
  private createDiamond(options: Required<NodeOptions>): SVGPolygonElement {
    const diamond = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    const points = [
      `${centerX},${options.y}`, // top
      `${options.x + options.width},${centerY}`, // right
      `${centerX},${options.y + options.height}`, // bottom
      `${options.x},${centerY}`, // left
    ].join(" ");

    diamond.setAttribute("points", points);
    return diamond;
  }

  /**
   * Create a hexagon node
   */
  private createHexagon(options: Required<NodeOptions>): SVGPolygonElement {
    const hexagon = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;
    const halfWidth = options.width / 2;

    const points = [
      `${centerX - halfWidth * 0.5},${options.y}`, // top left
      `${centerX + halfWidth * 0.5},${options.y}`, // top right
      `${options.x + options.width},${centerY}`, // right
      `${centerX + halfWidth * 0.5},${options.y + options.height}`, // bottom right
      `${centerX - halfWidth * 0.5},${options.y + options.height}`, // bottom left
      `${options.x},${centerY}`, // left
    ].join(" ");

    hexagon.setAttribute("points", points);
    return hexagon;
  }

  /**
   * Create a triangle node
   */
  private createTriangle(options: Required<NodeOptions>): SVGPolygonElement {
    const triangle = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;

    const points = [
      `${centerX},${options.y}`, // top
      `${options.x + options.width},${options.y + options.height}`, // bottom right
      `${options.x},${options.y + options.height}`, // bottom left
    ].join(" ");

    triangle.setAttribute("points", points);
    return triangle;
  }

  /**
   * Create a pentagon node
   */
  private createPentagon(options: Required<NodeOptions>): SVGPolygonElement {
    const pentagon = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;
    const radius = Math.min(options.width, options.height) / 2;

    const points = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    pentagon.setAttribute("points", points.join(" "));
    return pentagon;
  }

  /**
   * Create an octagon node
   */
  private createOctagon(options: Required<NodeOptions>): SVGPolygonElement {
    const octagon = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;
    const radius = Math.min(options.width, options.height) / 2;

    const points = [];
    for (let i = 0; i < 8; i++) {
      // Fixed: use 8 for octagon, not NODE_CONSTANTS.STAR_POINTS
      const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    octagon.setAttribute("points", points.join(" "));
    return octagon;
  }

  /**
   * Create a star node
   */
  private createStar(options: Required<NodeOptions>): SVGPolygonElement {
    const star = document.createElementNS(SVG_NS, "polygon");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;
    const outerRadius = Math.min(options.width, options.height) / 2;
    const innerRadius = outerRadius * 0.4;

    const points = [];
    for (let i = 0; i < 10; i++) {
      // 10 points for 5-pointed star (5 outer + 5 inner)
      const angle = (i * Math.PI) / 5 - Math.PI / 2; // Start from top
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    star.setAttribute("points", points.join(" "));
    return star;
  }

  /**
   * Create a custom shape node
   */
  private createCustomShape(options: Required<NodeOptions>): SVGElement {
    // For custom shapes, users can provide custom path data
    if (options.customAttributes.d) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", String(options.customAttributes.d));

      // Apply transformation to position the path correctly
      path.setAttribute("transform", `translate(${options.x}, ${options.y})`);

      return path;
    }

    // Default to ellipse if no custom path is provided
    return this.createEllipse(options);
  }
}
