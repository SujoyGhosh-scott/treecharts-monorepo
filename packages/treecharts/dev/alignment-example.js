import { TreeChart } from "../src/index.js";

// Tree data matching the Core Concepts documentation examples
const coreConceptsData = {
  value: "Root Node",
  child: [
    {
      value: "Child 1",
      child: [
        { value: "Grandchild 1", child: [] },
        { value: "Grandchild 2", child: [] },
      ],
    },
    {
      value: "Child 2",
      child: [],
    },
  ],
};

// Tree data matching the Getting Started documentation examples
const gettingStartedData = {
  value: "Root Node",
  child: [
    { value: "Child 1", child: [] },
    { value: "Child 2", child: [] },
  ],
};

// Base configuration for all examples
const baseConfig = {
  type: "right-angle",
  // horizontalGap: 30,
  // verticalGap: 50,
  // nodeConfig: {
  //   width: 60,
  //   height: 30,
  //   color: "lightblue",
  // },
  // actionConfig: {
  //   download: {
  //     enabled: true,
  //     position: "top-right",
  //   },
  // },
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
  }).render(coreConceptsData);

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
  }).render(coreConceptsData);

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
  }).render(coreConceptsData);
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
  }).render(coreConceptsData);

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
  }).render(coreConceptsData);
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
  }).render(coreConceptsData);

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
  }).render(coreConceptsData);
}

// Documentation Examples (for code output images)
function createDocumentationExamples() {
  // Getting Started Example
  new TreeChart("getting-started-example-container", {
    type: "right-angle",
    nodeConfig: {
      color: "#90EE90",
      width: 120,
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "getting-started-example.svg",
      },
    },
  }).render(gettingStartedData);

  // Core Concepts Example
  new TreeChart("core-concepts-example-container", {
    type: "right-angle",
    nodeConfig: {
      color: "#90EE90",
      width: 120,
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "core-concepts-example.svg",
      },
    },
  }).render(coreConceptsData);
}

// Initialize all examples when the page loads
document.addEventListener("DOMContentLoaded", function () {
  createHorizontalAlignmentExamples();
  createVerticalAlignmentExamples();
  createCombinedAlignmentExamples();
  createDocumentationExamples();
});
