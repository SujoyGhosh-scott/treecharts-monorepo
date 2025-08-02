import { SVG_NS } from "../constants";
import { ConnectionOptions, Point } from "../types";

/**
 * ConnectionDrawer class for drawing connections between tree nodes
 * Provides unified connection drawing with customizable styling
 */
export class ConnectionDrawer {
  private svg: SVGSVGElement;
  private defaultOptions: Required<ConnectionOptions> = {
    type: "direct",
    color: "black",
    width: 1,
    dasharray: "",
    opacity: 1,
    showArrows: false,
    arrowDirection: "source-to-target",
    arrowSize: 6,
    arrowColor: "black",
    curveRadius: 20,
    customPath: "",
    edgeText: "",
    textSize: 12,
    textColor: "black",
    textBackgroundColor: "white",
  };

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
  }

  /**
   * Draw a connection between two points
   */
  public drawConnection(
    fromPoint: Point,
    toPoint: Point,
    options: Partial<ConnectionOptions> = {}
  ): SVGElement {
    const finalOptions = { ...this.defaultOptions, ...options };

    let pathElement: SVGElement;

    switch (finalOptions.type) {
      case "direct":
        pathElement = this.createDirectConnection(
          fromPoint,
          toPoint,
          finalOptions
        );
        break;
      case "right-angle":
        pathElement = this.createRightAngleConnection(
          fromPoint,
          toPoint,
          finalOptions
        );
        break;
      case "curved":
        pathElement = this.createCurvedConnection(
          fromPoint,
          toPoint,
          finalOptions
        );
        break;
      case "custom":
        pathElement = this.createCustomConnection(finalOptions);
        break;
      default:
        pathElement = this.createDirectConnection(
          fromPoint,
          toPoint,
          finalOptions
        );
    }

    this.applyLineStyles(pathElement, finalOptions);

    if (finalOptions.showArrows) {
      this.addArrow(pathElement, fromPoint, toPoint, finalOptions);
    }

    // Add edge text if provided
    if (finalOptions.edgeText && finalOptions.edgeText.trim()) {
      this.addEdgeText(pathElement, fromPoint, toPoint, finalOptions);
    }

    this.svg.appendChild(pathElement);
    return pathElement;
  }

  /**
   * Create a direct line connection
   */
  private createDirectConnection(
    fromPoint: Point,
    toPoint: Point,
    options: Required<ConnectionOptions>
  ): SVGLineElement {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("x1", fromPoint.x.toString());
    line.setAttribute("y1", fromPoint.y.toString());
    line.setAttribute("x2", toPoint.x.toString());
    line.setAttribute("y2", toPoint.y.toString());
    return line;
  }

  /**
   * Create a right-angle connection (L-shaped)
   */
  private createRightAngleConnection(
    fromPoint: Point,
    toPoint: Point,
    options: Required<ConnectionOptions>
  ): SVGPathElement {
    const path = document.createElementNS(SVG_NS, "path");

    // Create an L-shaped path with a vertical then horizontal segment
    const midY = fromPoint.y + (toPoint.y - fromPoint.y) / 2;

    const pathData = `M ${fromPoint.x} ${fromPoint.y} L ${fromPoint.x} ${midY} L ${toPoint.x} ${midY} L ${toPoint.x} ${toPoint.y}`;
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    return path;
  }

  /**
   * Create a curved connection
   */
  private createCurvedConnection(
    fromPoint: Point,
    toPoint: Point,
    options: Required<ConnectionOptions>
  ): SVGPathElement {
    const path = document.createElementNS(SVG_NS, "path");

    // Create a smooth curve using quadratic Bezier curve
    const controlX = fromPoint.x;
    const controlY = fromPoint.y + (toPoint.y - fromPoint.y) / 2;

    const pathData = `M ${fromPoint.x} ${fromPoint.y} Q ${controlX} ${controlY} ${toPoint.x} ${toPoint.y}`;
    path.setAttribute("d", pathData);
    path.setAttribute("fill", "none");
    return path;
  }

  /**
   * Create a custom path connection
   */
  private createCustomConnection(
    options: Required<ConnectionOptions>
  ): SVGPathElement {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", options.customPath);
    path.setAttribute("fill", "none");
    return path;
  }

  /**
   * Apply line styling to a path element
   */
  private applyLineStyles(
    element: SVGElement,
    options: Required<ConnectionOptions>
  ): void {
    element.setAttribute("stroke", options.color);
    element.setAttribute("stroke-width", options.width.toString());
    element.setAttribute("opacity", options.opacity.toString());

    if (options.dasharray) {
      element.setAttribute("stroke-dasharray", options.dasharray);
    }
  }

  /**
   * Add arrow markers to the connection
   */
  private addArrow(
    pathElement: SVGElement,
    fromPoint: Point,
    toPoint: Point,
    options: Required<ConnectionOptions>
  ): void {
    // Use edge color for arrow if arrowColor is not explicitly set
    const arrowColor =
      options.arrowColor === this.defaultOptions.arrowColor
        ? options.color
        : options.arrowColor;

    const colorId = arrowColor.replace("#", "").replace(/[^a-zA-Z0-9]/g, "");

    // Apply markers based on direction
    if (
      options.arrowDirection === "source-to-target" ||
      options.arrowDirection === "both"
    ) {
      const endMarkerId = `arrowhead-end-${options.arrowSize}-${colorId}`;
      let endMarker = this.svg.querySelector(
        `#${endMarkerId}`
      ) as SVGMarkerElement;

      if (!endMarker) {
        endMarker = this.createArrowMarker(
          endMarkerId,
          options,
          arrowColor,
          "end"
        );
        this.addMarkerToDefs(endMarker);
      }
      pathElement.setAttribute("marker-end", `url(#${endMarkerId})`);
    }

    if (
      options.arrowDirection === "target-to-source" ||
      options.arrowDirection === "both"
    ) {
      const startMarkerId = `arrowhead-start-${options.arrowSize}-${colorId}`;
      let startMarker = this.svg.querySelector(
        `#${startMarkerId}`
      ) as SVGMarkerElement;

      if (!startMarker) {
        startMarker = this.createArrowMarker(
          startMarkerId,
          options,
          arrowColor,
          "start"
        );
        this.addMarkerToDefs(startMarker);
      }
      pathElement.setAttribute("marker-start", `url(#${startMarkerId})`);
    }
  }

  /**
   * Add marker to defs element
   */
  private addMarkerToDefs(marker: SVGMarkerElement): void {
    let defs = this.svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(SVG_NS, "defs");
      this.svg.insertBefore(defs, this.svg.firstChild);
    }
    defs.appendChild(marker);
  }

  /**
   * Create an arrow marker element
   */
  private createArrowMarker(
    markerId: string,
    options: Required<ConnectionOptions>,
    arrowColor: string,
    position: "start" | "end"
  ): SVGMarkerElement {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", markerId);
    marker.setAttribute("markerWidth", (options.arrowSize * 2).toString());
    marker.setAttribute("markerHeight", (options.arrowSize * 2).toString());
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");

    const arrow = document.createElementNS(SVG_NS, "polygon");

    if (position === "end") {
      // Arrow pointing right (for line endings)
      marker.setAttribute("refX", options.arrowSize.toString());
      marker.setAttribute("refY", options.arrowSize.toString());
      const points = `0,0 0,${options.arrowSize * 2} ${options.arrowSize * 2},${
        options.arrowSize
      }`;
      arrow.setAttribute("points", points);
    } else {
      // Arrow pointing left (for line starts)
      marker.setAttribute("refX", options.arrowSize.toString());
      marker.setAttribute("refY", options.arrowSize.toString());
      const points = `${options.arrowSize * 2},0 ${options.arrowSize * 2},${
        options.arrowSize * 2
      } 0,${options.arrowSize}`;
      arrow.setAttribute("points", points);
    }

    arrow.setAttribute("fill", arrowColor);
    marker.appendChild(arrow);
    return marker;
  }

  private addEdgeText(
    pathElement: SVGElement,
    fromPoint: Point,
    toPoint: Point,
    options: ConnectionOptions
  ): void {
    const textElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

    // Calculate midpoint of the connection
    const midX = (fromPoint.x + toPoint.x) / 2;
    const midY = (fromPoint.y + toPoint.y) / 2;

    // Set text position
    textElement.setAttribute("x", midX.toString());
    textElement.setAttribute("y", midY.toString());

    // Set text content
    textElement.textContent = options.edgeText || "";

    // Set text styles
    textElement.setAttribute("font-size", (options.textSize || 12).toString());
    textElement.setAttribute("fill", options.textColor || "#000000");
    textElement.setAttribute("text-anchor", "middle");
    textElement.setAttribute("dominant-baseline", "central");

    // Add background rectangle if background color is specified
    if (options.textBackgroundColor) {
      const bbox = textElement.getBBox();
      const rectElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rectElement.setAttribute("x", (midX - bbox.width / 2 - 2).toString());
      rectElement.setAttribute("y", (midY - bbox.height / 2 - 1).toString());
      rectElement.setAttribute("width", (bbox.width + 4).toString());
      rectElement.setAttribute("height", (bbox.height + 2).toString());
      rectElement.setAttribute("fill", options.textBackgroundColor);
      rectElement.setAttribute("rx", "2");

      this.svg.appendChild(rectElement);
    }

    this.svg.appendChild(textElement);
  }
}
