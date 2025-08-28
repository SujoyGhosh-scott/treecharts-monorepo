import { TreeChart } from "../src/index.js";

// Simple tree data for download demonstration
const downloadDemoTree = {
  value: "Root",
  child: [
    {
      value: "Child A",
      child: [
        {
          value: "A1",
          child: [],
        },
      ],
    },
    {
      value: "Child B",
      child: [
        {
          value: "B1",
          child: [],
        },
      ],
    },
  ],
};

// Basic download example - top-right position (default)
const basicDownloadChart = new TreeChart("basic-download-container", {
  type: "right-angle",
  horizontalGap: 80,
  verticalGap: 60,

  nodeConfig: {
    width: 60,
    height: 30,
    color: "#e8f4fd",
    borderColor: "#4a90e2",
    borderWidth: 2,
    fontSize: 12,
    fontColor: "#2c3e50",
  },

  titleConfig: {
    title: "Basic Download",
    description: "Top-right download button",
  },

  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "basic-tree.svg",
    },
  },
});

// Download with custom position - top-left
const customPositionChart = new TreeChart("custom-position-container", {
  type: "curved",
  horizontalGap: 90,
  verticalGap: 70,

  nodeConfig: {
    width: 55,
    height: 30,
    color: "#fff3cd",
    borderColor: "#ffcc02",
    borderWidth: 2,
    fontSize: 11,
    fontColor: "#856404",
  },

  edgeConfig: {
    color: "#ffcc02",
    width: 2,
    curveRadius: 20,
  },

  titleConfig: {
    title: "Custom Position",
    description: "Top-left download button",
  },

  actionConfig: {
    download: {
      enabled: true,
      position: "top-left", // Different position
      filename: "curved-tree.svg",
    },
  },
});

// Download with styled appearance and custom filename
const styledDownloadChart = new TreeChart("styled-download-container", {
  type: "direct",
  horizontalGap: 85,
  verticalGap: 65,

  nodeConfig: {
    width: 65,
    height: 35,
    color: "#f8d7da",
    borderColor: "#dc3545",
    borderWidth: 2,
    fontSize: 12,
    fontColor: "#721c24",
  },

  edgeConfig: {
    color: "#dc3545",
    width: 2,
    showArrows: true,
    arrowSize: 4,
  },

  titleConfig: {
    title: "Dynamic Filename",
    description: "Filename with date",
  },

  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: `tree-${new Date().toISOString().split("T")[0]}.svg`, // Dynamic filename with date
    },
  },
});

// Render all charts
basicDownloadChart.render(downloadDemoTree);
customPositionChart.render(downloadDemoTree);
styledDownloadChart.render(downloadDemoTree);
