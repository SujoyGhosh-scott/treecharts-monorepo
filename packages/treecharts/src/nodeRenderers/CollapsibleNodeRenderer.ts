import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * CollapsibleNodeRenderer handles rendering of collapsible nodes with expand/collapse func    // Position chevron vertically centered with the title text
    // Calculate the actual visual center of the text for perfect alignment
    const textY = options.y + options.padding + options.fontSize;
    const textVisualCenter = textY - (options.fontSize * 0.1); // Adjust for text visual center
    const chevronY = textVisualCenter;
    const chevronSize = 8;ity
 * These nodes can show/hide description based on expanded state and include chevron icons
 */
export class CollapsibleNodeRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Calculate actual dimensions based on content and expanded state
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

    // Create chevron icon for expand/collapse
    const chevron = this.createChevronIcon(updatedOptions);
    group.appendChild(chevron);

    // Add click handler for expand/collapse
    this.addClickHandler(group, updatedOptions);

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
   * Calculate dynamic width based on content and collapsible state (matches original NodeDrawer logic)
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

    // Add space for chevron button
    maxRequiredWidth += NODE_CONSTANTS.SPACE_FOR_ARROW_BUTTON;

    // Handle description if present and expanded
    if (
      node.description &&
      node.description.trim() &&
      node.collapsibleState?.expanded
    ) {
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

    // Calculate final width
    const minWidthRequired = maxRequiredWidth + padding * 2;
    const finalWidth = Math.min(
      Math.max(nodeConfig.width || 0, minWidthRequired),
      maxNodeWidth
    );
    return finalWidth;
  }

  /**
   * Calculate dynamic height based on content and collapsible state (matches original NodeDrawer logic)
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

    // Handle description if present and expanded
    if (
      node.description &&
      node.description.trim() &&
      node.collapsibleState?.expanded
    ) {
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
    // Add extra padding at bottom when expanded for better visual spacing
    const bottomPadding = node.collapsibleState?.expanded
      ? padding * 2
      : padding;
    const minHeightRequired = totalRequiredHeight + padding + bottomPadding;
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
      collapsibleState: { expanded: options.expanded },
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
      collapsibleState: { expanded: options.expanded },
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
    const padding = options.padding;

    // Calculate text positioning (accounting for chevron space)
    const chevronSpace = NODE_CONSTANTS.SPACE_FOR_ARROW_BUTTON;
    const textCenterX = options.x + (options.width - chevronSpace) / 2;

    // Create main text
    const mainText = document.createElementNS(SVG_NS, "text");
    mainText.setAttribute("x", textCenterX.toString());
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
    mainText.setAttribute("stroke-width", "0");
    mainText.textContent = options.text;
    elements.push(mainText);

    // Create description text if present and expanded (only if width is sufficient)
    if (
      options.description &&
      options.description.trim() &&
      options.expanded &&
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

  private createChevronIcon(options: Required<NodeOptions>): SVGGElement {
    const chevronGroup = this.createGroup();
    chevronGroup.style.outline = "none";

    // Position chevron with proper padding from the edge
    const chevronPadding = 8; // More padding from the edge
    const chevronX = options.x + options.width - chevronPadding - 6; // 6 is half of chevronSize for centering

    // Position chevron vertically centered with the title text
    // The title text is positioned with dominant-baseline="middle" at y = options.y + options.padding + options.fontSize
    // Adjust for visual center by moving slightly up from the mathematical baseline
    const titleTextCenterY = options.y + options.padding + options.fontSize;
    const textVisualCenter = titleTextCenterY - options.fontSize * 0.1;
    const chevronY = textVisualCenter;
    const chevronSize = 8;

    // Create chevron path based on expanded state
    const chevronPath = document.createElementNS(SVG_NS, "path");

    if (options.expanded) {
      // Up chevron (expanded state) - pointing up when expanded
      const pathData = `M ${chevronX - chevronSize / 2} ${
        chevronY + chevronSize / 4
      } 
                       L ${chevronX} ${chevronY - chevronSize / 4} 
                       L ${chevronX + chevronSize / 2} ${
        chevronY + chevronSize / 4
      }`;
      chevronPath.setAttribute("d", pathData);
    } else {
      // Down chevron (collapsed state) - pointing down when collapsed
      const pathData = `M ${chevronX - chevronSize / 2} ${
        chevronY - chevronSize / 4
      } 
                       L ${chevronX} ${chevronY + chevronSize / 4} 
                       L ${chevronX + chevronSize / 2} ${
        chevronY - chevronSize / 4
      }`;
      chevronPath.setAttribute("d", pathData);
    }

    chevronPath.setAttribute("fill", "none");
    chevronPath.setAttribute("stroke", options.fontColor);
    chevronPath.setAttribute("stroke-width", "2");
    chevronPath.setAttribute("stroke-linecap", "round");
    chevronPath.setAttribute("stroke-linejoin", "round");

    // Add clickable area for better UX - positioned around the chevron with proper padding
    const clickArea = document.createElementNS(SVG_NS, "rect");
    const clickAreaSize = 20; // Make it a bit larger for easier clicking
    clickArea.setAttribute("x", (chevronX - clickAreaSize / 2).toString());
    clickArea.setAttribute("y", (chevronY - clickAreaSize / 2).toString());
    clickArea.setAttribute("width", clickAreaSize.toString());
    clickArea.setAttribute("height", clickAreaSize.toString());
    clickArea.setAttribute("fill", "transparent");
    clickArea.setAttribute("stroke", "none");
    clickArea.setAttribute("outline", "none");
    clickArea.setAttribute("cursor", "pointer");
    clickArea.style.outline = "none";
    clickArea.style.border = "none";

    chevronGroup.appendChild(clickArea);
    chevronGroup.appendChild(chevronPath);

    return chevronGroup;
  }

  private addClickHandler(
    group: SVGGElement,
    options: Required<NodeOptions>
  ): void {
    // Find the chevron area for click handling
    const clickArea = group.querySelector('rect[fill="transparent"]');
    if (clickArea && options.onToggleExpand) {
      clickArea.addEventListener("click", (event) => {
        event.stopPropagation();
        options.onToggleExpand(!options.expanded);
      });
    }
  }
}
