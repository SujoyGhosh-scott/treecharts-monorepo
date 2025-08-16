import { ActionConfig, ActionPosition } from "../types";
import { NODE_CONSTANTS } from "../constants";

/**
 * ActionDrawer handles drawing and managing action buttons on the chart
 */
export class ActionDrawer {
  private svg: SVGSVGElement;
  private actionConfig: ActionConfig;
  private containerElement: HTMLElement;
  private actionGroup?: SVGGElement;

  constructor(
    svg: SVGSVGElement,
    actionConfig: ActionConfig,
    containerElement: HTMLElement
  ) {
    this.svg = svg;
    this.actionConfig = actionConfig;
    this.containerElement = containerElement;
  }

  /**
   * Draw action buttons on the chart
   */
  public drawActions(): void {
    if (!this.actionConfig) return;

    // Remove existing actions
    this.removeActions();

    // Create action group
    this.actionGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    this.actionGroup.setAttribute("class", "treechart-actions");
    this.svg.appendChild(this.actionGroup);

    // Draw download button if enabled
    if (this.actionConfig.download?.enabled) {
      this.drawDownloadButton();
    }
  }

  /**
   * Draw download button
   */
  private drawDownloadButton(): void {
    if (!this.actionGroup || !this.actionConfig.download) return;

    const position = this.actionConfig.download.position || "top-right";
    const { x, y } = this.calculateButtonPosition(position);

    // Create button group
    const buttonGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    buttonGroup.setAttribute("class", "download-button");
    buttonGroup.style.cursor = "pointer";

    // Button background
    const buttonBg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    buttonBg.setAttribute("x", x.toString());
    buttonBg.setAttribute("y", y.toString());
    buttonBg.setAttribute(
      "width",
      NODE_CONSTANTS.ACTION_BUTTON_SIZE.toString()
    );
    buttonBg.setAttribute(
      "height",
      NODE_CONSTANTS.ACTION_BUTTON_SIZE.toString()
    );
    buttonBg.setAttribute("rx", "4");
    buttonBg.setAttribute("fill", "#f8f9fa");
    buttonBg.setAttribute("stroke", "#dee2e6");
    buttonBg.setAttribute("stroke-width", "1");
    buttonBg.style.transition = "all 0.2s ease";

    // Download icon (simple arrow down with line)
    const iconGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );
    iconGroup.setAttribute(
      "transform",
      `translate(${x + NODE_CONSTANTS.ACTION_BUTTON_CENTER_OFFSET}, ${
        y + NODE_CONSTANTS.ACTION_BUTTON_CENTER_OFFSET
      })`
    );

    // Arrow shaft
    const shaft = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    shaft.setAttribute("x1", "0");
    shaft.setAttribute("y1", "-6");
    shaft.setAttribute("x2", "0");
    shaft.setAttribute("y2", "2");
    shaft.setAttribute("stroke", "#495057");
    shaft.setAttribute("stroke-width", "1.5");
    shaft.setAttribute("stroke-linecap", "round");

    // Arrow head
    const arrowPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    arrowPath.setAttribute("d", "M -3 -1 L 0 2 L 3 -1");
    arrowPath.setAttribute("stroke", "#495057");
    arrowPath.setAttribute("stroke-width", "1.5");
    arrowPath.setAttribute("stroke-linecap", "round");
    arrowPath.setAttribute("stroke-linejoin", "round");
    arrowPath.setAttribute("fill", "none");

    // Base line
    const baseLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    baseLine.setAttribute("x1", "-4");
    baseLine.setAttribute("y1", "5");
    baseLine.setAttribute("x2", "4");
    baseLine.setAttribute("y2", "5");
    baseLine.setAttribute("stroke", "#495057");
    baseLine.setAttribute("stroke-width", "1.5");
    baseLine.setAttribute("stroke-linecap", "round");

    iconGroup.appendChild(shaft);
    iconGroup.appendChild(arrowPath);
    iconGroup.appendChild(baseLine);

    buttonGroup.appendChild(buttonBg);
    buttonGroup.appendChild(iconGroup);

    // Add hover effects
    buttonGroup.addEventListener("mouseenter", () => {
      buttonBg.setAttribute("fill", "#e9ecef");
      buttonBg.setAttribute("stroke", "#adb5bd");
    });

    buttonGroup.addEventListener("mouseleave", () => {
      buttonBg.setAttribute("fill", "#f8f9fa");
      buttonBg.setAttribute("stroke", "#dee2e6");
    });

    // Add click handler
    buttonGroup.addEventListener("click", () => {
      this.downloadChart();
    });

    // Add tooltip
    const title = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "title"
    );
    title.textContent = "Download Chart";
    buttonGroup.appendChild(title);

    this.actionGroup.appendChild(buttonGroup);
  }

  /**
   * Calculate button position based on configuration
   */
  private calculateButtonPosition(position: ActionPosition): {
    x: number;
    y: number;
  } {
    const containerRect = this.containerElement.getBoundingClientRect();
    const svgRect = this.svg.getBoundingClientRect();

    // Get SVG dimensions
    const svgWidth = parseFloat(this.svg.getAttribute("width") || "0");
    const svgHeight = parseFloat(this.svg.getAttribute("height") || "0");

    const padding = 12; // Distance from edges

    switch (position) {
      case "top-left":
        return { x: padding, y: padding };
      case "top-right":
        return { x: svgWidth - 24 - padding, y: padding };
      case "bottom-left":
        return { x: padding, y: svgHeight - 24 - padding };
      case "bottom-right":
        return { x: svgWidth - 24 - padding, y: svgHeight - 24 - padding };
      default:
        return { x: svgWidth - 24 - padding, y: padding };
    }
  }

  /**
   * Download the chart as SVG
   */
  private downloadChart(): void {
    try {
      // Clone the SVG to avoid modifying the original
      const svgClone = this.svg.cloneNode(true) as SVGSVGElement;

      // Remove action buttons from the cloned SVG
      const actionsGroup = svgClone.querySelector(".treechart-actions");
      if (actionsGroup) {
        actionsGroup.remove();
      }

      // Get SVG string
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgClone);

      // Create blob and download
      const blob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);

      // Create download link
      const link = document.createElement("a");
      link.href = url;
      link.download = this.actionConfig.download?.filename || "treechart.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading chart:", error);
    }
  }

  /**
   * Remove existing action buttons
   */
  private removeActions(): void {
    if (this.actionGroup) {
      this.actionGroup.remove();
      this.actionGroup = undefined;
    }
  }

  /**
   * Update action configuration and redraw
   */
  public updateActions(newActionConfig: ActionConfig): void {
    this.actionConfig = newActionConfig;
    this.drawActions();
  }

  /**
   * Clean up resources
   */
  public destroy(): void {
    this.removeActions();
  }
}
