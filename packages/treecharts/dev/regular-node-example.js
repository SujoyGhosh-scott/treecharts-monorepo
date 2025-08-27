import { TreeChart } from "../src/index.js";

// Simple tree structure for regular node examples
const simpleTree = {
  value: "A",
  child: [
    {
      value: "B",
      child: [],
    },
    {
      value: "C",
      child: [],
    },
  ],
};

// 1. Visual Styling Chart - Colors, borders, opacity, shadows
const visualStylingChart = new TreeChart("visual-styling-container", {
  type: "direct",
  nodeConfig: {
    type: "rectangle",
    color: "#4A90E2", // Blue background
    borderColor: "#2E5BBA", // Darker blue border
    borderWidth: 2, // Border thickness
    borderRadius: 8, // Rounded corners
    opacity: 1, // Slight transparency
    shadow: true, // Enable shadow
    shadowColor: "rgba(0,0,0,0.3)", // Semi-transparent shadow
    shadowOffset: { x: 10, y: 10 }, // Shadow offset
    width: 120, // Node width
    height: 50, // Node height
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "regular-node-visual-styling.svg",
    },
  },
});

// 2. Text Styling Chart - Font properties and text appearance
const textStylingChart = new TreeChart("text-styling-container", {
  type: "direct",
  nodeConfig: {
    type: "rectangle",
    color: "#E8F5E8", // Light green background
    borderColor: "#4CAF50", // Green border
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16, // Larger font size
    fontColor: "#2E7D32", // Dark green text
    fontFamily: "Georgia, serif", // Custom font family
    padding: 150, // Text padding inside node
    width: 140,
    height: 60,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "regular-node-text-styling.svg",
    },
  },
});

// 3. Advanced Styling Chart - Gradients and advanced effects
const advancedStylingChart = new TreeChart("advanced-styling-container", {
  type: "direct",
  nodeConfig: {
    type: "rectangle",
    gradient: true, // Enable gradient
    gradientStartColor: "#FF6B6B", // Start color (red)
    gradientEndColor: "#FFE66D", // End color (yellow)
    borderColor: "#FF4757", // Red border
    borderWidth: 3,
    borderRadius: 15, // More rounded corners
    shadow: true,
    shadowColor: "rgba(255, 71, 87, 0.4)", // Semi-transparent red shadow
    shadowOffset: { x: 4, y: 4 },
    fontSize: 14,
    fontColor: "#FFFFFF", // White text for contrast
    fontFamily: "Arial, sans-serif",
    padding: 12,
    width: 130,
    height: 55,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "regular-node-advanced-styling.svg",
    },
  },
});

// Initialize all charts
try {
  console.log("Initializing regular node styling examples...");

  visualStylingChart.render(simpleTree);
  console.log("✓ Visual styling chart rendered");

  textStylingChart.render(simpleTree);
  console.log("✓ Text styling chart rendered");

  advancedStylingChart.render(simpleTree);
  console.log("✓ Advanced styling chart rendered");

  console.log("🎉 All regular node examples initialized successfully!");
} catch (error) {
  console.error("❌ Error initializing regular node examples:", error);
}
