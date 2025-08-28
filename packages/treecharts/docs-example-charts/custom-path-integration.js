import { TreeChart } from "../src/index.js";

/**
 * Custom Connection Example - Proper Integration
 *
 * This example demonstrates how to use the custom connection feature
 * by extending TreeChart with a custom renderer that uses the
 * ConnectionDrawer's custom path functionality.
 */

// Create some interesting custom path generators
const CustomPaths = {
  // Heart-shaped connection
  heart: (fromX, fromY, toX, toY) => {
    const centerX = (fromX + toX) / 2;
    const centerY = (fromY + toY) / 2;
    const scale = 0.3;

    return `M ${centerX},${centerY + 10 * scale} 
                C ${centerX},${centerY + 5 * scale} ${
      centerX - 10 * scale
    },${centerY} ${centerX - 10 * scale},${centerY - 5 * scale}
                C ${centerX - 10 * scale},${centerY - 10 * scale} ${centerX},${
      centerY - 10 * scale
    } ${centerX},${centerY - 15 * scale}
                C ${centerX},${centerY - 10 * scale} ${centerX + 10 * scale},${
      centerY - 10 * scale
    } ${centerX + 10 * scale},${centerY - 5 * scale}
                C ${centerX + 10 * scale},${centerY} ${centerX},${
      centerY + 5 * scale
    } ${centerX},${centerY + 10 * scale} Z
                M ${fromX} ${fromY} L ${centerX} ${centerY - 15 * scale}
                M ${centerX} ${centerY + 10 * scale} L ${toX} ${toY}`;
  },

  // Lightning bolt
  lightning: (fromX, fromY, toX, toY) => {
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const width = 15;

    return `M ${fromX} ${fromY} 
                L ${midX - width} ${midY - 20}
                L ${midX + width / 2} ${midY - 20}
                L ${midX - width / 2} ${midY + 20}
                L ${midX + width} ${midY + 20}
                L ${toX} ${toY}`;
  },

  // Circular arc
  arc: (fromX, fromY, toX, toY) => {
    const midX = (fromX + toX) / 2;
    const radius = Math.abs(toX - fromX) / 2;
    const sweepFlag = toX > fromX ? 1 : 0;

    return `M ${fromX} ${fromY}
                A ${radius} ${radius} 0 0 ${sweepFlag} ${toX} ${toY}`;
  },

  // Step pattern (like stairs)
  steps: (fromX, fromY, toX, toY) => {
    const steps = 4;
    const stepWidth = (toX - fromX) / steps;
    const stepHeight = (toY - fromY) / steps;

    let path = `M ${fromX} ${fromY}`;

    for (let i = 1; i <= steps; i++) {
      const x = fromX + stepWidth * i;
      const y = fromY + stepHeight * (i - 1);
      path += ` L ${x} ${y}`;

      const nextY = fromY + stepHeight * i;
      path += ` L ${x} ${nextY}`;
    }

    return path;
  },
};

// Tree data with different connection types specified
const customTreeData = {
  value: "🎨 Custom Paths Gallery",
  connectionType: "normal", // Default connection to root
  child: [
    {
      value: "💖 Love Connections",
      connectionType: "heart", // Heart-shaped path
      child: [
        { value: "Romance", connectionType: "heart", child: [] },
        { value: "Friendship", connectionType: "heart", child: [] },
      ],
    },
    {
      value: "⚡ Power Systems",
      connectionType: "lightning", // Lightning bolt path
      child: [
        { value: "High Voltage", connectionType: "lightning", child: [] },
        { value: "Energy Flow", connectionType: "lightning", child: [] },
      ],
    },
    {
      value: "🌉 Smooth Curves",
      connectionType: "arc", // Circular arc path
      child: [
        { value: "Bridge A", connectionType: "arc", child: [] },
        { value: "Bridge B", connectionType: "arc", child: [] },
      ],
    },
    {
      value: "📊 Progress Steps",
      connectionType: "steps", // Step pattern path
      child: [
        { value: "Level 1", connectionType: "steps", child: [] },
        { value: "Level 2", connectionType: "steps", child: [] },
      ],
    },
  ],
};

// Custom TreeChart class that handles different connection types
class CustomPathTreeChart extends TreeChart {
  constructor(containerId, options = {}) {
    super(containerId, {
      ...options,
      horizontalGap: 150,
      verticalGap: 100,
      nodeConfig: {
        width: 140,
        height: 50,
        color: "#ffffff",
        borderColor: "#333",
        borderWidth: 2,
        borderRadius: 12,
        fontSize: 13,
        fontColor: "#333",
        shadow: true,
        shadowColor: "rgba(0,0,0,0.1)",
        ...options.nodeConfig,
      },
      edgeConfig: {
        width: 3,
        showArrows: true,
        arrowSize: 8,
        opacity: 0.9,
        ...options.edgeConfig,
      },
    });
  }

  render(data) {
    // Store the original data for custom connection processing
    this.originalData = data;

    // Render the base chart first
    const svg = super.render(data);

    // Add custom connections after a short delay
    setTimeout(() => {
      this.addCustomConnections(svg);
    }, 50);

    return svg;
  }

  addCustomConnections(svg) {
    // Remove existing connections
    const existingConnections = svg.querySelectorAll(
      "path[stroke], line[stroke]"
    );
    existingConnections.forEach((el) => {
      if (el.getAttribute("stroke") && el.getAttribute("stroke") !== "none") {
        el.remove();
      }
    });

    // Get node positions and add custom connections
    const nodes = this.extractNodePositions(svg);
    this.createCustomConnections(svg, nodes, this.originalData);
  }

  extractNodePositions(svg) {
    const nodes = new Map();
    const rects = svg.querySelectorAll("rect");
    const texts = svg.querySelectorAll("text");

    rects.forEach((rect) => {
      const rectX = parseFloat(rect.getAttribute("x"));
      const rectY = parseFloat(rect.getAttribute("y"));
      const rectWidth = parseFloat(rect.getAttribute("width"));
      const rectHeight = parseFloat(rect.getAttribute("height"));

      const centerX = rectX + rectWidth / 2;
      const centerY = rectY + rectHeight / 2;

      // Find corresponding text
      texts.forEach((text) => {
        const textX = parseFloat(text.getAttribute("x"));
        const textY = parseFloat(text.getAttribute("y"));

        if (Math.abs(textX - centerX) < 5 && Math.abs(textY - centerY) < 15) {
          const nodeValue = text.textContent;
          nodes.set(nodeValue, {
            x: centerX,
            y: centerY,
            topY: rectY,
            bottomY: rectY + rectHeight,
            leftX: rectX,
            rightX: rectX + rectWidth,
          });
        }
      });
    });

    return nodes;
  }

  createCustomConnections(svg, nodes, data, parentNode = null) {
    if (!data.child || data.child.length === 0) return;

    const currentNode = nodes.get(data.value);
    if (!currentNode || !parentNode) {
      // Process children without creating connection (for root)
      data.child.forEach((child) => {
        this.createCustomConnections(
          svg,
          nodes,
          child,
          currentNode || parentNode
        );
      });
      return;
    }

    // Create connection from parent to current node
    const connectionType = data.connectionType || "normal";
    const color = this.getConnectionColor(connectionType);

    this.drawCustomConnection(
      svg,
      parentNode,
      currentNode,
      connectionType,
      color
    );

    // Process children
    data.child.forEach((child) => {
      this.createCustomConnections(svg, nodes, child, currentNode);
    });
  }

  getConnectionColor(type) {
    const colors = {
      heart: "#e91e63",
      lightning: "#ff9800",
      arc: "#2196f3",
      steps: "#4caf50",
      normal: "#333333",
    };
    return colors[type] || colors.normal;
  }

  drawCustomConnection(svg, fromNode, toNode, type, color) {
    const fromX = fromNode.x;
    const fromY = fromNode.bottomY;
    const toX = toNode.x;
    const toY = toNode.topY;

    let pathData;

    if (type === "normal" || !CustomPaths[type]) {
      // Use default direct connection
      pathData = `M ${fromX} ${fromY} L ${toX} ${toY}`;
    } else {
      // Use custom path generator
      pathData = CustomPaths[type](fromX, fromY, toX, toY);
    }

    // Create the path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", color);
    path.setAttribute("stroke-width", "3");
    path.setAttribute("fill", "none");
    path.setAttribute("opacity", "0.8");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    // Add arrow marker
    if (this.options.edgeConfig?.showArrows) {
      this.addArrowMarker(svg, path, color);
    }

    // Insert behind nodes
    svg.insertBefore(path, svg.firstChild);
  }

  addArrowMarker(svg, path, color) {
    const colorId = color.replace("#", "").replace(/[^a-zA-Z0-9]/g, "");
    const markerId = `arrow-${colorId}`;

    // Check if marker already exists
    if (!svg.querySelector(`#${markerId}`)) {
      // Create marker
      let defs = svg.querySelector("defs");
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        svg.insertBefore(defs, svg.firstChild);
      }

      const marker = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "marker"
      );
      marker.setAttribute("id", markerId);
      marker.setAttribute("markerWidth", "10");
      marker.setAttribute("markerHeight", "10");
      marker.setAttribute("refX", "8");
      marker.setAttribute("refY", "3");
      marker.setAttribute("orient", "auto");
      marker.setAttribute("markerUnits", "strokeWidth");

      const arrow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      arrow.setAttribute("points", "0,0 0,6 6,3");
      arrow.setAttribute("fill", color);

      marker.appendChild(arrow);
      defs.appendChild(marker);
    }

    path.setAttribute("marker-end", `url(#${markerId})`);
  }
}

// Initialize the demo
document.addEventListener("DOMContentLoaded", () => {
  // Create container if it doesn't exist
  let container = document.getElementById("custom-path-chart");
  if (!container) {
    container = document.createElement("div");
    container.id = "custom-path-chart";
    container.style.cssText = `
            width: 100%;
            height: 700px;
            border: 2px solid #ddd;
            margin: 20px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            padding: 20px;
            box-sizing: border-box;
        `;
    document.body.appendChild(container);
  }

  // Add title and description
  const title = document.createElement("h1");
  title.textContent = "🎨 TreeCharts Custom Connection Paths";
  title.style.cssText = `
        text-align: center; 
        color: #333; 
        margin-bottom: 10px;
        font-family: 'Segoe UI', sans-serif;
    `;
  document.body.insertBefore(title, container);

  const description = document.createElement("div");
  description.innerHTML = `
        <p style="text-align: center; color: #666; margin-bottom: 20px;">
            Each connection type demonstrates a different custom SVG path:<br>
            💖 Heart paths • ⚡ Lightning bolts • 🌉 Smooth arcs • 📊 Step patterns
        </p>
    `;
  document.body.insertBefore(description, container);

  // Create the custom chart
  const chart = new CustomPathTreeChart("custom-path-chart", {
    nodeConfig: {
      color: "#ffffff",
      borderColor: "#333",
      borderWidth: 2,
      borderRadius: 12,
      shadow: true,
      shadowColor: "rgba(0,0,0,0.2)",
    },
  });

  chart.render(customTreeData);
});

// Export for use in other files
export { CustomPathTreeChart, CustomPaths };
