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
    const fontFamily = nodeConfig.fontFamily || "Arial, sans-serif";

    // Measure main text using inherited method
    const textWidth = this.measureText(node.value || "", fontSize, fontFamily);
    let maxRequiredWidth = textWidth;

    // Handle description if present
    if (node.description && node.description.trim()) {
      // Calculate available width for description
      const availableWidth = maxNodeWidth - padding * 2;

      // Use inherited method for text line calculation
      const lines = this.calculateTextLines(
        node.description,
        availableWidth,
        descriptionFontSize,
        fontFamily
      );

      // Find the maximum line width
      let maxLineWidth = 0;
      for (const line of lines) {
        const lineWidth = this.measureText(
          line,
          descriptionFontSize,
          fontFamily
        );
        maxLineWidth = Math.max(maxLineWidth, lineWidth);
      }

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

    // Calculate available width for text wrapping
    const maxWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
    const availableWidth = maxWidth - padding * 2;

    // Calculate wrapped title height
    const titleHeight = this.calculateWrappedTitleHeight(
      node.value || "",
      availableWidth,
      fontSize,
      nodeConfig.fontFamily || "Arial, sans-serif",
      1.2
    );

    let totalRequiredHeight = titleHeight; // Start with wrapped title height

    // Handle description if present
    if (node.description && node.description.trim()) {
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

    // Calculate available width for title text
    const maxTitleWidth = options.width - padding * 2;

    // Create wrapped title text
    const titleStartY = options.y + padding + options.fontSize;
    const titleElements = this.createAutoWrappedText(
      options.text,
      maxTitleWidth,
      options.fontSize,
      options.fontFamily,
      centerX,
      titleStartY,
      options.fontColor,
      1.2,
      "middle",
      "bold",
      "alphabetic"
    );
    elements.push(...titleElements);

    // Calculate actual height used by title
    const titleHeight = this.calculateWrappedTitleHeight(
      options.text,
      maxTitleWidth,
      options.fontSize,
      options.fontFamily,
      1.2
    );

    // Create description text if present (only if width is sufficient)
    if (
      options.description &&
      options.description.trim() &&
      options.width >= NODE_CONSTANTS.MIN_WIDTH_FOR_DESCRIPTION
    ) {
      const maxTextWidth = options.width - padding * 2;

      // Position description after the wrapped title
      const titleBottomY = options.y + padding + titleHeight;
      const descriptionSpacing = 12; // Add more spacing between title and description
      const textStartY =
        titleBottomY + descriptionSpacing + options.descriptionFontSize;

      const centerX = options.x + options.width / 2;

      // Use base class method for text wrapping
      const descriptionElements = this.createAutoWrappedText(
        options.description,
        maxTextWidth,
        options.descriptionFontSize,
        options.fontFamily,
        centerX,
        textStartY,
        options.descriptionFontColor,
        NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT,
        "middle",
        "normal",
        "alphabetic"
      );

      elements.push(...descriptionElements);
    }

    return elements;
  }
}
