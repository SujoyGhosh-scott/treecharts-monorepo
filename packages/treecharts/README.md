# TreeCharts

A flexible and customizable library for creating tree visualizations.

## Installation

```bash
npm install treecharts
```

## Basic Usage

```javascript
import { TreeChart } from "treecharts";

// Sample tree data
const treeData = {
  value: "Root",
  child: [
    {
      value: "Child 1",
      child: [
        { value: "Grandchild 1.1", child: [] },
        { value: "Grandchild 1.2", child: [] },
      ],
    },
    {
      value: "Child 2",
      child: [],
    },
  ],
};

// Create a tree chart instance
const chart = new TreeChart("container-id");

// Render the chart
chart.render(treeData);
```

## Visualization Types

TreeCharts supports four different visualization types:

### Direct Connections

```javascript
const chart = new TreeChart("container-id", { type: "direct" });
```

### Right Angle Connections

```javascript
const chart = new TreeChart("container-id", { type: "right-angle" });
```

### Curved Connections

```javascript
const chart = new TreeChart("container-id", { type: "curved" });
```

### All Direction (Radial)

```javascript
const chart = new TreeChart("container-id", { type: "all-direction" });
```

## Configuration Options

TreeCharts can be customized with various options:

```javascript
const chart = new TreeChart("container-id", {
  // Type of tree visualization
  type: "direct", // 'direct', 'right-angle', 'curved', 'all-direction'

  // Node dimensions
  boxWidth: 80,
  boxHeight: 40,

  // Spacing
  horizontalGap: 30,
  verticalGap: 80,

  // Alignment
  verticalAlign: "center", // 'left', 'center', 'right'
  horizontalAlign: "top-to-bottom", // 'top-to-bottom', 'bottom-to-top'

  // Styling
  nodeColor: "skyblue",
  lineColor: "black",
  nodeBorderRadius: 0,
  nodeBorderColor: "black",
  fontSize: 14,
  fontColor: "black",
});
```

## Methods

### render(data)

Renders the tree chart with the provided data.

```javascript
chart.render(treeData);
```

### update(data)

Updates the chart with new data.

```javascript
chart.update(newTreeData);
```

### setOptions(options)

Updates chart options.

```javascript
chart.setOptions({
  nodeColor: "lightgreen",
  lineColor: "#333",
});
```

### setType(type)

Changes the visualization type.

```javascript
chart.setType("curved");
```

### setContainer(containerId)

Sets a new container for the chart.

```javascript
chart.setContainer("new-container-id");
```

### resize(width, height)

Resizes the chart.

```javascript
chart.resize(800, 600);
```

### getSvg()

Gets the rendered SVG element.

```javascript
const svg = chart.getSvg();
```

## Development

To set up the development environment:

```bash
# Install dependencies
npm install

# Start development server
npm run dev:watch
```

This will start a Vite development server at **http://localhost:5173/** with live reloading and display interactive examples of all chart types.

**Important**: Access the development page through `http://localhost:5173/` rather than opening the HTML file directly to ensure proper module loading.

Alternative commands:

- `npm run dev`: Start Vite server only
- `npm run build`: Build the library for production

## License

MIT
