import { TreeChart } from "../src/index.js";

// Simple, consistent tree structure for documentation
const simpleTree = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        {
          value: "D",
          child: [],
        },
        {
          value: "E",
          child: [],
        },
      ],
    },
    {
      value: "C",
      child: [
        {
          value: "F",
          child: [],
        },
      ],
    },
  ],
};

// Extended tree structure for all-directional chart (more visually appealing)
const allDirectionTree = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        {
          value: "D",
          child: [],
        },
        {
          value: "E",
          child: [],
        },
      ],
    },
    {
      value: "C",
      child: [
        {
          value: "F",
          child: [],
        },
      ],
    },
    {
      value: "G",
      child: [],
    },
    {
      value: "H",
      child: [],
    },
    {
      value: "I",
      child: [],
    },
  ],
};

// Direct Renderer Chart
const directChart = new TreeChart("direct-container", {
  type: "direct",
  nodeConfig: {
    color: "#08CB00",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "direct-renderer-example.svg",
    },
  },
});

// Right Angle Renderer Chart
const rightAngleChart = new TreeChart("right-angle-container", {
  type: "right-angle",
  nodeConfig: {
    color: "#08CB00",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "right-angle-renderer-example.svg",
    },
  },
});

// Curved Renderer Chart
const curvedChart = new TreeChart("curved-container", {
  type: "curved",
  nodeConfig: {
    color: "#08CB00",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "curved-renderer-example.svg",
    },
  },
});

// All Direction Renderer Chart
const allDirectionChart = new TreeChart("all-direction-container", {
  type: "all-direction",
  nodeConfig: {
    color: "#08CB00",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "all-direction-renderer-example.svg",
    },
  },
});

// Initialize all charts with their respective trees
try {
  directChart.render(simpleTree);
  rightAngleChart.render(simpleTree);
  curvedChart.render(simpleTree);
  allDirectionChart.render(allDirectionTree);

  console.log("All TreeChart renderers initialized successfully!");
} catch (error) {
  console.error("Error initializing TreeChart renderers:", error);
}
