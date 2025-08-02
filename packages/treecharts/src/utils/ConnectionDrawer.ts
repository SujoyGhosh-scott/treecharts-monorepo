import { SVG_NS } from "../constants";

export interface ConnectionOptions {
  // Connection type
  type?: "direct" | "right-angle" | "curved" | "custom";

  // Line style options
  color?: string;
  width?: number;
  dasharray?: string;
  opacity?: number;

  // Arrow/direction options
  showArrows?: boolean;
  arrowDirection?: "source-to-target" | "target-to-source" | "both";
  arrowSize?: number;
  arrowColor?: string;

  // Curve options (for curved connections)
  curveRadius?: number;

  // Custom path options
  customPath?: string;
}

export interface Point {
  x: number;
  y: number;
}

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
    // Create arrowhead marker if it doesn't exist
    const colorId = options.arrowColor
      .replace("#", "")
      .replace(/[^a-zA-Z0-9]/g, "");
    const markerId = `arrowhead-${options.arrowSize}-${colorId}`;
    let marker = this.svg.querySelector(`#${markerId}`) as SVGMarkerElement;

    if (!marker) {
      marker = this.createArrowMarker(markerId, options);

      // Add defs element if it doesn't exist
      let defs = this.svg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS(SVG_NS, "defs");
        this.svg.insertBefore(defs, this.svg.firstChild);
      }
      defs.appendChild(marker);
    }

    // Apply marker to the path
    if (
      options.arrowDirection === "source-to-target" ||
      options.arrowDirection === "both"
    ) {
      pathElement.setAttribute("marker-end", `url(#${markerId})`);
    }
    if (
      options.arrowDirection === "target-to-source" ||
      options.arrowDirection === "both"
    ) {
      pathElement.setAttribute("marker-start", `url(#${markerId})`);
    }
  }

  /**
   * Create an arrow marker element
   */
  private createArrowMarker(
    markerId: string,
    options: Required<ConnectionOptions>
  ): SVGMarkerElement {
    const marker = document.createElementNS(SVG_NS, "marker");
    marker.setAttribute("id", markerId);
    marker.setAttribute("markerWidth", (options.arrowSize * 2).toString());
    marker.setAttribute("markerHeight", (options.arrowSize * 2).toString());
    marker.setAttribute("refX", options.arrowSize.toString());
    marker.setAttribute("refY", options.arrowSize.toString());
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");

    const arrow = document.createElementNS(SVG_NS, "polygon");
    const points = `0,0 0,${options.arrowSize * 2} ${options.arrowSize * 2},${
      options.arrowSize
    }`;
    arrow.setAttribute("points", points);
    arrow.setAttribute("fill", options.arrowColor);

    marker.appendChild(arrow);
    return marker;
  }
}
