import { TreeChart } from "../src/index";

// Test data for node-with-description
const nodeWithDescriptionTestData = {
  value:
    "Root Node with Very Long Title That Should Wrap Across Multiple Lines",
  description:
    "This is a very long description that should wrap across multiple lines to test the text wrapping functionality in node-with-description type. Let's make it even longer to ensure proper testing of the text wrapping algorithm.",
  nodeConfig: {
    type: "node-with-description",
    width: 200,
    color: "#E8F4FD",
  },
  child: [
    {
      value:
        "Child Node A with Extremely Long Title That Will Definitely Need Text Wrapping",
      description:
        "Another very long description for the child node. This description is intentionally verbose to test the text wrapping capabilities. It should wrap nicely across multiple lines within the specified node width.",
      nodeConfig: {
        type: "node-with-description",
        width: 180,
        color: "#FFF2CC",
      },
      child: [],
    },
    {
      value: "Child Node B with Another Long Title for Testing",
      description:
        "This is the second child node with its own long description. The text wrapping should work consistently across all nodes in the tree.",
      nodeConfig: {
        type: "node-with-description",
        width: 220,
        color: "#D5E8D4",
      },
      child: [],
    },
  ],
};

// Test data for collapsible nodes
const collapsibleNodeTestData = {
  value:
    "Collapsible Root Node with Long Title for Testing Text Wrapping Feature",
  description:
    "This is a collapsible root node with a long description. When expanded, this description should be visible and properly wrapped. When collapsed, only the title should be visible with expand/collapse functionality.",
  nodeConfig: {
    type: "collapsible-node",
    width: 220,
    color: "#E1D5E7",
    collapsible: true,
  },
  child: [
    {
      value: "Collapsible Child A with Very Long Title That Needs Wrapping",
      description:
        "This collapsible child node has a detailed description that should wrap properly. You can expand and collapse this node to test the functionality.",
      nodeConfig: {
        type: "collapsible-node",
        width: 200,
        color: "#FFE6CC",
        collapsible: true,
      },
      child: [],
    },
    {
      value: "Collapsible Child B with Another Long Title for Testing",
      description:
        "Another collapsible child node with its own description. The expand/collapse feature should work independently for each node.",
      nodeConfig: {
        type: "collapsible-node",
        width: 190,
        color: "#F8CECC",
        collapsible: true,
      },
      child: [],
    },
  ],
};

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
    showArrows: true, // ENABLED for testing the enhancement
    arrowDirection: "source-to-target", // Will be updated by dropdown
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "arrow-direction-test-chart.svg",
    },
  },
  titleConfig: {
    title:
      "Interactive Arrow Direction & Tree Alignment Testing Dashboard with Advanced Configuration Options",
    description:
      "This comprehensive interactive testing environment allows you to dynamically configure and test various arrow directions and tree flow alignments. Use the dropdown controls below to experiment with different arrow directions (parent-to-child, child-to-parent, or bidirectional) combined with tree flow orientations (top-to-bottom or bottom-to-top). The chart will automatically update to reflect your selections, providing real-time visual feedback for testing and validation purposes. This tool is particularly useful for developers and designers who need to understand how different arrow configurations affect the visual hierarchy and flow of organizational charts, family trees, decision trees, and other hierarchical data structures.",
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

  // Create and render node-with-description test chart
  const nodeWithDescriptionChart = new TreeChart(
    "node-with-description-container",
    {
      nodeConfig: {
        width: 180,
        height: 40,
        color: "#f0f0f0",
        borderColor: "#333",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 14,
        fontColor: "#333",
        padding: 8,
      },
      edgeConfig: {
        color: "#666",
        width: 2,
      },
      containerConfig: {
        backgroundColor: "#ffffff",
        padding: 20,
      },
    }
  );
  nodeWithDescriptionChart.render(nodeWithDescriptionTestData);

  // Create and render collapsible node test chart
  const collapsibleNodeChart = new TreeChart("collapsible-node-container", {
    nodeConfig: {
      width: 180,
      height: 40,
      color: "#f0f0f0",
      borderColor: "#333",
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 14,
      fontColor: "#333",
      padding: 8,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    containerConfig: {
      backgroundColor: "#ffffff",
      padding: 20,
    },
  });
  collapsibleNodeChart.render(collapsibleNodeTestData);

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
