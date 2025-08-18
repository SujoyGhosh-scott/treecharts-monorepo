import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions } from "../types";
import { BaseNodeRenderer } from "./BaseNodeRenderer";
import { NodeRenderResult } from "./types";

/**
 * ImageNodeRenderer handles rendering of nodes with images and optional text
 * Follows the same pattern as other node renderers in the codebase
 */
export class ImageNodeRenderer extends BaseNodeRenderer {
  public render(options: Required<NodeOptions>): NodeRenderResult {
    const group = this.createGroup();

    // Calculate actual dimensions based on content and text position
    const layout = this.calculateLayout(options);

    // Update options with calculated dimensions
    const updatedOptions = {
      ...options,
      width: layout.totalWidth,
      height: layout.totalHeight,
    };

    // Create background container if needed
    if (updatedOptions.fill && updatedOptions.fill !== "none") {
      const background = this.createBackgroundContainer(updatedOptions, layout);
      group.appendChild(background);
    }

    // Create shadow if enabled
    const shadow = this.createShadow(updatedOptions);
    if (shadow) {
      group.appendChild(shadow);
    }

    // Create the image element
    if (options.imageUrl) {
      const imageElement = this.createImageElement(options, layout);
      group.appendChild(imageElement);
    }

    // Create text elements if present
    const textElements = this.createTextElements(options, layout);
    textElements.forEach((element) => group.appendChild(element));

    // Add to SVG
    this.svg.appendChild(group);

    return {
      element: group,
      bounds: {
        x: options.x,
        y: options.y,
        width: layout.totalWidth,
        height: layout.totalHeight,
      },
      centerX: options.x + layout.totalWidth / 2,
      centerY: options.y + layout.totalHeight / 2,
    };
  }

  /**
   * Calculate dynamic width based on content and text position
   */
  public calculateDynamicWidth(node: any, nodeConfig: any): number {
    const layout = this.calculateLayoutForNode(node, nodeConfig);
    return layout.totalWidth;
  }

  /**
   * Calculate dynamic height based on content and text position
   */
  public calculateDynamicHeight(node: any, nodeConfig: any): number {
    const layout = this.calculateLayoutForNode(node, nodeConfig);
    return layout.totalHeight;
  }

  /**
   * Calculate layout for a node and config (used by dynamic sizing)
   */
  private calculateLayoutForNode(node: any, nodeConfig: any) {
    const imageConfig = nodeConfig.imageConfig || {};
    const imageTitleConfig = nodeConfig.imageTitleConfig || {};
    const imageSubtitleConfig = nodeConfig.imageSubtitleConfig || {};
    const imageTextPositionConfig = nodeConfig.imageTextPositionConfig || {};

    const imageWidth =
      imageConfig.imageWidth || NODE_CONSTANTS.DEFAULT_IMAGE_WIDTH;
    const imageHeight =
      imageConfig.imageHeight || NODE_CONSTANTS.DEFAULT_IMAGE_HEIGHT;
    const textPosition = imageTextPositionConfig.position || "bottom";
    const textPadding =
      imageTextPositionConfig.padding || NODE_CONSTANTS.DEFAULT_TEXT_PADDING;
    const textSpacing =
      imageTextPositionConfig.spacing || NODE_CONSTANTS.DEFAULT_TEXT_SPACING;
    const imageMargin =
      nodeConfig.imageMargin || NODE_CONSTANTS.DEFAULT_IMAGE_MARGIN;

    const title = node.title || node.value || "";
    const subtitle = node.subtitle || node.description || "";
    const titleFontSize =
      imageTitleConfig.fontSize ||
      nodeConfig.fontSize ||
      NODE_CONSTANTS.DEFAULT_TITLE_FONT_SIZE;
    const subtitleFontSize =
      imageSubtitleConfig.fontSize || NODE_CONSTANTS.DEFAULT_SUBTITLE_FONT_SIZE;

    // Calculate text dimensions using canvas measurement
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    let maxTextWidth = 0;

    if (context && (title || subtitle)) {
      if (title) {
        context.font = `${titleFontSize}px ${nodeConfig.fontFamily || "Arial"}`;
        maxTextWidth = Math.max(maxTextWidth, context.measureText(title).width);
      }
      if (subtitle) {
        context.font = `${subtitleFontSize}px ${
          nodeConfig.fontFamily || "Arial"
        }`;
        maxTextWidth = Math.max(
          maxTextWidth,
          context.measureText(subtitle).width
        );
      }
    }

    // Calculate text height
    let textHeight = 0;
    if (title) {
      textHeight += titleFontSize * 1.2;
    }
    if (subtitle) {
      if (title) textHeight += textSpacing;
      textHeight += subtitleFontSize * 1.2;
    }

    // Calculate total dimensions based on text position
    let totalWidth, totalHeight;

    switch (textPosition) {
      case "left":
      case "right":
        totalWidth = Math.max(
          NODE_CONSTANTS.MIN_IMAGE_NODE_WIDTH,
          imageWidth + maxTextWidth + textPadding + imageMargin * 2
        );
        totalHeight = Math.max(
          NODE_CONSTANTS.MIN_IMAGE_NODE_HEIGHT,
          Math.max(imageHeight, textHeight) + imageMargin * 2
        );
        break;
      case "bottom":
      default:
        totalWidth = Math.max(
          NODE_CONSTANTS.MIN_IMAGE_NODE_WIDTH,
          Math.max(imageWidth, maxTextWidth) + imageMargin * 2
        );
        totalHeight = Math.max(
          NODE_CONSTANTS.MIN_IMAGE_NODE_HEIGHT,
          imageHeight +
            textHeight +
            (textHeight > 0 ? textPadding : 0) +
            imageMargin * 2
        );
        break;
    }

    return {
      totalWidth,
      totalHeight,
      imageWidth,
      imageHeight,
      textHeight,
      maxTextWidth,
    };
  }

  /**
   * Calculate layout dimensions and positions based on text position
   */
  private calculateLayout(options: Required<NodeOptions>) {
    const imageConfig = options.imageConfig || {};
    const imageTitleConfig = options.imageTitleConfig || {};
    const imageSubtitleConfig = options.imageSubtitleConfig || {};
    const imageTextPositionConfig = options.imageTextPositionConfig || {};

    const imageWidth =
      imageConfig.imageWidth || NODE_CONSTANTS.DEFAULT_IMAGE_WIDTH;
    const imageHeight =
      imageConfig.imageHeight || NODE_CONSTANTS.DEFAULT_IMAGE_HEIGHT;
    const textPosition = imageTextPositionConfig.position || "bottom";
    const textPadding =
      imageTextPositionConfig.padding || NODE_CONSTANTS.DEFAULT_TEXT_PADDING;
    const textSpacing =
      imageTextPositionConfig.spacing || NODE_CONSTANTS.DEFAULT_TEXT_SPACING;
    const imageMargin =
      options.imageMargin || NODE_CONSTANTS.DEFAULT_IMAGE_MARGIN;

    const title = options.title || options.text || "";
    const subtitle = options.subtitle || options.description || "";
    const titleFontSize =
      imageTitleConfig.fontSize ||
      options.fontSize ||
      NODE_CONSTANTS.DEFAULT_TITLE_FONT_SIZE;
    const subtitleFontSize =
      imageSubtitleConfig.fontSize || NODE_CONSTANTS.DEFAULT_SUBTITLE_FONT_SIZE;

    // Measure text dimensions
    const titleWidth = title
      ? this.measureText(title, titleFontSize, options.fontFamily)
      : 0;
    const subtitleWidth = subtitle
      ? this.measureText(subtitle, subtitleFontSize, options.fontFamily)
      : 0;
    const maxTextWidth = Math.max(titleWidth, subtitleWidth);

    const titleHeight = title ? titleFontSize * 1.2 : 0;
    const subtitleHeight = subtitle ? subtitleFontSize * 1.2 : 0;
    const totalTextHeight =
      titleHeight + (title && subtitle ? textSpacing : 0) + subtitleHeight;

    let totalWidth: number;
    let totalHeight: number;
    let imageX: number;
    let imageY: number;
    let textAreaX: number;
    let textAreaY: number;
    let textAreaWidth: number;

    switch (textPosition) {
      case "bottom":
        totalWidth = Math.max(imageWidth, maxTextWidth) + imageMargin * 2;
        totalHeight =
          imageHeight +
          totalTextHeight +
          imageMargin * 2 +
          (totalTextHeight > 0 ? textPadding : 0);
        imageX = imageMargin + (totalWidth - imageMargin * 2 - imageWidth) / 2;
        imageY = imageMargin;
        textAreaX = imageMargin;
        textAreaY = imageY + imageHeight + textPadding;
        textAreaWidth = totalWidth - imageMargin * 2;
        break;

      case "left":
        totalWidth =
          maxTextWidth +
          imageWidth +
          imageMargin * 2 +
          (maxTextWidth > 0 ? textPadding : 0);
        totalHeight = Math.max(imageHeight, totalTextHeight) + imageMargin * 2;
        imageX = totalWidth - imageMargin - imageWidth;
        imageY =
          imageMargin + (totalHeight - imageMargin * 2 - imageHeight) / 2;
        textAreaX = imageMargin;
        textAreaY =
          imageMargin + (totalHeight - imageMargin * 2 - totalTextHeight) / 2;
        textAreaWidth = maxTextWidth;
        break;

      case "right":
        totalWidth =
          imageWidth +
          maxTextWidth +
          imageMargin * 2 +
          (maxTextWidth > 0 ? textPadding : 0);
        totalHeight = Math.max(imageHeight, totalTextHeight) + imageMargin * 2;
        imageX = imageMargin;
        imageY =
          imageMargin + (totalHeight - imageMargin * 2 - imageHeight) / 2;
        textAreaX = imageX + imageWidth + textPadding;
        textAreaY =
          imageMargin + (totalHeight - imageMargin * 2 - totalTextHeight) / 2;
        textAreaWidth = maxTextWidth;
        break;

      default:
        totalWidth = Math.max(imageWidth, maxTextWidth) + imageMargin * 2;
        totalHeight =
          imageHeight +
          totalTextHeight +
          imageMargin * 2 +
          (totalTextHeight > 0 ? textPadding : 0);
        imageX = imageMargin + (totalWidth - imageMargin * 2 - imageWidth) / 2;
        imageY = imageMargin;
        textAreaX = imageMargin;
        textAreaY = imageY + imageHeight + textPadding;
        textAreaWidth = totalWidth - imageMargin * 2;
        break;
    }

    return {
      totalWidth,
      totalHeight,
      imageX,
      imageY,
      textAreaX,
      textAreaY,
      textAreaWidth,
      titleHeight,
      subtitleHeight,
      totalTextHeight,
      textSpacing,
    };
  }

  /**
   * Create background container for the entire node
   */
  private createBackgroundContainer(
    options: Required<NodeOptions>,
    layout: any
  ): SVGRectElement {
    const rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttribute("x", options.x.toString());
    rect.setAttribute("y", options.y.toString());
    rect.setAttribute("width", layout.totalWidth.toString());
    rect.setAttribute("height", layout.totalHeight.toString());
    rect.setAttribute("rx", options.borderRadius.toString());
    rect.setAttribute("ry", options.borderRadius.toString());

    // Apply gradient or solid fill
    const gradientUrl = this.createGradient(options);
    const fill = gradientUrl || options.fill;
    rect.setAttribute("fill", fill);

    this.applyCommonStyling(rect, options);

    return rect;
  }

  /**
   * Create the image element
   */
  private createImageElement(
    options: Required<NodeOptions>,
    layout: any
  ): SVGImageElement {
    const imageConfig = options.imageConfig || {};
    const imageElement = document.createElementNS(SVG_NS, "image");

    // Position the image
    imageElement.setAttribute("x", (options.x + layout.imageX).toString());
    imageElement.setAttribute("y", (options.y + layout.imageY).toString());
    imageElement.setAttribute(
      "width",
      (imageConfig.imageWidth || NODE_CONSTANTS.DEFAULT_IMAGE_WIDTH).toString()
    );
    imageElement.setAttribute(
      "height",
      (
        imageConfig.imageHeight || NODE_CONSTANTS.DEFAULT_IMAGE_HEIGHT
      ).toString()
    );
    imageElement.setAttribute("href", options.imageUrl || "");
    imageElement.setAttribute(
      "opacity",
      (
        imageConfig.imageOpacity || NODE_CONSTANTS.DEFAULT_IMAGE_OPACITY
      ).toString()
    );

    // Add image styling through a clipping path and background
    const borderRadius =
      imageConfig.imageBorderRadius ||
      NODE_CONSTANTS.DEFAULT_IMAGE_BORDER_RADIUS;
    const borderWidth =
      imageConfig.imageBorderWidth || NODE_CONSTANTS.DEFAULT_IMAGE_BORDER_WIDTH;

    if (borderRadius > 0) {
      imageElement.setAttribute("rx", borderRadius.toString());
      imageElement.setAttribute("ry", borderRadius.toString());
    }

    return imageElement;
  }

  /**
   * Create text elements (title and subtitle)
   */
  private createTextElements(
    options: Required<NodeOptions>,
    layout: any
  ): SVGElement[] {
    const elements: SVGElement[] = [];
    const imageTitleConfig = options.imageTitleConfig || {};
    const imageSubtitleConfig = options.imageSubtitleConfig || {};
    const imageTextPositionConfig = options.imageTextPositionConfig || {};

    const title = options.title || options.text || "";
    const subtitle = options.subtitle || options.description || "";
    const textPosition = imageTextPositionConfig.position || "bottom";

    if (!title && !subtitle) {
      return elements;
    }

    const textAnchor = textPosition === "bottom" ? "middle" : "start";
    const textX =
      textPosition === "bottom"
        ? options.x + layout.textAreaX + layout.textAreaWidth / 2
        : options.x + layout.textAreaX;

    let currentY = options.y + layout.textAreaY;

    // Create title
    if (title) {
      const titleElement = document.createElementNS(SVG_NS, "text");
      titleElement.setAttribute("x", textX.toString());
      titleElement.setAttribute(
        "y",
        (currentY + layout.titleHeight * 0.8).toString()
      );
      titleElement.setAttribute("text-anchor", textAnchor);
      titleElement.setAttribute("dominant-baseline", "text-top");
      titleElement.setAttribute(
        "font-size",
        (
          imageTitleConfig.fontSize || NODE_CONSTANTS.DEFAULT_TITLE_FONT_SIZE
        ).toString()
      );
      titleElement.setAttribute(
        "font-weight",
        imageTitleConfig.fontWeight || "bold"
      );
      titleElement.setAttribute(
        "fill",
        imageTitleConfig.fontColor || NODE_CONSTANTS.DEFAULT_TITLE_COLOR
      );
      titleElement.setAttribute("stroke", "none");
      titleElement.setAttribute("stroke-width", "0");
      titleElement.setAttribute(
        "font-family",
        options.fontFamily || "Arial, sans-serif"
      );
      titleElement.textContent = title;

      elements.push(titleElement);
      currentY += layout.titleHeight + layout.textSpacing;
    }

    // Create subtitle
    if (subtitle) {
      const subtitleElement = document.createElementNS(SVG_NS, "text");
      subtitleElement.setAttribute("x", textX.toString());
      subtitleElement.setAttribute(
        "y",
        (currentY + layout.subtitleHeight * 0.8).toString()
      );
      subtitleElement.setAttribute("text-anchor", textAnchor);
      subtitleElement.setAttribute("dominant-baseline", "text-top");
      subtitleElement.setAttribute(
        "font-size",
        (
          imageSubtitleConfig.fontSize ||
          NODE_CONSTANTS.DEFAULT_SUBTITLE_FONT_SIZE
        ).toString()
      );
      subtitleElement.setAttribute(
        "font-weight",
        imageSubtitleConfig.fontWeight || "normal"
      );
      subtitleElement.setAttribute(
        "fill",
        imageSubtitleConfig.fontColor || NODE_CONSTANTS.DEFAULT_SUBTITLE_COLOR
      );
      subtitleElement.setAttribute("stroke", "none");
      subtitleElement.setAttribute("stroke-width", "0");
      subtitleElement.setAttribute(
        "font-family",
        options.fontFamily || "Arial, sans-serif"
      );
      subtitleElement.textContent = subtitle;

      elements.push(subtitleElement);
    }

    return elements;
  }
}
