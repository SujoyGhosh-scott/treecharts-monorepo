import { TreeChart } from "../src/index";

// Tree data with clear parent-child directional flow
const rightAngleTestData = {
  value: "Root",
  child: [
    {
      value: "Parent A",
      child: [
        {
          value: "Child A1",
          child: [
            {
              value: "Grandchild A1a",
              child: [],
            },
            {
              value: "Grandchild A1b",
              child: [],
            },
          ],
        },
        {
          value: "Child A2",
          child: [
            {
              value: "Grandchild A2a",
              child: [],
            },
          ],
        },
        {
          value: "Child A3",
          child: [],
        },
      ],
    },
    {
      value: "Parent B",
      child: [
        {
          value: "Child B1",
          child: [],
        },
        {
          value: "Child B2",
          child: [],
        },
      ],
    },
    {
      value: "Parent C",
      child: [],
    },
  ],
};

// Initial chart configuration
let chartConfig = {
  type: "right-angle",
  horizontalGap: 50,
  verticalGap: 80,
  horizontalAlign: "top-to-bottom", // Tree flow direction
  nodeConfig: {
    type: "rectangle",
    width: 100,
    height: 40,
    color: "#4CAF50",
    fontColor: "white",
    borderColor: "#2E7D32",
    borderWidth: 2,
    borderRadius: 6,
    fontSize: 12,
  },
  edgeConfig: {
    color: "#4CAF50", // Changed to green to match theme
    width: 2,
    showArrows: true,
    arrowDirection: "source-to-target", // Will be updated by dropdown
  },
  titleConfig: {
    title: "Arrow Direction & Tree Alignment Test",
    description: "Interactive testing of arrow directions and tree flow",
    position: {
      horizontal: "center",
      vertical: "top",
    },
  },
};

// Create chart instance
let rightAngleChart = new TreeChart("right-angle-container", chartConfig);

// Function to update chart settings and re-render
function updateChart() {
  const arrowDirection = document.getElementById("arrow-direction").value;
  const treeAlignment = document.getElementById("tree-alignment").value;

  // Update configuration
  chartConfig.edgeConfig.arrowDirection = arrowDirection;
  chartConfig.horizontalAlign = treeAlignment;

  // Update title description to reflect current settings
  chartConfig.titleConfig.description = `Arrow: ${getArrowDisplayText(
    arrowDirection
  )}, Flow: ${getFlowDisplayText(treeAlignment)}`;

  // Create new chart instance with updated config
  rightAngleChart = new TreeChart("right-angle-container", chartConfig);
  rightAngleChart.render(rightAngleTestData);

  // Update settings display
  updateSettingsDisplay(arrowDirection, treeAlignment);
}

// Helper functions for display text
function getArrowDisplayText(direction) {
  switch (direction) {
    case "source-to-target":
      return "Parent → Child";
    case "target-to-source":
      return "Child → Parent";
    case "both":
      return "Both Directions";
    default:
      return direction;
  }
}

function getFlowDisplayText(alignment) {
  switch (alignment) {
    case "top-to-bottom":
      return "Top to Bottom";
    case "bottom-to-top":
      return "Bottom to Top";
    default:
      return alignment;
  }
}

// Update the settings display text
function updateSettingsDisplay(arrowDirection, treeAlignment) {
  const settingsText = document.getElementById("current-settings-text");
  settingsText.textContent = `${getArrowDisplayText(
    arrowDirection
  )}, ${getFlowDisplayText(treeAlignment)}`;
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", () => {
  // Render initial chart
  rightAngleChart.render(rightAngleTestData);

  // Add event listeners to dropdowns
  document
    .getElementById("arrow-direction")
    .addEventListener("change", updateChart);
  document
    .getElementById("tree-alignment")
    .addEventListener("change", updateChart);

  // Initialize settings display
  updateSettingsDisplay("source-to-target", "top-to-bottom");
});
