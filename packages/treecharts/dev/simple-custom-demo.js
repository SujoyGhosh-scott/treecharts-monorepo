import { TreeChart } from "../src/index.js";

// Simple example showing how to use custom connection paths
const customData = {
  value: "Start",
  child: [
    {
      value: "End",
      child: [],
    },
  ],
};

// Create chart with custom connections
const chart = new TreeChart("custom-demo", {
  horizontalGap: 200,
  verticalGap: 150,
  nodeConfig: {
    width: 80,
    height: 40,
    color: "#f0f8ff",
    borderColor: "#4169e1",
    borderWidth: 2,
    borderRadius: 8,
  },
  edgeConfig: {
    // We'll override these connections with custom ones
    width: 3,
    color: "#666",
    showArrows: true,
  },
});

console.log("Rendering basic chart...");
const svg = chart.render(customData);

// Now let's demonstrate custom connections using the ConnectionDrawer directly
setTimeout(() => {
  console.log("Adding custom connection demonstrations...");

  // Create a new ConnectionDrawer instance
  const connectionDrawer =
    new chart.constructor.prototype.connectionDrawer.constructor(svg);

  // Define some custom SVG paths
  const customPaths = {
    // Heart shape
    heart:
      "M 12,21.35 C 11.65,21.75 10.99,21.75 10.64,21.35 C 4.23,15.48 2,12.78 2,9.5 C 2,6.42 4.42,4 7.5,4 C 9.24,4 10.91,4.81 12,6.09 C 13.09,4.81 14.76,4 16.5,4 C 19.58,4 22,6.42 22,9.5 C 22,12.78 19.77,15.48 13.36,21.35 Z",

    // Lightning bolt
    lightning: "M 5,0 L 15,20 L 10,20 L 20,40 L 25,40 L 15,20 L 20,20 L 10,0 Z",

    // Star
    star: "M 12,2 L 15,8 L 22,9 L 17,14 L 18,21 L 12,18 L 6,21 L 7,14 L 2,9 L 9,8 Z",

    // Wavy line
    wave: "M 0,20 Q 10,0 20,20 T 40,20",
  };

  // Get the SVG bounds for positioning
  const svgRect = svg.getBoundingClientRect();
  const svgWidth = parseInt(svg.getAttribute("width")) || 400;
  const svgHeight = parseInt(svg.getAttribute("height")) || 300;

  // Add demonstrations of each custom path type
  let yOffset = svgHeight + 50;

  Object.entries(customPaths).forEach(([name, pathData], index) => {
    const xOffset = index * 150;

    // Add a label
    const label = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );
    label.setAttribute("x", xOffset + 50);
    label.setAttribute("y", yOffset - 10);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "14");
    label.setAttribute("fill", "#333");
    label.textContent = `${name} (custom)`;
    svg.appendChild(label);

    // Create custom connection using the ConnectionDrawer
    try {
      connectionDrawer.drawConnection(
        { x: xOffset + 25, y: yOffset + 20 }, // From point
        { x: xOffset + 75, y: yOffset + 80 }, // To point
        {
          type: "custom",
          customPath:
            `M ${xOffset + 25} ${yOffset + 20} ` +
            pathData.replace(/M\s*[\d\.,\s]+/, "").replace(/[ML]\s*/g, "L "),
          color: ["#e91e63", "#ff9800", "#9c27b0", "#2196f3"][index],
          width: 2,
          showArrows: true,
          arrowSize: 6,
        }
      );
    } catch (error) {
      console.error(`Error creating ${name} custom connection:`, error);

      // Fallback: create a simple custom path
      const fallbackPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      fallbackPath.setAttribute(
        "d",
        `M ${xOffset + 25} ${yOffset + 20} Q ${xOffset + 50} ${yOffset + 30} ${
          xOffset + 75
        } ${yOffset + 80}`
      );
      fallbackPath.setAttribute(
        "stroke",
        ["#e91e63", "#ff9800", "#9c27b0", "#2196f3"][index]
      );
      fallbackPath.setAttribute("stroke-width", "3");
      fallbackPath.setAttribute("fill", "none");
      svg.appendChild(fallbackPath);
    }
  });

  // Extend SVG height to show the custom examples
  svg.setAttribute("height", (yOffset + 120).toString());

  console.log("Custom connection demonstrations added!");
}, 200);

console.log("Custom connections demo initialized!");
