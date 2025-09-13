import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions, Point } from "../types";
import {
  ImageNodeRenderer,
  NodeWithDescriptionRenderer,
  CollapsibleNodeRenderer,
  RectangleNodeRenderer,
  ShapeNodeRenderer,
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
  private shapeNodeRenderer: ShapeNodeRenderer;
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
    this.shapeNodeRenderer = new ShapeNodeRenderer(svg);
  }

  /**
   * Measure text width using BaseNodeRenderer utilities
   * @private
   */
  private measureText(
    text: string,
    fontSize: number,
    fontFamily: string = "Arial, sans-serif"
  ): number {
    return this.rectangleNodeRenderer.measureText(text, fontSize, fontFamily);
  }

  /**
   * Calculate text lines using BaseNodeRenderer utilities
   * @private
   */
  private calculateTextLines(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string = "Arial, sans-serif"
  ): string[] {
    return this.rectangleNodeRenderer.calculateTextLines(
      text,
      maxWidth,
      fontSize,
      fontFamily
    );
  }

  /**
   * Calculate text wrapping with line width information
   * @private
   */
  private calculateTextWrapping(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string = "Arial, sans-serif"
  ): { lines: string[]; totalWidth: number } {
    const lines = this.calculateTextLines(text, maxWidth, fontSize, fontFamily);

    // Calculate the maximum line width
    let maxLineWidth = 0;
    for (const line of lines) {
      const lineWidth = this.measureText(line, fontSize, fontFamily);
      maxLineWidth = Math.max(maxLineWidth, lineWidth);
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
    const textWidth = this.measureText(node.value || "", fontSize, fontFamily);
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
    const typesWithDedicatedRenderers = [
      "rectangle",
      "circle",
      "ellipse",
      "diamond",
      "hexagon",
      "triangle",
      "pentagon",
      "octagon",
      "star",
      "custom",
      "image",
      "node-with-description",
      "collapsible-node",
    ];

    if (
      finalOptions.text &&
      finalOptions.text.trim() &&
      !typesWithDedicatedRenderers.includes(finalOptions.type)
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
    const shapeTypes = [
      "ellipse",
      "diamond",
      "hexagon",
      "triangle",
      "pentagon",
      "octagon",
      "star",
      "custom",
    ];

    if (options.type === "rectangle") {
      return this.createRectangleUsingRenderer(options);
    } else if (options.type === "circle") {
      return this.createCircleUsingRenderer(options);
    } else if (shapeTypes.includes(options.type)) {
      return this.createShapeUsingRenderer(options);
    } else if (options.type === "node-with-description") {
      return this.createNodeWithDescriptionUsingRenderer(options);
    } else if (options.type === "collapsible-node") {
      return this.createCollapsibleNodeUsingRenderer(options);
    } else if (options.type === "image") {
      return this.createImageNodeUsingRenderer(options);
    } else {
      // Default to rectangle for unknown types
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
   * Create a circle node using the ShapeNodeRenderer
   */
  private createCircleUsingRenderer(
    options: Required<NodeOptions>
  ): SVGElement {
    // Use shape renderer with circle type
    const shapeOptions = {
      ...options,
      type: "circle" as const,
    };
    const result = this.shapeNodeRenderer.render(shapeOptions);
    return result.element;
  }

  /**
   * Create a shape node using the dedicated ShapeNodeRenderer
   */
  private createShapeUsingRenderer(options: Required<NodeOptions>): SVGElement {
    const result = this.shapeNodeRenderer.render(options);
    return result.element;
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
