import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * NodeWithDescriptionRenderer handles rendering of nodes with description text
 * These nodes auto-size based on content and support text wrapping
 */
export class NodeWithDescriptionRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Calculate actual dimensions based on content
    const actualWidth = this.calculateWidth(options);
    const actualHeight = this.calculateHeight(options);

    // Update options with calculated dimensions
    const updatedOptions = {
      ...options,
      width: actualWidth,
      height: actualHeight,
    };

    // Create shadow if enabled
    const shadow = this.createShadow(updatedOptions);
    if (shadow) {
      group.appendChild(shadow);
    }

    // Create the rectangle
    const rect = this.createRectangleElement(updatedOptions);
    group.appendChild(rect);

    // Create text elements
    const textElements = this.createTextElements(updatedOptions);
    textElements.forEach((element) => group.appendChild(element));

    // Add to SVG
    this.svg.appendChild(group);

    return {
      element: group,
      bounds: {
        x: options.x,
        y: options.y,
        width: actualWidth,
        height: actualHeight,
      },
      centerX: options.x + actualWidth / 2,
      centerY: options.y + actualHeight / 2,
    };
  }

  /**
   * Calculate dynamic width based on content (matches original NodeDrawer logic)
   */
  public calculateDynamicWidth(node: any, nodeConfig: any): number {
    const maxNodeWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;

    // Create canvas for text measurement
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return maxNodeWidth; // Fallback to max width
    }

    // Measure main text
    context.font = `${fontSize}px ${
      nodeConfig.fontFamily || "Arial, sans-serif"
    }`;
    const textWidth = context.measureText(node.value || "").width;
    let maxRequiredWidth = textWidth;

    // Handle description if present
    if (node.description && node.description.trim()) {
      context.font = `${descriptionFontSize}px ${
        nodeConfig.fontFamily || "Arial, sans-serif"
      }`;

      // Calculate available width for description
      const availableWidth = maxNodeWidth - padding * 2;

      // Simple word wrapping to estimate width needed
      const words = node.description.split(" ");
      let currentLineWidth = 0;
      let maxLineWidth = 0;

      for (const word of words) {
        const wordWidth = context.measureText(word + " ").width;
        if (
          currentLineWidth + wordWidth > availableWidth &&
          currentLineWidth > 0
        ) {
          maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
          currentLineWidth = wordWidth;
        } else {
          currentLineWidth += wordWidth;
        }
      }
      maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
      maxRequiredWidth = Math.max(maxRequiredWidth, maxLineWidth);
    }

    // Calculate final width - use the maximum of configured width or required width
    // Don't cap at maxNodeWidth for dynamic nodes since they need to fit their content
    const minWidthRequired = maxRequiredWidth + padding * 2;
    const finalWidth = Math.min(
      Math.max(nodeConfig.width || 0, minWidthRequired),
      maxNodeWidth
    );
    return finalWidth;
  }

  /**
   * Calculate dynamic height based on content (matches original NodeDrawer logic)
   */
  public calculateDynamicHeight(node: any, nodeConfig: any): number {
    const lineHeight = NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;
    const descriptionMarginTop =
      nodeConfig.descriptionMarginTop || NODE_CONSTANTS.DESCRIPTION_MARGIN_TOP;

    let totalRequiredHeight = fontSize; // Start with main text height

    // Handle description if present
    if (node.description && node.description.trim()) {
      // Calculate available width for text wrapping
      const maxWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
      const availableWidth = maxWidth - padding * 2;

      // Use base class method to calculate lines
      const lines = this.calculateWrappedTextLines(
        node.description,
        availableWidth,
        descriptionFontSize,
        nodeConfig.fontFamily || "Arial, sans-serif"
      );

      // Calculate description height with proper spacing
      const descriptionSpacing = 12; // Same spacing as in text positioning
      const descriptionHeight = lines * descriptionFontSize * lineHeight;
      totalRequiredHeight += descriptionSpacing + descriptionHeight;
    }

    // Calculate final height with padding
    const minHeightRequired = totalRequiredHeight + padding * 2;
    return Math.max(nodeConfig.height || 0, minHeightRequired);
  }

  /**
   * Helper method to calculate width from options (adapter for render method)
   */
  private calculateWidth(options: Required<NodeOptions>): number {
    // Convert options to node-like object for dynamic calculation
    const node = {
      value: options.text,
      description: options.description,
    };

    const nodeConfig = {
      padding: options.padding,
      fontSize: options.fontSize,
      descriptionFontSize: options.descriptionFontSize,
      fontFamily: options.fontFamily,
      width: options.width,
    };

    return this.calculateDynamicWidth(node, nodeConfig);
  }

  /**
   * Helper method to calculate height from options (adapter for render method)
   */
  private calculateHeight(options: Required<NodeOptions>): number {
    // Convert options to node-like object for dynamic calculation
    const node = {
      value: options.text,
      description: options.description,
    };

    const nodeConfig = {
      padding: options.padding,
      fontSize: options.fontSize,
      descriptionFontSize: options.descriptionFontSize,
      descriptionMarginTop: options.descriptionMarginTop,
      fontFamily: options.fontFamily,
      height: options.height,
    };

    return this.calculateDynamicHeight(node, nodeConfig);
  }

  private createTextElements(options: Required<NodeOptions>): SVGElement[] {
    const elements: SVGElement[] = [];
    const centerX = options.x + options.width / 2;
    const padding = options.padding;

    // Create main text
    const mainText = document.createElementNS(SVG_NS, "text");
    mainText.setAttribute("x", centerX.toString());
    mainText.setAttribute(
      "y",
      (options.y + padding + options.fontSize).toString()
    );
    mainText.setAttribute("text-anchor", "middle");
    mainText.setAttribute("dominant-baseline", "middle");
    mainText.setAttribute("font-family", options.fontFamily);
    mainText.setAttribute("font-size", options.fontSize.toString());
    mainText.setAttribute("font-weight", "bold");
    mainText.setAttribute("fill", options.fontColor);
    mainText.setAttribute("stroke", "none");
    mainText.textContent = options.text;
    elements.push(mainText);

    // Create description text if present (only if width is sufficient)
    if (
      options.description &&
      options.description.trim() &&
      options.width >= NODE_CONSTANTS.MIN_WIDTH_FOR_DESCRIPTION
    ) {
      const maxTextWidth = options.width - padding * 2;

      // Create description using base class method
      if (true) {
        // Position text (center-aligned with proper spacing between title and description)
        const titleBottomY = options.y + padding + options.fontSize;
        const descriptionSpacing = 12; // Add more spacing between title and description
        const textStartY =
          titleBottomY + descriptionSpacing + options.descriptionFontSize;

        const centerX = options.x + options.width / 2;

        // Use base class method for text wrapping
        const descriptionElements = this.createWrappedDescriptionText(
          options.description,
          maxTextWidth,
          options.descriptionFontSize,
          options.fontFamily,
          centerX,
          textStartY,
          options.descriptionFontColor,
          NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT,
          "middle"
        );

        elements.push(...descriptionElements);
      }
    }

    return elements;
  }
}
