import { TreeChart } from "../src/index.js";

// Simple tree for Edge Customization
const edgeCustomizationTree = {
  value: "A",
  child: [
    {
      value: "B",
      edgeText: "to Department B",
      child: [
        {
          value: "B1",
          edgeText: "sub-unit",
          child: [],
        },
        {
          value: "B2",
          edgeText: "branch",
          child: [],
        },
      ],
    },
    {
      value: "C",
      edgeText: "to Department C",
      child: [
        {
          value: "C1",
          edgeText: "division",
          child: [],
        },
      ],
    },
  ],
};

// Edge Customization Chart
const edgeCustomizationChart = new TreeChart("edge-container", {
  type: "right-angle",
  horizontalGap: 120,
  verticalGap: 100,

  // Node configuration
  nodeConfig: {
    width: 60,
    height: 40,
    color: "#e8f4fd",
    borderColor: "#4a90e2",
    borderWidth: 2,
    fontSize: 14,
    fontColor: "#2c3e50",
  },

  // Edge configuration with customizations
  edgeConfig: {
    color: "#e74c3c", // Red edges
    width: 2, // Thicker lines
    dasharray: "5,5", // Dashed lines
    opacity: 0.8, // Slightly transparent

    // Arrow configuration
    showArrows: true,
    arrowDirection: "source-to-target",
    arrowSize: 5,
    arrowColor: "#c0392b", // Darker red arrows

    // Edge text styling
    textSize: 11,
    textColor: "#8e44ad", // Purple text
    textBackgroundColor: "#f8f9fa", // Light background for text
  },

  // Chart title
  titleConfig: {
    title: "Edge Customization Example",
    description:
      "Dashed red edges with purple text labels and arrow indicators",
  },

  // Download action
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "edge-customization-example.svg",
    },
  },
});

// Render the chart
try {
  edgeCustomizationChart.render(edgeCustomizationTree);
  console.log("Edge customization chart initialized successfully!");
} catch (error) {
  console.error("Error initializing edge customization chart:", error);
}
