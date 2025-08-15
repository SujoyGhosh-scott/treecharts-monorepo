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
    description: "",
    fontSize: 14,
    fontColor: "black",
    fontFamily: "Arial, sans-serif",
    textAnchor: "middle",
    padding: 5,
    descriptionFontSize: 11,
    descriptionFontColor: "#666666",
    descriptionMarginTop: 4,
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
    collapsible: false,
    expanded: false,
    onToggleExpand: () => {},
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

    // Create the main node shape based on type (this will set calculated dimensions for node-with-description)
    const shapeElement = this.createNodeShape(finalOptions);
    nodeElements.push(shapeElement);

    // Calculate bounds after shape creation to get calculated dimensions
    let bounds = {
      x: finalOptions.x,
      y: finalOptions.y,
      width:
        finalOptions.type === "node-with-description" ||
        finalOptions.type === "collapsible-node"
          ? (finalOptions as any).calculatedWidth || finalOptions.width
          : finalOptions.width,
      height:
        finalOptions.type === "node-with-description" ||
        finalOptions.type === "collapsible-node"
          ? (finalOptions as any).calculatedHeight || finalOptions.height
          : finalOptions.height,
    };

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

    // Add text if provided - special handling for node-with-description and collapsible-node
    if (finalOptions.text && finalOptions.text.trim()) {
      if (finalOptions.type === "node-with-description") {
        const textElements = this.createNodeWithDescriptionText(finalOptions);
        nodeElements.push(...textElements);
      } else if (finalOptions.type === "collapsible-node") {
        const textElements = this.createCollapsibleNodeText(finalOptions);
        nodeElements.push(...textElements);
      } else {
        const textElement = this.createText(finalOptions);
        nodeElements.push(textElement);
      }
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
      case "node-with-description":
        return this.createNodeWithDescription(options);
      case "collapsible-node":
        return this.createCollapsibleNode(options);
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
   * Create a node with description - a rectangle that auto-sizes based on content
   */
  private createNodeWithDescription(
    options: Required<NodeOptions>
  ): SVGRectElement {
    const maxNodeWidth = 200; // Maximum width for the node
    const lineHeight = 1.2; // Line height multiplier

    // Calculate width based on text content with wrapping
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    let finalWidth = options.width;
    let finalHeight = options.height;

    if (context) {
      // Measure main text
      context.font = `bold ${options.fontSize}px ${options.fontFamily}`;
      const textWidth = context.measureText(options.text).width;

      let totalRequiredHeight = options.fontSize; // Start with main text height
      let maxRequiredWidth = textWidth;

      // Handle description wrapping if present
      let descriptionLines: string[] = [];
      if (options.description && options.description.trim()) {
        context.font = `${options.descriptionFontSize}px ${options.fontFamily}`;

        // Calculate available width for description (max width minus padding)
        const availableWidth = maxNodeWidth - options.padding * 2;

        // Wrap description text
        descriptionLines = this.wrapText(
          context,
          options.description,
          availableWidth
        );

        // Calculate description height
        const descriptionHeight =
          descriptionLines.length * options.descriptionFontSize * lineHeight;
        totalRequiredHeight += options.descriptionMarginTop + descriptionHeight;

        // Calculate maximum line width for description
        const maxDescLineWidth = Math.max(
          ...descriptionLines.map((line) => context.measureText(line).width)
        );
        maxRequiredWidth = Math.max(maxRequiredWidth, maxDescLineWidth);
      }

      // Calculate final dimensions with constraints
      const minWidthRequired = maxRequiredWidth + options.padding * 2;
      finalWidth = Math.min(
        Math.max(options.width, minWidthRequired),
        maxNodeWidth
      );

      const minHeightRequired = totalRequiredHeight + options.padding * 2;
      finalHeight = Math.max(options.height, minHeightRequired);

      // Store calculated values and wrapped lines
      (options as any).calculatedWidth = finalWidth;
      (options as any).calculatedHeight = finalHeight;
      (options as any).descriptionLines = descriptionLines;
    }

    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", options.x.toString());
    rect.setAttribute("y", options.y.toString());
    rect.setAttribute("width", finalWidth.toString());
    rect.setAttribute("height", finalHeight.toString());

    if (options.borderRadius > 0) {
      rect.setAttribute("rx", options.borderRadius.toString());
      rect.setAttribute("ry", options.borderRadius.toString());
    }

    return rect;
  }

  /**
   * Create a collapsible node - similar to node-with-description but with expand/collapse functionality
   */
  private createCollapsibleNode(
    options: Required<NodeOptions>
  ): SVGRectElement {
    const maxNodeWidth = 200; // Maximum width for the node
    const lineHeight = 1.2; // Line height multiplier

    // Calculate width based on text content with wrapping
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    let finalWidth = options.width;
    let finalHeight = options.height;

    if (context) {
      // Measure main text (title)
      context.font = `bold ${options.fontSize}px ${options.fontFamily}`;
      const textWidth = context.measureText(options.text).width;

      let totalRequiredHeight = options.fontSize; // Just title height, we'll add padding later
      let maxRequiredWidth = textWidth + 20; // Add space for arrow button

      // Always calculate description width for consistent node width
      let descriptionLines: string[] = [];
      if (options.description && options.description.trim()) {
        context.font = `${options.descriptionFontSize}px ${options.fontFamily}`;

        // Calculate available width for description (max width minus padding)
        const availableWidth = maxNodeWidth - options.padding * 2;

        // Wrap description text
        descriptionLines = this.wrapText(
          context,
          options.description,
          availableWidth
        );

        // Calculate maximum line width for description
        const maxDescLineWidth = Math.max(
          ...descriptionLines.map((line) => context.measureText(line).width)
        );
        maxRequiredWidth = Math.max(maxRequiredWidth, maxDescLineWidth);

        // Only add height if expanded
        if (options.expanded) {
          const descriptionHeight =
            descriptionLines.length * options.descriptionFontSize * lineHeight;
          // Add proper spacing: gap between title and description + description height + bottom padding
          totalRequiredHeight +=
            options.padding + // Gap between title and description
            descriptionHeight +
            options.padding; // Bottom padding
        }
      }

      // Calculate final dimensions with constraints
      const minWidthRequired = maxRequiredWidth + options.padding * 2;
      finalWidth = Math.min(
        Math.max(options.width, minWidthRequired),
        maxNodeWidth
      );

      const minHeightRequired = totalRequiredHeight + options.padding * 2;
      finalHeight = Math.max(options.height, minHeightRequired);

      // Store calculated values and wrapped lines
      (options as any).calculatedWidth = finalWidth;
      (options as any).calculatedHeight = finalHeight;
      (options as any).descriptionLines = descriptionLines;
    }

    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", options.x.toString());
    rect.setAttribute("y", options.y.toString());
    rect.setAttribute("width", finalWidth.toString());
    rect.setAttribute("height", finalHeight.toString());

    if (options.borderRadius > 0) {
      rect.setAttribute("rx", options.borderRadius.toString());
      rect.setAttribute("ry", options.borderRadius.toString());
    }

    return rect;
  }

  /**
   * Helper method to wrap text to fit within a given width
   */
  private wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = context.measureText(currentLine + " " + word).width;

      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    return lines;
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
   * Create text elements for node with description
   */
  private createNodeWithDescriptionText(
    options: Required<NodeOptions>
  ): SVGTextElement[] {
    const elements: SVGTextElement[] = [];
    const lineHeight = 1.2;

    // Use calculated dimensions if available
    const nodeWidth = (options as any).calculatedWidth || options.width;
    const nodeHeight = (options as any).calculatedHeight || options.height;
    const centerX = options.x + nodeWidth / 2;
    const descriptionLines = (options as any).descriptionLines || [];

    // Create main text element (bold)
    const mainText = document.createElementNS(SVG_NS, "text");
    mainText.setAttribute("x", centerX.toString());
    mainText.setAttribute("text-anchor", options.textAnchor);
    mainText.setAttribute("font-size", options.fontSize.toString());
    mainText.setAttribute("font-family", options.fontFamily);
    mainText.setAttribute("fill", options.fontColor);
    mainText.setAttribute("font-weight", "bold");
    mainText.textContent = options.text;
    elements.push(mainText);

    // Create description text elements for each wrapped line
    if (descriptionLines.length > 0) {
      descriptionLines.forEach((line: string, index: number) => {
        const descriptionText = document.createElementNS(SVG_NS, "text");
        descriptionText.setAttribute("x", centerX.toString());
        descriptionText.setAttribute("text-anchor", options.textAnchor);
        descriptionText.setAttribute(
          "font-size",
          options.descriptionFontSize.toString()
        );
        descriptionText.setAttribute("font-family", options.fontFamily);
        descriptionText.setAttribute("fill", options.descriptionFontColor);
        descriptionText.textContent = line;
        elements.push(descriptionText);
      });
    }

    // Position all text elements
    if (elements.length === 1) {
      // Only main text - center it
      const centerY = options.y + nodeHeight / 2;
      mainText.setAttribute("y", centerY.toString());
      mainText.setAttribute("dominant-baseline", "central");
    } else {
      // Main text and description lines - position them with proper spacing
      const totalDescriptionHeight =
        descriptionLines.length * options.descriptionFontSize * lineHeight;
      const totalTextHeight =
        options.fontSize +
        options.descriptionMarginTop +
        totalDescriptionHeight;

      // Position main text
      const mainTextY =
        options.y + (nodeHeight - totalTextHeight) / 2 + options.fontSize;
      mainText.setAttribute("y", mainTextY.toString());
      mainText.setAttribute("dominant-baseline", "text-after-edge");

      // Position description lines
      descriptionLines.forEach((line: string, index: number) => {
        const descriptionY =
          mainTextY +
          options.descriptionMarginTop +
          (index + 1) * options.descriptionFontSize * lineHeight;
        elements[index + 1].setAttribute("y", descriptionY.toString());
        elements[index + 1].setAttribute(
          "dominant-baseline",
          "text-after-edge"
        );
      });
    }

    return elements;
  }

  /**
   * Create text elements for collapsible node with expand/collapse button
   */
  private createCollapsibleNodeText(
    options: Required<NodeOptions>
  ): SVGElement[] {
    const elements: SVGElement[] = [];

    // Use calculated dimensions if available
    const nodeWidth = (options as any).calculatedWidth || options.width;
    const nodeHeight = (options as any).calculatedHeight || options.height;
    const buttonWidth = 16; // Smaller button for arrow
    const titleHeight = options.fontSize;

    // Create main text element (bold) - positioned first
    const mainText = document.createElementNS(SVG_NS, "text");
    const textStartX = options.x + options.padding;
    // Keep title in fixed position with proper padding from top
    const titleY = options.y + options.padding + titleHeight;
    mainText.setAttribute("x", textStartX.toString());
    mainText.setAttribute("y", titleY.toString());
    mainText.setAttribute("text-anchor", "start");
    mainText.setAttribute("font-size", options.fontSize.toString());
    mainText.setAttribute("font-family", options.fontFamily);
    mainText.setAttribute("fill", options.fontColor);
    mainText.setAttribute("font-weight", "bold");
    mainText.setAttribute("dominant-baseline", "alphabetic"); // Change to alphabetic for proper baseline
    mainText.textContent = options.text;
    elements.push(mainText);

    // Create expand/collapse button on the right side, aligned with title
    const buttonGroup = document.createElementNS(SVG_NS, "g");
    buttonGroup.setAttribute("cursor", "pointer");

    // Position button on the right side, aligned with title vertically
    const buttonX = options.x + nodeWidth - options.padding - buttonWidth;
    const buttonCenterY = titleY - titleHeight / 2; // Align with title center

    // Button background (circular)
    const buttonCircle = document.createElementNS(SVG_NS, "circle");
    const buttonCenterX = buttonX + buttonWidth / 2;
    buttonCircle.setAttribute("cx", buttonCenterX.toString());
    buttonCircle.setAttribute("cy", buttonCenterY.toString());
    buttonCircle.setAttribute("r", (buttonWidth / 2).toString());
    buttonCircle.setAttribute("fill", "#f0f0f0");
    buttonCircle.setAttribute("stroke", "#ccc");
    buttonCircle.setAttribute("stroke-width", "1");
    buttonGroup.appendChild(buttonCircle);

    // Button symbol (arrow)
    const buttonSymbol = document.createElementNS(SVG_NS, "text");
    buttonSymbol.setAttribute("x", buttonCenterX.toString());
    buttonSymbol.setAttribute("y", buttonCenterY.toString());
    buttonSymbol.setAttribute("text-anchor", "middle");
    buttonSymbol.setAttribute("dominant-baseline", "central");
    buttonSymbol.setAttribute("font-size", "10");
    buttonSymbol.setAttribute("font-family", "Arial, sans-serif");
    buttonSymbol.setAttribute("fill", "#666");
    // Use down arrow when collapsed, up arrow when expanded
    buttonSymbol.textContent = options.expanded ? "▲" : "▼";
    buttonGroup.appendChild(buttonSymbol);

    // Add click handler
    buttonGroup.addEventListener("click", (e) => {
      e.stopPropagation();
      if (options.onToggleExpand) {
        options.onToggleExpand(!options.expanded);
      }
    });

    elements.push(buttonGroup);

    // Create description text elements if expanded and description exists
    const descriptionLines = (options as any).descriptionLines || [];
    if (options.expanded && descriptionLines.length > 0) {
      // Start description with proper spacing below title
      // Title Y position + some spacing for the gap
      let currentY = titleY + options.padding + options.descriptionFontSize;

      descriptionLines.forEach((line: string, index: number) => {
        const descriptionText = document.createElementNS(SVG_NS, "text");
        descriptionText.setAttribute("x", textStartX.toString());
        descriptionText.setAttribute("y", currentY.toString());
        descriptionText.setAttribute("text-anchor", "start");
        descriptionText.setAttribute(
          "font-size",
          options.descriptionFontSize.toString()
        );
        descriptionText.setAttribute("font-family", options.fontFamily);
        descriptionText.setAttribute("fill", options.descriptionFontColor);
        descriptionText.setAttribute("dominant-baseline", "alphabetic");
        descriptionText.textContent = line;
        elements.push(descriptionText);

        // Move to next line
        currentY += options.descriptionFontSize * 1.2;
      });
    }

    return elements;
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
