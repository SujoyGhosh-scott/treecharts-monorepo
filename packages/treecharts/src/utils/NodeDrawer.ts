import { SVG_NS } from "../constants";
import { NodeOptions, Point } from "../types";

/**
 * NodeDrawer class for drawing different types of tree nodes
 * Provides unified node drawing with customizable styling and types
 */
export class NodeDrawer {
  private svg: SVGSVGElement;
  private defaultOptions: Required<NodeOptions> = {
    type: "rectangle",
    width: 80,
    height: 40,
    x: 0,
    y: 0,
    fill: "skyblue",
    stroke: "black",
    strokeWidth: 1,
    borderRadius: 0,
    opacity: 1,
    text: "",
    fontSize: 14,
    fontColor: "black",
    fontFamily: "Arial, sans-serif",
    textAnchor: "middle",
    padding: 5,
    shadow: false,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { x: 2, y: 2 },
    gradient: false,
    gradientStartColor: "",
    gradientEndColor: "",
    icon: "",
    iconSize: 16,
    iconColor: "black",
    customAttributes: {},
  };

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
  }

  /**
   * Draw a node at the specified position
   */
  public drawNode(options: Partial<NodeOptions> = {}): {
    elements: SVGElement[];
    centerX: number;
    centerY: number;
    bounds: { x: number; y: number; width: number; height: number };
  } {
    const finalOptions = { ...this.defaultOptions, ...options };

    let nodeElements: SVGElement[] = [];
    let bounds = {
      x: finalOptions.x,
      y: finalOptions.y,
      width: finalOptions.width,
      height: finalOptions.height,
    };

    // Create the main node shape based on type
    const shapeElement = this.createNodeShape(finalOptions);
    nodeElements.push(shapeElement);

    // Add shadow if enabled
    if (finalOptions.shadow) {
      const shadowElement = this.createShadow(finalOptions);
      if (shadowElement) {
        this.svg.appendChild(shadowElement);
        nodeElements.push(shadowElement);
      }
    }

    // Add gradient if enabled
    if (
      finalOptions.gradient &&
      finalOptions.gradientStartColor &&
      finalOptions.gradientEndColor
    ) {
      this.applyGradient(shapeElement, finalOptions);
    }

    // Apply basic styling
    this.applyBasicStyling(shapeElement, finalOptions);

    // Add text if provided
    if (finalOptions.text && finalOptions.text.trim()) {
      const textElement = this.createText(finalOptions);
      nodeElements.push(textElement);
    }

    // Add icon if provided
    if (finalOptions.icon) {
      const iconElement = this.createIcon(finalOptions);
      if (iconElement) {
        nodeElements.push(iconElement);
      }
    }

    // Add all elements to SVG
    nodeElements.forEach((element) => {
      this.svg.appendChild(element);
    });

    const centerX = finalOptions.x + finalOptions.width / 2;
    const centerY = finalOptions.y + finalOptions.height / 2;

    return {
      elements: nodeElements,
      centerX,
      centerY,
      bounds,
    };
  }

  /**
   * Create the main node shape based on type
   */
  private createNodeShape(options: Required<NodeOptions>): SVGElement {
    switch (options.type) {
      case "rectangle":
        return this.createRectangle(options);
      case "circle":
        return this.createCircle(options);
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
        return this.createRectangle(options);
    }
  }

  /**
   * Create a rectangle node
   */
  private createRectangle(options: Required<NodeOptions>): SVGRectElement {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", options.x.toString());
    rect.setAttribute("y", options.y.toString());
    rect.setAttribute("width", options.width.toString());
    rect.setAttribute("height", options.height.toString());

    if (options.borderRadius > 0) {
      rect.setAttribute("rx", options.borderRadius.toString());
      rect.setAttribute("ry", options.borderRadius.toString());
    }

    return rect;
  }

  /**
   * Create a circle node
   */
  private createCircle(options: Required<NodeOptions>): SVGCircleElement {
    const circle = document.createElementNS(SVG_NS, "circle");
    const radius = Math.min(options.width, options.height) / 2;
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    circle.setAttribute("cx", centerX.toString());
    circle.setAttribute("cy", centerY.toString());
    circle.setAttribute("r", radius.toString());

    return circle;
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
    const halfWidth = options.width / 2;
    const halfHeight = options.height / 2;

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
    const halfHeight = options.height / 2;

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
    // For custom shapes, users can provide custom attributes
    // Default to rectangle if no custom path is provided
    if (options.customAttributes.d) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", String(options.customAttributes.d));
      return path;
    }

    return this.createRectangle(options);
  }

  /**
   * Create shadow for the node
   */
  private createShadow(options: Required<NodeOptions>): SVGElement | null {
    if (!options.shadow) return null;

    // Create a copy of the main shape for shadow
    const shadowOptions = {
      ...options,
      x: options.x + options.shadowOffset.x,
      y: options.y + options.shadowOffset.y,
      fill: options.shadowColor,
      stroke: "none",
    };

    const shadowElement = this.createNodeShape(shadowOptions);
    shadowElement.setAttribute("fill", options.shadowColor);
    shadowElement.setAttribute("stroke", "none");

    return shadowElement;
  }

  /**
   * Apply gradient to the node
   */
  private applyGradient(
    element: SVGElement,
    options: Required<NodeOptions>
  ): void {
    const gradientId = `gradient-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    let defs = this.svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(SVG_NS, "defs");
      this.svg.insertBefore(defs, this.svg.firstChild);
    }

    const gradient = document.createElementNS(SVG_NS, "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "0%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(SVG_NS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", options.gradientStartColor);

    const stop2 = document.createElementNS(SVG_NS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", options.gradientEndColor);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);

    element.setAttribute("fill", `url(#${gradientId})`);
  }

  /**
   * Apply basic styling to the node element
   */
  private applyBasicStyling(
    element: SVGElement,
    options: Required<NodeOptions>
  ): void {
    if (!options.gradient) {
      element.setAttribute("fill", options.fill);
    }
    element.setAttribute("stroke", options.stroke);
    element.setAttribute("stroke-width", options.strokeWidth.toString());
    element.setAttribute("opacity", options.opacity.toString());

    // Apply any custom attributes
    Object.entries(options.customAttributes).forEach(([key, value]) => {
      if (key !== "d") {
        // Skip path data for non-path elements
        element.setAttribute(key, String(value));
      }
    });
  }

  /**
   * Create text element for the node
   */
  private createText(options: Required<NodeOptions>): SVGTextElement {
    const text = document.createElementNS(SVG_NS, "text");
    const centerX = options.x + options.width / 2;
    const centerY = options.y + options.height / 2;

    text.setAttribute("x", centerX.toString());
    text.setAttribute("y", centerY.toString()); // Perfect vertical centering
    text.setAttribute("text-anchor", options.textAnchor);
    text.setAttribute("font-size", options.fontSize.toString());
    text.setAttribute("font-family", options.fontFamily);
    text.setAttribute("fill", options.fontColor);
    text.setAttribute("dominant-baseline", "central");

    // Handle multi-line text
    const lines = options.text.split("\n");
    if (lines.length === 1) {
      text.textContent = options.text;
    } else {
      lines.forEach((line: string, index: number) => {
        const tspan = document.createElementNS(SVG_NS, "tspan");
        tspan.setAttribute("x", centerX.toString());
        tspan.setAttribute("dy", index === 0 ? "0" : "1.2em");
        tspan.textContent = line;
        text.appendChild(tspan);
      });
    }

    return text;
  }

  /**
   * Create icon element for the node
   */
  private createIcon(options: Required<NodeOptions>): SVGElement | null {
    if (!options.icon) return null;

    // For now, we'll support text-based icons or unicode symbols
    // In the future, this could be extended to support SVG icons or font icons
    const icon = document.createElementNS(SVG_NS, "text");
    const iconX = options.x + options.padding;
    const iconY = options.y + options.padding + options.iconSize;

    icon.setAttribute("x", iconX.toString());
    icon.setAttribute("y", iconY.toString());
    icon.setAttribute("font-size", options.iconSize.toString());
    icon.setAttribute("fill", options.iconColor);
    icon.textContent = options.icon;

    return icon;
  }
}
