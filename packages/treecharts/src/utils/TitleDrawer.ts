import { TitleConfig } from "../types";
import { SVG_NS, DEFAULT_OPTIONS } from "../constants";

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
   * Draw the title and description on the SVG
   * @param svgWidth - Width of the SVG
   * @param svgHeight - Height of the SVG
   * @returns Object containing title and description heights for layout calculations
   */
  public drawTitle(
    svgWidth: number,
    svgHeight: number
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
      const titleSpace = this.calculateTitleSpace();
      titleY =
        svgHeight - titleSpace.bottom + this.titleConfig.titleStyle.margin;
    }

    // Create title group
    const titleGroup = document.createElementNS(SVG_NS, "g");
    titleGroup.setAttribute("class", "chart-title-group");

    // Draw title if provided
    if (this.titleConfig.title) {
      const titleElement = this.createTextElement(
        this.titleConfig.title,
        titleX,
        titleY,
        this.titleConfig.titleStyle,
        horizontal
      );
      titleGroup.appendChild(titleElement);
      titleHeight =
        this.titleConfig.titleStyle.fontSize +
        this.titleConfig.titleStyle.margin;

      // Adjust position for description (keep them close together)
      if (vertical === "top") {
        titleY += this.titleConfig.titleStyle.fontSize + 5; // Small gap between title and description
      } else {
        titleY -= this.titleConfig.titleStyle.fontSize + 5; // Small gap between title and description
      }
    }

    // Draw description if provided
    if (this.titleConfig.description) {
      const descriptionElement = this.createTextElement(
        this.titleConfig.description,
        titleX,
        titleY,
        this.titleConfig.descriptionStyle,
        horizontal
      );
      titleGroup.appendChild(descriptionElement);
      descriptionHeight =
        this.titleConfig.descriptionStyle.fontSize +
        this.titleConfig.descriptionStyle.margin;
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
        return 20; // Small margin from left
      case "right":
        return svgWidth - 20; // Small margin from right
      case "center":
      default:
        return svgWidth / 2;
    }
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

    // Set text content
    textElement.textContent = text;

    return textElement;
  }

  /**
   * Calculate total height needed for titles (useful for adjusting chart layout)
   */
  public calculateTitleSpace(): { top: number; bottom: number } {
    let topSpace = 0;
    let bottomSpace = 0;

    if (!this.titleConfig.title && !this.titleConfig.description) {
      return { top: topSpace, bottom: bottomSpace };
    }

    const { vertical } = this.titleConfig.position;
    const extraSpacing = 30; // Additional space between entire title section and tree

    if (vertical === "top") {
      // Add space for title margin (space above title)
      if (this.titleConfig.title) {
        topSpace +=
          this.titleConfig.titleStyle.margin +
          this.titleConfig.titleStyle.fontSize;
      }
      // Add space for description (close to title, no extra margin)
      if (this.titleConfig.description) {
        topSpace += 5 + this.titleConfig.descriptionStyle.fontSize; // Small gap + font height
      }
      // Add extra spacing between entire title section and tree
      if (this.titleConfig.title || this.titleConfig.description) {
        topSpace += extraSpacing;
      }
    } else {
      // Similar logic for bottom positioning
      if (this.titleConfig.title) {
        bottomSpace +=
          this.titleConfig.titleStyle.margin +
          this.titleConfig.titleStyle.fontSize;
      }
      if (this.titleConfig.description) {
        bottomSpace += 5 + this.titleConfig.descriptionStyle.fontSize;
      }
      // Add extra spacing between entire title section and tree
      if (this.titleConfig.title || this.titleConfig.description) {
        bottomSpace += extraSpacing;
      }
    }

    return { top: topSpace, bottom: bottomSpace };
  }
}
