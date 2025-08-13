import { TreeChart } from "../src/index";

// Example tree data
const sampleTree = {
  value: "A",
  child: [
    {
      value: "B",
      edgeText: "edge text 1",
      child: [
        {
          value: "D",
          edgeText: "to D",
          child: [
            {
              value: "K",
              edgeText: "to K",
              nodeConfig: { color: "#98FB98", type: "circle" },
              child: [],
            },
            { value: "L", edgeText: "to L", child: [] },
          ],
        },
        {
          value: "E",
          edgeText: "to E",
          nodeConfig: { color: "#FFB6C1" },
          child: [],
        },
      ],
    },
    {
      value: "C",
      edgeText: "edge text 2",
      child: [{ value: "F", edgeText: "to F", child: [] }],
    },
    {
      value: "G",
      edgeText: "edge text 3",
      child: [{ value: "H", edgeText: "to H", child: [] }],
    },
    {
      value: "I",
      edgeText: "edge text 4",
      child: [
        {
          value: "M",
          edgeText: "to M",
          nodeConfig: {
            color: "#FFD700",
            type: "diamond",
            fontSize: 16,
            fontColor: "#8B4513",
          },
          child: [],
        },
        { value: "N", edgeText: "to N", child: [] },
      ],
    },
    {
      value: "J",
      edgeText: "edge text 5",
      child: [],
    },
    {
      value: "K",
      edgeText: "edge text 6",
      child: [],
    },
    {
      value: "L",
      edgeText: "edge text 7",
      child: [],
    },
  ],
};

// Create charts with different renderers using new structured options
const directChart = new TreeChart("direct-container", {
  type: "direct",
  nodeConfig: {
    color: "#87CEEB",
    fontSize: 11,
    fontColor: "#333333",
  },
  edgeConfig: {
    textSize: 11,
  },
});

const rightAngleChart = new TreeChart("right-angle-container", {
  type: "right-angle",
  nodeConfig: {
    color: "#87CEEB",
    fontSize: 11,
    fontColor: "#333333",
  },
  edgeConfig: {
    textSize: 11,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "right-angle-chart.svg",
    },
  },
});

const curvedChart = new TreeChart("curved-container", {
  type: "curved",
  nodeConfig: {
    color: "#87CEEB",
    fontSize: 11,
    fontColor: "#333333",
  },
  edgeConfig: {
    textSize: 11,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "bottom-left",
      filename: "curved-chart.svg",
    },
  },
});

const allDirectionChart = new TreeChart("all-direction-container", {
  type: "all-direction",
  nodeConfig: {
    color: "#87CEEB",
    fontSize: 11,
    fontColor: "#333333",
  },
  edgeConfig: {
    textSize: 11,
  },
});

// Initialize all charts
directChart.render(sampleTree);
rightAngleChart.render(sampleTree);
curvedChart.render(sampleTree);
allDirectionChart.render(sampleTree);

// Sample tree data for node-with-description demonstration
const sampleTreeWithDescription = {
  value: "Company Overview",
  description: "Global technology corporation",
  child: [
    {
      value: "Engineering",
      description:
        "Software development and R&D teams, Software development and R&D teams, Software development and R&D teams Software development and R&D teams Software development and R&D teams",
      edgeText: "tech",
      child: [
        {
          value: "Frontend",
          description: "User interface development",
          edgeText: "UI/UX",
          child: [
            {
              value: "React Team",
              description: "Component-based development",
              edgeText: "framework",
              child: [],
            },
            {
              value: "Design System",
              description: "Consistent UI components",
              edgeText: "standards",
              child: [],
            },
          ],
        },
        {
          value: "Backend",
          description: "Server-side logic and APIs",
          edgeText: "services",
          child: [
            {
              value: "Microservices",
              description: "Distributed system architecture",
              edgeText: "scalable",
              child: [],
            },
          ],
        },
      ],
    },
    {
      value: "Marketing",
      description: "Brand promotion and customer acquisition",
      edgeText: "outreach",
      child: [
        {
          value: "Digital Marketing",
          description: "Online campaigns and social media",
          edgeText: "online",
          child: [],
        },
      ],
    },
    {
      value: "Sales",
      description: "Revenue generation and client relations",
      edgeText: "revenue",
      child: [
        {
          value: "Enterprise Sales",
          description: "B2B client acquisition",
          edgeText: "B2B",
          child: [],
        },
        {
          value: "Customer Success",
          description: "Client retention and satisfaction",
          edgeText: "retention",
          child: [],
        },
      ],
    },
  ],
};

// Create a new chart for demonstrating node-with-description
const nodeWithDescriptionChart = new TreeChart(
  "node-with-description-container",
  {
    type: "right-angle",
    nodeConfig: {
      type: "node-with-description",
      color: "#E8F4FD",
      borderColor: "#2196F3",
      borderWidth: 2,
      borderRadius: 8,
      fontSize: 14,
      fontColor: "#1565C0",
      width: 180, // Wider default width to accommodate descriptions
      height: 60, // Taller default height
    },
    edgeConfig: {
      color: "#2196F3",
      width: 2,
      textSize: 11,
      textColor: "#666666",
    },
    titleConfig: {
      title: "Organization Structure with Descriptions",
      description: "Detailed view of company departments and their functions",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
  }
);

// Render the node-with-description chart
nodeWithDescriptionChart.render(sampleTreeWithDescription);

// Interactive controls
let activeChart = directChart;
const chartTypeSelect = document.getElementById("chart-type");
const verticalAlignSelect = document.getElementById("vertical-align");
const horizontalAlignSelect = document.getElementById("horizontal-align");
const nodeColorInput = document.getElementById("node-color");
const lineColorInput = document.getElementById("line-color");
const boxWidthInput = document.getElementById("box-width");
const boxHeightInput = document.getElementById("box-height");
const borderRadiusInput = document.getElementById("border-radius");
const lineWidthInput = document.getElementById("line-width");
const lineStyleSelect = document.getElementById("line-style");
const showArrowsInput = document.getElementById("show-arrows");
const arrowDirectionSelect = document.getElementById("arrow-direction");
const arrowSizeInput = document.getElementById("arrow-size");
const chartTitleInput = document.getElementById("chart-title");
const chartDescriptionInput = document.getElementById("chart-description");
const titleHorizontalSelect = document.getElementById("title-horizontal");
const titleVerticalSelect = document.getElementById("title-vertical");
const updateButton = document.getElementById("update-chart");
const resetButton = document.getElementById("reset-options");

// Update chart when button is clicked
updateButton.addEventListener("click", () => {
  // Get selected chart type
  const chartType = chartTypeSelect.value;

  // Get all options in structured format
  const options = {
    verticalAlign: verticalAlignSelect.value,
    horizontalAlign: horizontalAlignSelect.value,
    nodeConfig: {
      color: nodeColorInput.value,
      width: parseInt(boxWidthInput.value),
      height: parseInt(boxHeightInput.value),
      borderRadius: parseInt(borderRadiusInput.value),
    },
    edgeConfig: {
      color: lineColorInput.value,
      width: parseInt(lineWidthInput.value),
      dasharray: lineStyleSelect.value,
      showArrows: showArrowsInput.checked,
      arrowDirection: arrowDirectionSelect.value,
      arrowSize: parseInt(arrowSizeInput.value),
    },
    titleConfig: {
      title: chartTitleInput.value,
      description: chartDescriptionInput.value,
      position: {
        horizontal: titleHorizontalSelect.value,
        vertical: titleVerticalSelect.value,
      },
    },
  };

  // Update and render the appropriate chart
  switch (chartType) {
    case "direct":
      activeChart = directChart;
      break;
    case "right-angle":
      activeChart = rightAngleChart;
      break;
    case "curved":
      activeChart = curvedChart;
      break;
    case "all-direction":
      activeChart = allDirectionChart;
      break;
  }

  // Update chart options and re-render
  activeChart.setOptions(options).render(sampleTree);
});

// Reset to default options
resetButton.addEventListener("click", () => {
  // Reset form values
  verticalAlignSelect.value = "center";
  horizontalAlignSelect.value = "top-to-bottom";
  nodeColorInput.value = "#87CEEB";
  lineColorInput.value = "#000000";
  boxWidthInput.value = "80";
  boxHeightInput.value = "40";
  borderRadiusInput.value = "0";
  lineWidthInput.value = "1";
  lineStyleSelect.value = "";
  showArrowsInput.checked = false;
  arrowDirectionSelect.value = "source-to-target";
  arrowSizeInput.value = "6";
  chartTitleInput.value = "";
  chartDescriptionInput.value = "";
  titleHorizontalSelect.value = "center";
  titleVerticalSelect.value = "top";

  // Re-render all charts with default options in structured format
  const defaultOptions = {
    verticalAlign: "center",
    horizontalAlign: "top-to-bottom",
    nodeConfig: {
      color: "#87CEEB",
      width: 80,
      height: 40,
      borderRadius: 0,
    },
    edgeConfig: {
      color: "#000000",
      width: 1,
      dasharray: "",
      showArrows: false,
      arrowDirection: "source-to-target",
      arrowSize: 6,
    },
    titleConfig: {
      title: "",
      description: "",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
  };

  directChart
    .setOptions({ ...defaultOptions, type: "direct" })
    .render(sampleTree);

  rightAngleChart
    .setOptions({ ...defaultOptions, type: "right-angle" })
    .render(sampleTree);

  curvedChart
    .setOptions({ ...defaultOptions, type: "curved" })
    .render(sampleTree);

  allDirectionChart
    .setOptions({ ...defaultOptions, type: "all-direction" })
    .render(sampleTree);
});

// Update chart type selection change
chartTypeSelect.addEventListener("change", (e) => {
  const chartType = e.target.value;
  switch (chartType) {
    case "direct":
      activeChart = directChart;
      break;
    case "right-angle":
      activeChart = rightAngleChart;
      break;
    case "curved":
      activeChart = curvedChart;
      break;
    case "all-direction":
      activeChart = allDirectionChart;
      break;
  }

  // Highlight the active chart container
  document.querySelectorAll(".chart-container").forEach((container) => {
    container.style.border = "1px solid #ccc";
  });

  document.getElementById(`${chartType}-container`).style.border =
    "2px solid #4CAF50";
});

// Initialize by highlighting the direct chart
document.getElementById("direct-container").style.border = "2px solid #4CAF50";
