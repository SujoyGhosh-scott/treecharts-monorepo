import { TreeChart } from "../src/index";

// Example tree data
const sampleTree = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        {
          value: "D",
          child: [
            { value: "K", child: [] },
            { value: "L", child: [] },
          ],
        },
        { value: "E", child: [] },
      ],
    },
    {
      value: "C",
      child: [{ value: "F", child: [] }],
    },
    {
      value: "G",
      child: [{ value: "H", child: [] }],
    },
    {
      value: "I",
      child: [
        { value: "M", child: [] },
        { value: "N", child: [] },
      ],
    },
    {
      value: "J",
      child: [],
    },
    {
      value: "K",
      child: [],
    },
    {
      value: "L",
      child: [],
    },
  ],
};

// Create charts with different renderers
const directChart = new TreeChart("direct-container", {
  type: "direct",
  nodeColor: "#87CEEB",
});

const rightAngleChart = new TreeChart("right-angle-container", {
  type: "right-angle",
  nodeColor: "#87CEEB",
});

const curvedChart = new TreeChart("curved-container", {
  type: "curved",
  nodeColor: "#87CEEB",
});

const allDirectionChart = new TreeChart("all-direction-container", {
  type: "all-direction",
  nodeColor: "#87CEEB",
});

// Initialize all charts
directChart.render(sampleTree);
rightAngleChart.render(sampleTree);
curvedChart.render(sampleTree);
allDirectionChart.render(sampleTree);

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
const updateButton = document.getElementById("update-chart");
const resetButton = document.getElementById("reset-options");

// Update chart when button is clicked
updateButton.addEventListener("click", () => {
  // Get selected chart type
  const chartType = chartTypeSelect.value;

  // Get all options
  const options = {
    verticalAlign: verticalAlignSelect.value,
    horizontalAlign: horizontalAlignSelect.value,
    nodeColor: nodeColorInput.value,
    lineColor: lineColorInput.value,
    boxWidth: parseInt(boxWidthInput.value),
    boxHeight: parseInt(boxHeightInput.value),
    nodeBorderRadius: parseInt(borderRadiusInput.value),
    lineWidth: parseInt(lineWidthInput.value),
    lineDasharray: lineStyleSelect.value,
    showArrows: showArrowsInput.checked,
    arrowDirection: arrowDirectionSelect.value,
    arrowSize: parseInt(arrowSizeInput.value),
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

  // Re-render all charts with default options
  const defaultOptions = {
    verticalAlign: "center",
    horizontalAlign: "top-to-bottom",
    nodeColor: "#87CEEB",
    lineColor: "#000000",
    boxWidth: 80,
    boxHeight: 40,
    nodeBorderRadius: 0,
    lineWidth: 1,
    lineDasharray: "",
    showArrows: false,
    arrowDirection: "source-to-target",
    arrowSize: 6,
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
