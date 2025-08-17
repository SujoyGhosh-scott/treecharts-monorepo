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

    const imageWidth = imageConfig.imageWidth || 100;
    const imageHeight = imageConfig.imageHeight || 100;
    const textPosition = imageTextPositionConfig.position || "bottom";
    const textPadding = imageTextPositionConfig.padding || 8;
    const textSpacing = imageTextPositionConfig.spacing || 4;
    const imageMargin = nodeConfig.imageMargin || 8;

    const title = node.title || node.value || "";
    const subtitle = node.subtitle || node.description || "";
    const titleFontSize =
      imageTitleConfig.fontSize ||
      nodeConfig.fontSize ||
      NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const subtitleFontSize =
      imageSubtitleConfig.fontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;
    const fontFamily = nodeConfig.fontFamily || "Arial, sans-serif";

    return this.calculateLayoutDimensions(
      imageWidth,
      imageHeight,
      textPosition,
      textPadding,
      textSpacing,
      imageMargin,
      title,
      subtitle,
      titleFontSize,
      subtitleFontSize,
      fontFamily
    );
  }

  /**
   * Calculate layout dimensions and positions based on text position
   */
  private calculateLayout(options: Required<NodeOptions>) {
    const imageConfig = options.imageConfig || {};
    const imageTitleConfig = options.imageTitleConfig || {};
    const imageSubtitleConfig = options.imageSubtitleConfig || {};
    const imageTextPositionConfig = options.imageTextPositionConfig || {};

    const imageWidth = imageConfig.imageWidth || 100;
    const imageHeight = imageConfig.imageHeight || 100;
    const textPosition = imageTextPositionConfig.position || "bottom";
    const textPadding = imageTextPositionConfig.padding || 8;
    const textSpacing = imageTextPositionConfig.spacing || 4;
    const imageMargin = options.imageMargin || 8;

    const title = options.title || options.text || "";
    const subtitle = options.subtitle || options.description || "";
    const titleFontSize = imageTitleConfig.fontSize || options.fontSize;
    const subtitleFontSize =
      imageSubtitleConfig.fontSize || options.descriptionFontSize;

    return this.calculateLayoutDimensions(
      imageWidth,
      imageHeight,
      textPosition,
      textPadding,
      textSpacing,
      imageMargin,
      title,
      subtitle,
      titleFontSize,
      subtitleFontSize,
      options.fontFamily
    );
  }

  /**
   * Core layout calculation logic
   */
  private calculateLayoutDimensions(
    imageWidth: number,
    imageHeight: number,
    textPosition: string,
    textPadding: number,
    textSpacing: number,
    imageMargin: number,
    title: string,
    subtitle: string,
    titleFontSize: number,
    subtitleFontSize: number,
    fontFamily: string
  ) {
    // Measure text dimensions
    const titleWidth = title
      ? this.measureText(title, titleFontSize, fontFamily)
      : 0;
    const subtitleWidth = subtitle
      ? this.measureText(subtitle, subtitleFontSize, fontFamily)
      : 0;
    const maxTextWidth = Math.max(titleWidth, subtitleWidth);

    const titleHeight = title ? titleFontSize : 0;
    const subtitleHeight = subtitle ? subtitleFontSize : 0;
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
      (imageConfig.imageWidth || 100).toString()
    );
    imageElement.setAttribute(
      "height",
      (imageConfig.imageHeight || 100).toString()
    );
    imageElement.setAttribute("href", options.imageUrl || "");
    imageElement.setAttribute(
      "opacity",
      (imageConfig.imageOpacity || 1).toString()
    );

    // Add image styling through a clipping path and background
    const borderRadius = imageConfig.imageBorderRadius || 0;
    const borderWidth = imageConfig.imageBorderWidth || 0;

    if (borderRadius > 0 || borderWidth > 0) {
      const clipPathId = `image-clip-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Create defs if not exists
      let defs = this.svg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS(SVG_NS, "defs");
        this.svg.appendChild(defs);
      }

      // Create clip path for rounded corners
      const clipPath = document.createElementNS(SVG_NS, "clipPath");
      clipPath.setAttribute("id", clipPathId);

      const clipRect = document.createElementNS(SVG_NS, "rect");
      clipRect.setAttribute("x", (options.x + layout.imageX).toString());
      clipRect.setAttribute("y", (options.y + layout.imageY).toString());
      clipRect.setAttribute(
        "width",
        (imageConfig.imageWidth || 100).toString()
      );
      clipRect.setAttribute(
        "height",
        (imageConfig.imageHeight || 100).toString()
      );
      clipRect.setAttribute("rx", borderRadius.toString());
      clipRect.setAttribute("ry", borderRadius.toString());

      clipPath.appendChild(clipRect);
      defs.appendChild(clipPath);

      imageElement.setAttribute("clip-path", `url(#${clipPathId})`);

      // Add border if specified
      if (borderWidth > 0) {
        const borderRect = document.createElementNS(SVG_NS, "rect");
        borderRect.setAttribute("x", (options.x + layout.imageX).toString());
        borderRect.setAttribute("y", (options.y + layout.imageY).toString());
        borderRect.setAttribute(
          "width",
          (imageConfig.imageWidth || 100).toString()
        );
        borderRect.setAttribute(
          "height",
          (imageConfig.imageHeight || 100).toString()
        );
        borderRect.setAttribute("rx", borderRadius.toString());
        borderRect.setAttribute("ry", borderRadius.toString());
        borderRect.setAttribute("fill", "none");
        borderRect.setAttribute(
          "stroke",
          imageConfig.imageBorderColor || "#333333"
        );
        borderRect.setAttribute("stroke-width", borderWidth.toString());

        // Add border after image
        setTimeout(() => {
          if (imageElement.parentNode) {
            imageElement.parentNode.appendChild(borderRect);
          }
        }, 0);
      }
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
      titleElement.setAttribute("dominant-baseline", "baseline");
      titleElement.setAttribute("font-family", options.fontFamily);
      titleElement.setAttribute(
        "font-size",
        (imageTitleConfig.fontSize || options.fontSize).toString()
      );
      titleElement.setAttribute(
        "font-weight",
        imageTitleConfig.fontWeight || "bold"
      );
      titleElement.setAttribute(
        "fill",
        imageTitleConfig.fontColor || options.fontColor
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
        (
          currentY +
          (imageSubtitleConfig.fontSize || options.descriptionFontSize) * 0.8
        ).toString()
      );
      subtitleElement.setAttribute("text-anchor", textAnchor);
      subtitleElement.setAttribute("dominant-baseline", "baseline");
      subtitleElement.setAttribute("font-family", options.fontFamily);
      subtitleElement.setAttribute(
        "font-size",
        (imageSubtitleConfig.fontSize || options.descriptionFontSize).toString()
      );
      subtitleElement.setAttribute(
        "font-weight",
        imageSubtitleConfig.fontWeight || "normal"
      );
      subtitleElement.setAttribute(
        "fill",
        imageSubtitleConfig.fontColor || options.descriptionFontColor
      );
      subtitleElement.textContent = subtitle;

      elements.push(subtitleElement);
    }

    return elements;
  }
}
