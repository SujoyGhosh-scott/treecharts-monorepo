import { TreeChart } from "../src/index.js";

// Custom path generator functions
function createWavyPath(fromX, fromY, toX, toY) {
  const midX = (fromX + toX) / 2;
  const midY = (fromY + toY) / 2;
  const amplitude = 20; // Wave amplitude
  const frequency = 2; // Number of waves

  // Create a wavy path using quadratic curves
  const controlX1 = fromX + (midX - fromX) / 2;
  const controlY1 = fromY + amplitude * Math.sin(frequency * Math.PI * 0.25);

  const controlX2 = midX + (toX - midX) / 2;
  const controlY2 = midY + amplitude * Math.sin(frequency * Math.PI * 0.75);

  return `M ${fromX} ${fromY} Q ${controlX1} ${controlY1} ${midX} ${midY} Q ${controlX2} ${controlY2} ${toX} ${toY}`;
}

function createZigzagPath(fromX, fromY, toX, toY) {
  const steps = 3;
  const amplitude = 15;
  let path = `M ${fromX} ${fromY}`;

  for (let i = 1; i <= steps; i++) {
    const x = fromX + (toX - fromX) * (i / steps);
    const y = fromY + (toY - fromY) * (i / steps);
    const offset = i % 2 === 0 ? amplitude : -amplitude;
    path += ` L ${x + offset} ${y}`;
  }
  path += ` L ${toX} ${toY}`;

  return path;
}

function createSpiralPath(fromX, fromY, toX, toY) {
  const centerX = (fromX + toX) / 2;
  const centerY = (fromY + toY) / 2;
  const radius = 30;

  // Create a spiral path
  let path = `M ${fromX} ${fromY}`;

  // First curve to start the spiral
  path += ` Q ${centerX - radius} ${centerY - radius} ${centerX} ${centerY}`;

  // Spiral around
  path += ` Q ${centerX + radius} ${centerY - radius} ${
    centerX + radius / 2
  } ${centerY}`;
  path += ` Q ${centerX} ${centerY + radius} ${
    centerX - radius / 2
  } ${centerY}`;

  // Final curve to destination
  path += ` Q ${centerX} ${centerY - radius / 2} ${toX} ${toY}`;

  return path;
}

// Sample data for our custom connections demo
const treeData = {
  value: "Custom Connections Demo",
  child: [
    {
      value: "Wavy Connection",
      child: [
        { value: "Wave End 1", child: [] },
        { value: "Wave End 2", child: [] },
      ],
    },
    {
      value: "Zigzag Connection",
      child: [
        { value: "Zigzag End 1", child: [] },
        { value: "Zigzag End 2", child: [] },
      ],
    },
    {
      value: "Spiral Connection",
      child: [{ value: "Spiral End", child: [] }],
    },
  ],
};

// Create a custom renderer that uses our custom paths
class CustomConnectionRenderer extends TreeChart.prototype.constructor {
  constructor(containerId, options = {}) {
    super(containerId, {
      ...options,
      type: "direct", // We'll override the connection drawing
      horizontalGap: 120,
      verticalGap: 100,
      nodeConfig: {
        width: 120,
        height: 50,
        color: "#e1f5fe",
        borderColor: "#01579b",
        borderWidth: 2,
        borderRadius: 8,
        fontSize: 12,
      },
    });
  }
}

// Override the connection drawing to use custom paths
function createCustomTreeChart() {
  const chart = new TreeChart("custom-connections-container", {
    horizontalGap: 120,
    verticalGap: 100,
    nodeConfig: {
      width: 120,
      height: 50,
      color: "#e1f5fe",
      borderColor: "#01579b",
      borderWidth: 2,
      borderRadius: 8,
      fontSize: 12,
    },
    edgeConfig: {
      width: 3,
      color: "#ff6b35",
      showArrows: true,
      arrowSize: 8,
      arrowColor: "#d84315",
    },
  });

  // Create the base chart
  const svg = chart.render(treeData);

  // Now we'll manually add custom connections
  // Note: This is a demonstration - in a real implementation, you'd extend the renderer
  setTimeout(() => {
    addCustomConnections(svg);
  }, 100);

  return svg;
}

function addCustomConnections(svg) {
  // This is a simplified demonstration of how custom paths could work
  // In practice, you'd integrate this into the renderer system

  // Remove existing connections (for demo purposes)
  const existingPaths = svg.querySelectorAll("path, line");
  existingPaths.forEach((path) => {
    if (path.getAttribute("stroke")) {
      path.remove();
    }
  });

  // Get all text elements to find node positions (simplified approach)
  const textElements = svg.querySelectorAll("text");
  const nodes = Array.from(textElements).map((text) => ({
    text: text.textContent,
    x: parseFloat(text.getAttribute("x")),
    y: parseFloat(text.getAttribute("y")),
  }));

  // Create custom connections based on node names
  nodes.forEach((node) => {
    if (node.text === "Custom Connections Demo") {
      // Root connections to main branches
      const wavyNode = nodes.find((n) => n.text === "Wavy Connection");
      const zigzagNode = nodes.find((n) => n.text === "Zigzag Connection");
      const spiralNode = nodes.find((n) => n.text === "Spiral Connection");

      if (wavyNode) {
        addCustomPath(
          svg,
          createWavyPath(node.x, node.y + 25, wavyNode.x, wavyNode.y - 25),
          "#ff6b35"
        );
      }
      if (zigzagNode) {
        addCustomPath(
          svg,
          createZigzagPath(
            node.x,
            node.y + 25,
            zigzagNode.x,
            zigzagNode.y - 25
          ),
          "#4caf50"
        );
      }
      if (spiralNode) {
        addCustomPath(
          svg,
          createSpiralPath(
            node.x,
            node.y + 25,
            spiralNode.x,
            spiralNode.y - 25
          ),
          "#9c27b0"
        );
      }
    }
  });

  // Add connections from branch nodes to leaf nodes
  const branchConnections = [
    {
      from: "Wavy Connection",
      to: ["Wave End 1", "Wave End 2"],
      color: "#ff6b35",
      pathType: "wavy",
    },
    {
      from: "Zigzag Connection",
      to: ["Zigzag End 1", "Zigzag End 2"],
      color: "#4caf50",
      pathType: "zigzag",
    },
    {
      from: "Spiral Connection",
      to: ["Spiral End"],
      color: "#9c27b0",
      pathType: "spiral",
    },
  ];

  branchConnections.forEach((connection) => {
    const fromNode = nodes.find((n) => n.text === connection.from);
    if (fromNode) {
      connection.to.forEach((toText) => {
        const toNode = nodes.find((n) => n.text === toText);
        if (toNode) {
          let customPath;
          switch (connection.pathType) {
            case "wavy":
              customPath = createWavyPath(
                fromNode.x,
                fromNode.y + 25,
                toNode.x,
                toNode.y - 25
              );
              break;
            case "zigzag":
              customPath = createZigzagPath(
                fromNode.x,
                fromNode.y + 25,
                toNode.x,
                toNode.y - 25
              );
              break;
            case "spiral":
              customPath = createSpiralPath(
                fromNode.x,
                fromNode.y + 25,
                toNode.x,
                toNode.y - 25
              );
              break;
          }
          addCustomPath(svg, customPath, connection.color);
        }
      });
    }
  });
}

function addCustomPath(svg, pathData, color) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", "3");
  path.setAttribute("fill", "none");
  path.setAttribute("opacity", "0.8");

  // Add to the beginning so it appears behind nodes
  svg.insertBefore(path, svg.firstChild);
}

// Initialize the demo
document.addEventListener("DOMContentLoaded", () => {
  // Create container
  const container = document.createElement("div");
  container.id = "custom-connections-container";
  container.style.cssText = `
    width: 100%;
    height: 600px;
    border: 2px solid #ddd;
    margin: 20px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
  `;

  document.body.appendChild(container);

  // Add title
  const title = document.createElement("h2");
  title.textContent = "TreeCharts - Custom Connection Paths Demo";
  title.style.cssText = "text-align: center; color: #333; margin-bottom: 20px;";
  document.body.insertBefore(title, container);

  // Add description
  const description = document.createElement("p");
  description.innerHTML = `
    <strong>Custom Connection Types:</strong><br>
    🌊 <span style="color: #ff6b35;">Wavy Path</span> - Smooth wave connections<br>
    ⚡ <span style="color: #4caf50;">Zigzag Path</span> - Sharp angular connections<br>
    🌀 <span style="color: #9c27b0;">Spiral Path</span> - Curved spiral connections
  `;
  description.style.cssText = `
    text-align: center; 
    color: #666; 
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 1.6;
  `;
  document.body.insertBefore(description, container);

  // Create the chart
  createCustomTreeChart();
});
