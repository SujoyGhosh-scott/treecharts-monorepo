import { TitleConfig } from "../types";
import { SVG_NS, DEFAULT_OPTIONS, NODE_CONSTANTS } from "../constants";

/**
 * TitleDrawer class for rendering chart titles and descriptions
 */
export class TitleDrawer {
  private svg: SVGSVGElement;
  private titleConfig: Required<TitleConfig>;

  constructor(svg: SVGSVGElement, titleConfig: Partial<TitleConfig> = {}) {
    this.svg = svg;
    // Merge with defaults from DEFAULT_OPTIONS
    this.titleConfig = {
      ...DEFAULT_OPTIONS.titleConfig,
      ...titleConfig,
      position: {
        ...DEFAULT_OPTIONS.titleConfig.position,
        ...titleConfig.position,
      },
      titleStyle: {
        ...DEFAULT_OPTIONS.titleConfig.titleStyle,
        ...titleConfig.titleStyle,
      },
      descriptionStyle: {
        ...DEFAULT_OPTIONS.titleConfig.descriptionStyle,
        ...titleConfig.descriptionStyle,
      },
    } as Required<TitleConfig>;
  }

  /**
   * Measure text width using canvas context (similar to BaseNodeRenderer)
   */
  private measureText(
    text: string,
    fontSize: number,
    fontFamily: string
  ): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * fontSize * 0.6; // Fallback estimation

    context.font = `${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  }

  /**
   * Calculate lines needed for text wrapping (similar to BaseNodeRenderer)
   */
  private calculateTextLines(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string
  ): string[] {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return [text]; // Fallback

    context.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Draw the title and description on the SVG
   * @param svgWidth - Width of the SVG
   * @param svgHeight - Height of the SVG
   * @returns Object containing title and description heights for layout calculations
   */
  public drawTitle(
    svgWidth: number,
    svgHeight: number,
    titleSpace?: { top: number; bottom: number }
  ): { titleHeight: number; descriptionHeight: number } {
    let titleHeight = 0;
    let descriptionHeight = 0;

    // Only draw if title or description is provided
    if (!this.titleConfig.title && !this.titleConfig.description) {
      return { titleHeight, descriptionHeight };
    }

    // Calculate positions based on alignment
    const { horizontal, vertical } = this.titleConfig.position;

    let titleX = this.calculateHorizontalPosition(horizontal, svgWidth);
    let titleY;

    if (vertical === "top") {
      // Position title within the reserved space at the top
      titleY = this.titleConfig.titleStyle.margin;
    } else {
      // Position title within the reserved space at the bottom
      const computedTitleSpace =
        titleSpace || this.calculateTitleSpace(svgWidth);
      titleY =
        svgHeight -
        computedTitleSpace.bottom +
        this.titleConfig.titleStyle.margin;
    }

    // Create title group
    const titleGroup = document.createElementNS(SVG_NS, "g");
    titleGroup.setAttribute("class", "chart-title-group");

    let currentY = titleY;

    // Draw title if provided
    if (this.titleConfig.title) {
      const titleElements = this.createWrappedTextElements(
        this.titleConfig.title,
        titleX,
        currentY,
        this.titleConfig.titleStyle,
        horizontal,
        svgWidth
      );

      titleElements.forEach((element: SVGTextElement) =>
        titleGroup.appendChild(element)
      );

      // Calculate actual title height based on number of lines
      const lineHeight = this.titleConfig.titleStyle.fontSize * 1.2;
      titleHeight = titleElements.length * lineHeight;

      // Adjust position for description (keep them close together)
      if (vertical === "top") {
        currentY += titleHeight + 5; // Small gap between title and description
      } else {
        currentY -= titleHeight + 5; // Small gap between title and description
      }
    }

    // Draw description if provided
    if (this.titleConfig.description) {
      const descriptionElements = this.createWrappedTextElements(
        this.titleConfig.description,
        titleX,
        currentY,
        this.titleConfig.descriptionStyle,
        horizontal,
        svgWidth
      );

      descriptionElements.forEach((element: SVGTextElement) =>
        titleGroup.appendChild(element)
      );

      // Calculate actual description height based on number of lines
      const lineHeight = this.titleConfig.descriptionStyle.fontSize * 1.2;
      descriptionHeight = descriptionElements.length * lineHeight;
    }

    // Insert title group at the beginning (so it appears on top/bottom)
    if (vertical === "top") {
      this.svg.insertBefore(titleGroup, this.svg.firstChild);
    } else {
      this.svg.appendChild(titleGroup);
    }

    return { titleHeight, descriptionHeight };
  }

  /**
   * Calculate horizontal position based on alignment
   */
  private calculateHorizontalPosition(
    horizontal: "left" | "center" | "right",
    svgWidth: number
  ): number {
    switch (horizontal) {
      case "left":
        return NODE_CONSTANTS.SMALL_MARGIN; // Small margin from left
      case "right":
        return svgWidth - NODE_CONSTANTS.SMALL_MARGIN; // Small margin from right
      case "center":
      default:
        return svgWidth / 2;
    }
  }

  /**
   * Create wrapped text elements for title or description
   */
  private createWrappedTextElements(
    text: string,
    x: number,
    startY: number,
    style:
      | Required<TitleConfig>["titleStyle"]
      | Required<TitleConfig>["descriptionStyle"],
    horizontal: "left" | "center" | "right",
    svgWidth: number
  ): SVGTextElement[] {
    // Calculate available width for text wrapping
    const padding = NODE_CONSTANTS.SMALL_MARGIN;
    const maxWidth = svgWidth - padding * 2;

    // Calculate text lines using our wrapping method
    const lines = this.calculateTextLines(
      text,
      maxWidth,
      style.fontSize,
      style.fontFamily
    );

    // Create text elements for each line
    const textElements: SVGTextElement[] = [];
    const lineHeight = style.fontSize * 1.2;

    lines.forEach((line, index) => {
      const textElement = this.createTextElement(
        line,
        x,
        startY + index * lineHeight,
        style,
        horizontal
      );
      textElements.push(textElement);
    });

    return textElements;
  }

  /**
   * Create a text element with styling
   */
  private createTextElement(
    text: string,
    x: number,
    y: number,
    style:
      | Required<TitleConfig>["titleStyle"]
      | Required<TitleConfig>["descriptionStyle"],
    horizontal: "left" | "center" | "right"
  ): SVGTextElement {
    const textElement = document.createElementNS(SVG_NS, "text");

    // Set position
    textElement.setAttribute("x", x.toString());
    textElement.setAttribute("y", y.toString());

    // Set text anchor based on horizontal alignment
    const textAnchor =
      horizontal === "left"
        ? "start"
        : horizontal === "right"
        ? "end"
        : "middle";
    textElement.setAttribute("text-anchor", textAnchor);
    textElement.setAttribute("dominant-baseline", "central");

    // Set styling
    textElement.setAttribute("font-size", style.fontSize.toString());
    textElement.setAttribute("font-family", style.fontFamily);
    textElement.setAttribute("font-weight", style.fontWeight);
    textElement.setAttribute("fill", style.fontColor);
    textElement.setAttribute("stroke", "none");
    textElement.setAttribute("stroke-width", "0");

    // Set text content
    textElement.textContent = text;

    return textElement;
  }

  /**
   * Calculate total height needed for titles (useful for adjusting chart layout)
   */
  public calculateTitleSpace(svgWidth?: number): {
    top: number;
    bottom: number;
  } {
    let topSpace = 0;
    let bottomSpace = 0;

    if (!this.titleConfig.title && !this.titleConfig.description) {
      return { top: topSpace, bottom: bottomSpace };
    }

    const { vertical } = this.titleConfig.position;
    const extraSpacing = NODE_CONSTANTS.EXTRA_TITLE_SPACING; // Additional space between entire title section and tree

    // Get SVG width for text wrapping calculations
    const actualSvgWidth =
      svgWidth || parseFloat(this.svg.getAttribute("width") || "800");
    const padding = NODE_CONSTANTS.SMALL_MARGIN;
    const maxWidth = actualSvgWidth - padding * 2;

    if (vertical === "top") {
      // Add space for title margin (space above title)
      if (this.titleConfig.title) {
        // Calculate actual title height based on text wrapping
        const titleLines = this.calculateTextLines(
          this.titleConfig.title,
          maxWidth,
          this.titleConfig.titleStyle.fontSize,
          this.titleConfig.titleStyle.fontFamily
        );
        const titleHeight =
          titleLines.length * this.titleConfig.titleStyle.fontSize * 1.2;
        topSpace += this.titleConfig.titleStyle.margin + titleHeight;
      }
      // Add space for description (close to title, no extra margin)
      if (this.titleConfig.description) {
        const descriptionLines = this.calculateTextLines(
          this.titleConfig.description,
          maxWidth,
          this.titleConfig.descriptionStyle.fontSize,
          this.titleConfig.descriptionStyle.fontFamily
        );
        const descriptionHeight =
          descriptionLines.length *
          this.titleConfig.descriptionStyle.fontSize *
          1.2;
        topSpace += 5 + descriptionHeight; // Small gap + font height
      }
      // Add extra spacing between entire title section and tree
      if (this.titleConfig.title || this.titleConfig.description) {
        topSpace += extraSpacing;
      }
    } else {
      // Similar logic for bottom positioning
      if (this.titleConfig.title) {
        const titleLines = this.calculateTextLines(
          this.titleConfig.title,
          maxWidth,
          this.titleConfig.titleStyle.fontSize,
          this.titleConfig.titleStyle.fontFamily
        );
        const titleHeight =
          titleLines.length * this.titleConfig.titleStyle.fontSize * 1.2;
        bottomSpace += this.titleConfig.titleStyle.margin + titleHeight;
      }
      if (this.titleConfig.description) {
        const descriptionLines = this.calculateTextLines(
          this.titleConfig.description,
          maxWidth,
          this.titleConfig.descriptionStyle.fontSize,
          this.titleConfig.descriptionStyle.fontFamily
        );
        const descriptionHeight =
          descriptionLines.length *
          this.titleConfig.descriptionStyle.fontSize *
          1.2;
        bottomSpace += 5 + descriptionHeight;
      }
      // Add extra spacing between entire title section and tree
      if (this.titleConfig.title || this.titleConfig.description) {
        bottomSpace += extraSpacing;
      }
    }

    return { top: topSpace, bottom: bottomSpace };
  }
}
