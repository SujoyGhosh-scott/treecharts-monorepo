import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions, Point } from "../types";
import {
  ImageNodeRenderer,
  NodeWithDescriptionRenderer,
  CollapsibleNodeRenderer,
  RectangleNodeRenderer,
  CircleNodeRenderer,
} from "../nodeRenderers";

/**
 * NodeDrawer class for drawing different types of tree nodes
 * Provides unified node drawing with customizable styling and types
 */
export class NodeDrawer {
  private svg: SVGSVGElement;
  private imageNodeRenderer: ImageNodeRenderer;
  private nodeWithDescriptionRenderer: NodeWithDescriptionRenderer;
  private collapsibleNodeRenderer: CollapsibleNodeRenderer;
  private rectangleNodeRenderer: RectangleNodeRenderer;
  private circleNodeRenderer: CircleNodeRenderer;
  private defaultOptions: Required<NodeOptions> = {
    type: "rectangle",
    width: 80,
    height: 40,
    x: 0,
    y: 0,
    fill: NODE_CONSTANTS.DEFAULT_FILL_COLOR,
    stroke: NODE_CONSTANTS.DEFAULT_BORDER_COLOR,
    strokeWidth: NODE_CONSTANTS.DEFAULT_BORDER_WIDTH,
    borderRadius: NODE_CONSTANTS.DEFAULT_BORDER_RADIUS,
    opacity: NODE_CONSTANTS.DEFAULT_OPACITY,
    text: "",
    description: "",
    fontSize: NODE_CONSTANTS.DEFAULT_FONT_SIZE,
    fontColor: NODE_CONSTANTS.DEFAULT_FONT_COLOR,
    fontFamily: NODE_CONSTANTS.DEFAULT_FONT_FAMILY,
    textAnchor: NODE_CONSTANTS.DEFAULT_TEXT_ANCHOR,
    padding: NODE_CONSTANTS.DEFAULT_PADDING,
    descriptionFontSize: NODE_CONSTANTS.DESCRIPTION_FONT_SIZE,
    descriptionFontColor: NODE_CONSTANTS.DESCRIPTION_FONT_COLOR,
    descriptionMarginTop: NODE_CONSTANTS.DESCRIPTION_MARGIN_TOP,
    shadow: false,
    shadowColor: NODE_CONSTANTS.DEFAULT_SHADOW_COLOR,
    shadowOffset: NODE_CONSTANTS.DEFAULT_SHADOW_OFFSET,
    gradient: false,
    gradientStartColor: "",
    gradientEndColor: "",
    customAttributes: {},
    collapsible: false,
    expanded: false,
    onToggleExpand: () => {},
    imageConfig: {
      imageWidth: NODE_CONSTANTS.DEFAULT_IMAGE_WIDTH,
      imageHeight: NODE_CONSTANTS.DEFAULT_IMAGE_HEIGHT,
      imageBorderRadius: NODE_CONSTANTS.DEFAULT_IMAGE_BORDER_RADIUS,
      imageBorderColor: NODE_CONSTANTS.DEFAULT_IMAGE_BORDER_COLOR,
      imageBorderWidth: NODE_CONSTANTS.DEFAULT_IMAGE_BORDER_WIDTH,
      imageOpacity: NODE_CONSTANTS.DEFAULT_IMAGE_OPACITY,
      backgroundColor: "transparent",
    },
    imageTitleConfig: {
      fontSize: NODE_CONSTANTS.DEFAULT_TITLE_FONT_SIZE,
      fontColor: NODE_CONSTANTS.DEFAULT_TITLE_COLOR,
      fontWeight: "bold",
      marginTop: 6,
      alignment: "center",
    },
    imageSubtitleConfig: {
      fontSize: NODE_CONSTANTS.DEFAULT_SUBTITLE_FONT_SIZE,
      fontColor: NODE_CONSTANTS.DEFAULT_SUBTITLE_COLOR,
      fontWeight: "normal",
      marginTop: 2,
      alignment: "center",
    },
    imageTextPositionConfig: {
      position: "bottom",
      padding: NODE_CONSTANTS.DEFAULT_TEXT_PADDING,
      spacing: NODE_CONSTANTS.DEFAULT_TEXT_SPACING,
    },
    imageMargin: NODE_CONSTANTS.DEFAULT_IMAGE_MARGIN,
    imageUrl: "",
    title: "",
    subtitle: "",
  };

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
    this.imageNodeRenderer = new ImageNodeRenderer(svg);
    this.nodeWithDescriptionRenderer = new NodeWithDescriptionRenderer(svg);
    this.collapsibleNodeRenderer = new CollapsibleNodeRenderer(svg);
    this.rectangleNodeRenderer = new RectangleNodeRenderer(svg);
    this.circleNodeRenderer = new CircleNodeRenderer(svg);
  }

  /**
   * Create canvas context for text measurement
   * @private
   */
  private createTextMeasurementContext(): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas 2D context for text measurement");
    }

    return context;
  }

  /**
   * Measure text width with given font settings
   * @private
   */
  private measureText(
    text: string,
    fontSize: number,
    fontFamily: string = "Arial, sans-serif",
    fontWeight: string = "normal"
  ): number {
    const context = this.createTextMeasurementContext();
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  }

  /**
   * Calculate text wrapping for given constraints
   * @private
   */
  private calculateTextWrapping(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string = "Arial, sans-serif"
  ): { lines: string[]; totalWidth: number } {
    const context = this.createTextMeasurementContext();
    context.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    let maxLineWidth = 0;

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth <= maxWidth) {
        currentLine = testLine;
        maxLineWidth = Math.max(maxLineWidth, testWidth);
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
          maxLineWidth = Math.max(
            maxLineWidth,
            context.measureText(word).width
          );
        } else {
          lines.push(word);
          maxLineWidth = Math.max(
            maxLineWidth,
            context.measureText(word).width
          );
        }
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return { lines, totalWidth: maxLineWidth };
  }

  /**
   * Delegate calculation to appropriate specialized renderer
   * @private
   */
  private delegateCalculation(
    method: "calculateDynamicWidth" | "calculateDynamicHeight",
    node: any,
    nodeConfig: any
  ): number {
    switch (nodeConfig.type) {
      case "node-with-description":
        return this.nodeWithDescriptionRenderer[method](node, nodeConfig);
      case "collapsible-node":
        return this.collapsibleNodeRenderer[method](node, nodeConfig);
      case "image":
        return this.imageNodeRenderer[method](node, nodeConfig);
      default:
        return 0; // Will be handled by legacy calculation
    }
  }

  /**
   * Calculate dynamic width for nodes that auto-size based on content
   */
  public calculateDynamicNodeWidth(node: any, nodeConfig: any): number {
    // Delegate to specialized renderers for advanced node types
    if (
      ["node-with-description", "collapsible-node", "image"].includes(
        nodeConfig.type
      )
    ) {
      return this.delegateCalculation(
        "calculateDynamicWidth",
        node,
        nodeConfig
      );
    }

    // Legacy calculation for basic node types
    const maxNodeWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;
    const fontFamily = nodeConfig.fontFamily || "Arial, sans-serif";

    // Measure main text
    const textWidth = this.measureText(
      node.value || "",
      fontSize,
      fontFamily,
      "bold"
    );
    let maxRequiredWidth = textWidth;

    // Handle description if present
    if (node.description && node.description.trim()) {
      const { totalWidth } = this.calculateTextWrapping(
        node.description,
        maxNodeWidth - padding * 2,
        descriptionFontSize,
        fontFamily
      );
      maxRequiredWidth = Math.max(maxRequiredWidth, totalWidth);
    }

    // Calculate final width
    const minWidthRequired = maxRequiredWidth + padding * 2;
    return Math.max(nodeConfig.width || 0, minWidthRequired);
  }

  /**
   * Calculate dynamic height for nodes that auto-size based on content
   */
  public calculateDynamicNodeHeight(node: any, nodeConfig: any): number {
    // Delegate to specialized renderers for advanced node types
    if (
      ["node-with-description", "collapsible-node", "image"].includes(
        nodeConfig.type
      )
    ) {
      return this.delegateCalculation(
        "calculateDynamicHeight",
        node,
        nodeConfig
      );
    }

    // Legacy calculation for basic node types
    const lineHeight = NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;
    const descriptionMarginTop =
      nodeConfig.descriptionMarginTop || NODE_CONSTANTS.DESCRIPTION_MARGIN_TOP;
    const fontFamily = nodeConfig.fontFamily || "Arial, sans-serif";

    let totalRequiredHeight = fontSize; // Start with main text height

    // Handle description if present
    if (node.description && node.description.trim()) {
      const maxWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
      const availableWidth = maxWidth - padding * 2;

      const { lines } = this.calculateTextWrapping(
        node.description,
        availableWidth,
        descriptionFontSize,
        fontFamily
      );

      const descriptionHeight = lines.length * descriptionFontSize * lineHeight;
      totalRequiredHeight += descriptionMarginTop + descriptionHeight;
    }

    // Calculate final height with padding
    const minHeightRequired = totalRequiredHeight + padding * 2;
    return Math.max(nodeConfig.height || 0, minHeightRequired);
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

    // Create the main node shape based on type (this will set calculated dimensions for node-with-description)
    const shapeElement = this.createNodeShape(finalOptions);
    nodeElements.push(shapeElement);

    // Calculate bounds after shape creation to get calculated dimensions
    let bounds = {
      x: finalOptions.x,
      y: finalOptions.y,
      width:
        finalOptions.type === "node-with-description" ||
        finalOptions.type === "collapsible-node" ||
        finalOptions.type === "image"
          ? (finalOptions as any).calculatedWidth || finalOptions.width
          : finalOptions.width,
      height:
        finalOptions.type === "node-with-description" ||
        finalOptions.type === "collapsible-node" ||
        finalOptions.type === "image"
          ? (finalOptions as any).calculatedHeight || finalOptions.height
          : finalOptions.height,
    };

    // Add shadow if enabled - only for legacy node types that don't use dedicated renderers
    if (
      finalOptions.shadow &&
      finalOptions.type !== "rectangle" &&
      finalOptions.type !== "circle" &&
      finalOptions.type !== "image" &&
      finalOptions.type !== "node-with-description" &&
      finalOptions.type !== "collapsible-node"
    ) {
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

    // Add text if provided - only for legacy node types that don't use dedicated renderers
    if (
      finalOptions.text &&
      finalOptions.text.trim() &&
      finalOptions.type !== "rectangle" &&
      finalOptions.type !== "circle" &&
      finalOptions.type !== "image" &&
      finalOptions.type !== "node-with-description" &&
      finalOptions.type !== "collapsible-node"
    ) {
      const textElement = this.createText(finalOptions);
      nodeElements.push(textElement);
    }

    // Add all elements to SVG
    nodeElements.forEach((element) => {
      this.svg.appendChild(element);
    });

    const centerX = finalOptions.x + bounds.width / 2;
    const centerY = finalOptions.y + bounds.height / 2;

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
        return this.createRectangleUsingRenderer(options);
      case "circle":
        return this.createCircleUsingRenderer(options);
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
      case "node-with-description":
        return this.createNodeWithDescriptionUsingRenderer(options);
      case "collapsible-node":
        return this.createCollapsibleNodeUsingRenderer(options);
      case "image":
        return this.createImageNodeUsingRenderer(options);
      case "custom":
        return this.createCustomShape(options);
      default:
        return this.createRectangleUsingRenderer(options);
    }
  }

  /**
   * Create an image node using the dedicated ImageNodeRenderer
   */
  private createImageNodeUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    const result = this.imageNodeRenderer.render(options);
    // Store calculated dimensions for compatibility
    (options as any).calculatedWidth = result.bounds.width;
    (options as any).calculatedHeight = result.bounds.height;
    return result.element;
  }

  /**
   * Create a node-with-description using the dedicated NodeWithDescriptionRenderer
   */
  private createNodeWithDescriptionUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    const result = this.nodeWithDescriptionRenderer.render(options);
    // Store calculated dimensions for compatibility
    (options as any).calculatedWidth = result.bounds.width;
    (options as any).calculatedHeight = result.bounds.height;
    return result.element;
  }

  /**
   * Create a collapsible node using the dedicated CollapsibleNodeRenderer
   */
  private createCollapsibleNodeUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    const result = this.collapsibleNodeRenderer.render(options);
    // Store calculated dimensions for compatibility
    (options as any).calculatedWidth = result.bounds.width;
    (options as any).calculatedHeight = result.bounds.height;
    return result.element;
  }

  /**
   * Create a rectangle node using the dedicated RectangleNodeRenderer
   */
  private createRectangleUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    const result = this.rectangleNodeRenderer.render(options);
    return result.element;
  }

  /**
   * Create a circle node using the dedicated CircleNodeRenderer
   */
  private createCircleUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    const result = this.circleNodeRenderer.render(options);
    return result.element;
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
    for (let i = 0; i < NODE_CONSTANTS.STAR_POINTS; i++) {
      const angle =
        (i * 2 * Math.PI) / NODE_CONSTANTS.STAR_POINTS - Math.PI / 2; // Start from top
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
    for (let i = 0; i < NODE_CONSTANTS.CIRCLE_POINTS; i++) {
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

      // Apply transformation to position the path correctly
      path.setAttribute("transform", `translate(${options.x}, ${options.y})`);

      return path;
    }

    return this.createRectangleUsingRenderer(options);
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
    text.setAttribute("font-weight", "bold");
    text.setAttribute("fill", options.fontColor);
    text.setAttribute("stroke", "none");
    text.setAttribute("stroke-width", "0");
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
        tspan.setAttribute("stroke", "none");
        tspan.setAttribute("stroke-width", "0");
        tspan.textContent = line;
        text.appendChild(tspan);
      });
    }

    return text;
  }
}
