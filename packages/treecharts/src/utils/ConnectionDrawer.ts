import { SVG_NS, NODE_CONSTANTS } from "../constants";
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
        pathElement = this.createDirectConnection(fromPoint, toPoint);
        break;
      case "right-angle":
        pathElement = this.createRightAngleConnection(fromPoint, toPoint);
        break;
      case "curved":
        pathElement = this.createCurvedConnection(
          fromPoint,
          toPoint,
          finalOptions.curveRadius
        );
        break;
      case "custom":
        pathElement = this.createCustomConnection(finalOptions);
        break;
      default:
        pathElement = this.createDirectConnection(fromPoint, toPoint);
    }

    this.applyLineStyles(pathElement, finalOptions);

    if (finalOptions.showArrows) {
      this.addArrow(pathElement, finalOptions);
    }

    // Add edge text if provided
    if (finalOptions.edgeText && finalOptions.edgeText.trim()) {
      this.addEdgeText(pathElement, fromPoint, toPoint, finalOptions);
    }

    this.svg.appendChild(pathElement);
    return pathElement;
  }

  /**
   * Draw a complete right-angle connection with three segments (parent → midpoint → child)
   * This is a higher-level method that creates the full L-shaped connection in one call
   */
  public drawThreeSegmentRightAngle(
    parentPoint: Point,
    childPoint: Point,
    options: Partial<ConnectionOptions> = {}
  ): SVGElement[] {
    const finalOptions = { ...this.defaultOptions, ...options };
    const elements: SVGElement[] = [];

    // Calculate midpoint for the horizontal segment
    const midY = parentPoint.y + (childPoint.y - parentPoint.y) / 2;

    // Determine arrow placement based on arrow direction
    const showArrowOnParentSegment =
      finalOptions.arrowDirection === "target-to-source" ||
      finalOptions.arrowDirection === "both";
    const showArrowOnChildSegment =
      finalOptions.arrowDirection === "source-to-target" ||
      finalOptions.arrowDirection === "both";

    // Segment 1: Parent → Midpoint (vertical, arrows only for target-to-source or both)
    const segment1 = this.drawConnection(
      parentPoint,
      { x: parentPoint.x, y: midY },
      {
        ...finalOptions,
        edgeText: "", // No text on parent's vertical segment
        showArrows: showArrowOnParentSegment,
        arrowDirection: showArrowOnParentSegment
          ? finalOptions.arrowDirection === "both"
            ? "target-to-source"
            : finalOptions.arrowDirection
          : "source-to-target",
      }
    );
    elements.push(segment1);

    // Segment 2: Horizontal line (no arrows, no text)
    const segment2 = this.drawConnection(
      { x: parentPoint.x, y: midY },
      { x: childPoint.x, y: midY },
      {
        ...finalOptions,
        edgeText: "", // No text on horizontal segment
        showArrows: false, // Never show arrows on horizontal connector
      }
    );
    elements.push(segment2);

    // Segment 3: Midpoint → Child (vertical, arrows only for source-to-target or both)
    const segment3 = this.drawConnection(
      { x: childPoint.x, y: midY },
      childPoint,
      {
        ...finalOptions,
        edgeText: finalOptions.edgeText, // Text goes on the final segment connecting to child
        showArrows: showArrowOnChildSegment,
        arrowDirection: showArrowOnChildSegment
          ? finalOptions.arrowDirection === "both"
            ? "source-to-target"
            : finalOptions.arrowDirection
          : "source-to-target",
      }
    );
    elements.push(segment3);

    return elements;
  }

  /**
   * Draw a multi-child right-angle connection system
   * This creates a horizontal connector line with vertical drops to each child
   */
  public drawMultiChildRightAngle(
    parentPoint: Point,
    childPoints: Point[],
    horizontalY: number,
    options: Partial<ConnectionOptions> = {}
  ): SVGElement[] {
    const finalOptions = { ...this.defaultOptions, ...options };
    const elements: SVGElement[] = [];

    if (childPoints.length === 0) return elements;

    // Find the extent of the horizontal line
    const childXValues = childPoints.map((p) => p.x);
    const minX = Math.min(...childXValues, parentPoint.x);
    const maxX = Math.max(...childXValues, parentPoint.x);

    // Determine arrow placement based on arrow direction
    const showArrowOnParentSegment =
      finalOptions.arrowDirection === "target-to-source" ||
      finalOptions.arrowDirection === "both";

    // Draw vertical line from parent to horizontal line (arrows only for target-to-source or both)
    const parentToHorizontal = this.drawConnection(
      parentPoint,
      { x: parentPoint.x, y: horizontalY },
      {
        ...finalOptions,
        edgeText: "", // No text on parent's vertical segment
        showArrows: showArrowOnParentSegment,
        arrowDirection: showArrowOnParentSegment
          ? finalOptions.arrowDirection === "both"
            ? "target-to-source"
            : finalOptions.arrowDirection
          : "source-to-target",
      }
    );
    elements.push(parentToHorizontal);

    // Draw horizontal connector line (no arrows, no text)
    const horizontalLine = this.drawConnection(
      { x: minX, y: horizontalY },
      { x: maxX, y: horizontalY },
      {
        ...finalOptions,
        edgeText: "", // No text on horizontal line
        showArrows: false, // No arrows on structural lines
      }
    );
    elements.push(horizontalLine);

    // Note: Individual child connections are now handled by drawChildConnectionsWithText
    // to avoid duplication and ensure proper arrow placement

    return elements;
  }

  /**
   * Draw individual child connections with text for multi-child right-angle systems
   * This method should be called after drawMultiChildRightAngle to add child connections with text and arrows
   */
  public drawChildConnectionsWithText(
    childPoints: Point[],
    horizontalY: number,
    childTexts: (string | undefined)[],
    options: Partial<ConnectionOptions> = {}
  ): SVGElement[] {
    const finalOptions = { ...this.defaultOptions, ...options };
    const elements: SVGElement[] = [];

    // Determine arrow placement based on arrow direction
    const showArrowOnChildSegment =
      finalOptions.arrowDirection === "source-to-target" ||
      finalOptions.arrowDirection === "both";

    childPoints.forEach((childPoint, index) => {
      const edgeText = childTexts[index];

      // Draw the vertical connection to child with arrows and optional text
      // Always draw from horizontal line to child (normal direction)
      // The arrowDirection property will handle which end gets the arrow
      const childConnection = this.drawConnection(
        { x: childPoint.x, y: horizontalY },
        childPoint,
        {
          ...finalOptions,
          edgeText: edgeText || "", // Text goes on the vertical segment connecting to this specific child
          showArrows: showArrowOnChildSegment, // Only show arrows when appropriate
          arrowDirection: showArrowOnChildSegment
            ? finalOptions.arrowDirection === "both"
              ? "source-to-target"
              : finalOptions.arrowDirection
            : "source-to-target",
        }
      );
      elements.push(childConnection);
    });

    return elements;
  }

  /**
   * Create a direct line connection
   */
  private createDirectConnection(
    fromPoint: Point,
    toPoint: Point
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
    toPoint: Point
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
    curveRadius: number
  ): SVGPathElement {
    const path = document.createElementNS(SVG_NS, "path");

    // Create a smooth curve using quadratic Bezier curve
    // Use curveRadius to control the intensity of the curve
    const controlX = fromPoint.x;
    const controlY =
      fromPoint.y + Math.min(curveRadius, (toPoint.y - fromPoint.y) / 2);

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
    textElement.setAttribute(
      "font-size",
      (options.textSize || NODE_CONSTANTS.DEFAULT_TEXT_SIZE).toString()
    );
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
