import { TreeChart } from "../src/index.js";

// Simple tree data for alignment demonstrations
const sampleData = {
  value: "Root",
  child: [
    {
      value: "A",
      child: [
        { value: "A1", child: [] },
        { value: "A2", child: [] },
      ],
    },
    {
      value: "B",
      child: [{ value: "B1", child: [] }],
    },
    {
      value: "C",
      child: [],
    },
  ],
};

// Base configuration for all examples
const baseConfig = {
  type: "direct",
  horizontalGap: 30,
  verticalGap: 50,
  nodeConfig: {
    width: 60,
    height: 30,
    color: "lightblue",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
    },
  },
};

// Horizontal Alignment Examples
function createHorizontalAlignmentExamples() {
  // Left alignment
  new TreeChart("horizontal-left-container", {
    ...baseConfig,
    verticalAlign: "left",
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "horizontal-left-alignment.svg",
      },
    },
  }).render(sampleData);

  // Center alignment
  new TreeChart("horizontal-center-container", {
    ...baseConfig,
    verticalAlign: "center",
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "horizontal-center-alignment.svg",
      },
    },
  }).render(sampleData);

  // Right alignment
  new TreeChart("horizontal-right-container", {
    ...baseConfig,
    verticalAlign: "right",
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "horizontal-right-alignment.svg",
      },
    },
  }).render(sampleData);
}

// Vertical Alignment Examples
function createVerticalAlignmentExamples() {
  // Top to Bottom
  new TreeChart("vertical-top-bottom-container", {
    ...baseConfig,
    horizontalAlign: "top-to-bottom",
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "vertical-top-bottom-alignment.svg",
      },
    },
  }).render(sampleData);

  // Bottom to Top
  new TreeChart("vertical-bottom-top-container", {
    ...baseConfig,
    horizontalAlign: "bottom-to-top",
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "vertical-bottom-top-alignment.svg",
      },
    },
  }).render(sampleData);
}

// Combined Alignment Examples
function createCombinedAlignmentExamples() {
  // Right + Bottom-to-Top
  new TreeChart("combined-right-bottom-container", {
    ...baseConfig,
    verticalAlign: "right",
    horizontalAlign: "bottom-to-top",
    nodeConfig: {
      ...baseConfig.nodeConfig,
      color: "lightyellow",
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "combined-right-bottom-alignment.svg",
      },
    },
  }).render(sampleData);

  // Left + Bottom-to-Top
  new TreeChart("combined-left-bottom-container", {
    ...baseConfig,
    verticalAlign: "left",
    horizontalAlign: "bottom-to-top",
    nodeConfig: {
      ...baseConfig.nodeConfig,
      color: "lightgreen",
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "combined-left-bottom-alignment.svg",
      },
    },
  }).render(sampleData);
}

// Initialize all examples when the page loads
document.addEventListener("DOMContentLoaded", function () {
  createHorizontalAlignmentExamples();
  createVerticalAlignmentExamples();
  createCombinedAlignmentExamples();
});
