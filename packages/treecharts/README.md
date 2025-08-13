# TreeCharts

A flexible and customizable library for creating tree visualizations with multiple rendering types and advanced styling options.

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

// Create a tree chart instance with title and structured options
const chart = new TreeChart("container-id", {
  type: "direct",
  titleConfig: {
    title: "My Organization Chart",
    description: "Team structure overview",
    position: {
      horizontal: "center",
      vertical: "top",
    },
  },
  nodeConfig: {
    width: 100,
    height: 50,
    color: "#4CAF50",
    fontSize: 12,
    fontColor: "white",
  },
  edgeConfig: {
    color: "#666",
    width: 2,
  },
});

// Render the chart
chart.render(treeData);
```

## Visualization Types

TreeCharts supports four different visualization types:

### Direct Connections

```javascript
const chart = new TreeChart("container-id", {
  type: "direct",
  nodeConfig: { color: "#4CAF50" },
  edgeConfig: { color: "#666" },
});
```

### Right Angle Connections

```javascript
const chart = new TreeChart("container-id", {
  type: "right-angle",
  nodeConfig: { color: "#2196F3" },
  edgeConfig: { color: "#666" },
});
```

### Curved Connections

```javascript
const chart = new TreeChart("container-id", {
  type: "curved",
  nodeConfig: { color: "#FF9800" },
  edgeConfig: {
    color: "#666",
    curveRadius: 20,
  },
});
```

### All Direction (Radial)

```javascript
const chart = new TreeChart("container-id", {
  type: "all-direction",
  nodeConfig: { color: "#9C27B0" },
  edgeConfig: { color: "#666" },
});
```

## Node Types

The library supports multiple node shapes and types:

```javascript
// Rectangle nodes (default)
nodeConfig: {
  type: "rectangle";
}

// Circular nodes
nodeConfig: {
  type: "circle";
}

// Diamond nodes
nodeConfig: {
  type: "diamond";
}

// Hexagon nodes
nodeConfig: {
  type: "hexagon";
}

// Triangle nodes
nodeConfig: {
  type: "triangle";
}

// Pentagon nodes
nodeConfig: {
  type: "pentagon";
}

// Octagon nodes
nodeConfig: {
  type: "octagon";
}

// Star nodes
nodeConfig: {
  type: "star";
}

// Node with Description (NEW in v0.3.0)
nodeConfig: {
  type: "node-with-description";
}
```

### Node with Description (v0.3.0+)

The `node-with-description` type allows you to display both a main value and descriptive text in a single node, perfect for organizational charts, process flows, or any scenario where additional context is valuable.

```javascript
const orgChartData = {
  value: "Engineering",
  description:
    "Software development and R&D teams responsible for product innovation",
  nodeConfig: { type: "node-with-description" },
  child: [
    {
      value: "Frontend",
      description: "User interface development",
      nodeConfig: { type: "node-with-description" },
      child: [],
    },
    {
      value: "Backend",
      description: "Server-side logic and APIs",
      nodeConfig: { type: "node-with-description" },
      child: [],
    },
  ],
};

const chart = new TreeChart("container-id", {
  type: "right-angle",
  nodeConfig: {
    type: "node-with-description",
    color: "#4CAF50",
  },
});

chart.render(orgChartData);
```

**Features of Node with Description:**

- **Automatic Text Wrapping**: Long descriptions wrap intelligently at word boundaries
- **Dynamic Sizing**: Nodes resize automatically based on content length
- **Smart Layout**: Chart layout adjusts to prevent overlapping with variable-height nodes
- **Typography Hierarchy**: Main text is bold, description text is smaller and gray
- **Maximum Width**: Configurable maximum width prevents overly wide nodes

## Complete Examples

### Node with Description Example (v0.3.0+)

```javascript
const organizationChart = new TreeChart("container-id", {
  type: "right-angle",
  titleConfig: {
    title: "Organization Structure with Descriptions",
    description: "Detailed view of company departments and their functions",
    position: { horizontal: "center", vertical: "top" },
  },
  nodeConfig: {
    type: "node-with-description",
    width: 120,
    height: 60,
    color: "#4CAF50",
    borderRadius: 8,
    fontSize: 14,
    fontColor: "white",
  },
  edgeConfig: {
    type: "right-angle",
    color: "#666",
    width: 2,
  },
});

const orgData = {
  value: "Company Overview",
  description: "Global technology corporation",
  child: [
    {
      value: "Engineering",
      description:
        "Software development and R&D teams, Software development and R&D teams",
      child: [
        {
          value: "Frontend",
          description: "User interface development",
          child: [],
        },
        {
          value: "Backend",
          description: "Server-side logic and APIs",
          child: [],
        },
      ],
    },
    {
      value: "Marketing",
      description: "Brand promotion and customer acquisition",
      child: [
        {
          value: "Digital Marketing",
          description: "Online campaigns and social media",
          child: [],
        },
      ],
    },
    {
      value: "Sales",
      description: "Revenue generation and client relations",
      child: [],
    },
  ],
};

organizationChart.render(orgData);
```

### Advanced Styling Example

```javascript
const chart = new TreeChart("container-id", {
  type: "curved",
  horizontalGap: 50,
  verticalGap: 80,

  nodeConfig: {
    type: "circle",
    width: 80,
    height: 80,
    gradient: true,
    gradientStartColor: "#FF6B6B",
    gradientEndColor: "#C0392B",
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { x: 3, y: 3 },
    fontSize: 12,
    fontColor: "white",
  },

  edgeConfig: {
    type: "curved",
    color: "#34495E",
    width: 3,
    showArrows: true,
    arrowDirection: "source-to-target",
    arrowSize: 10,
    curveRadius: 25,
  },
});
```

### Diamond Nodes with Custom Styling

```javascript
const chart = new TreeChart("container-id", {
  type: "direct",

  nodeConfig: {
    type: "diamond",
    width: 100,
    height: 60,
    color: "#3498DB",
    borderColor: "#2980B9",
    borderWidth: 2,
    fontSize: 11,
    fontColor: "white",
  },

  edgeConfig: {
    color: "#7F8C8D",
    width: 2,
    dasharray: "5,5", // Dashed lines
    showArrows: true,
  },
});
```

## Configuration Options

TreeCharts uses a structured options format that organizes configuration into logical groups:

### Node Configuration (`nodeConfig`)

Controls all aspects related to how nodes appear:

```javascript
const chart = new TreeChart("container-id", {
  nodeConfig: {
    // Node shape and dimensions
    type: "rectangle", // "rectangle", "circle", "diamond", "hexagon", "triangle", etc.
    width: 100,
    height: 50,

    // Visual styling
    color: "#4CAF50",
    borderColor: "#2E7D32",
    borderWidth: 2,
    borderRadius: 8,
    opacity: 1,

    // Text styling
    fontSize: 12,
    fontColor: "white",
    fontFamily: "Arial",

    // Advanced styling
    shadow: true,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { x: 2, y: 2 },
    gradient: true,
    gradientStartColor: "#4CAF50",
    gradientEndColor: "#2E7D32",
  },
});
```

### Edge Configuration (`edgeConfig`)

Controls all aspects related to connections between nodes:

```javascript
const chart = new TreeChart("container-id", {
  edgeConfig: {
    // Connection styling
    type: "direct", // "direct", "right-angle", "curved", "custom"
    color: "#666",
    width: 2,
    opacity: 1,
    dasharray: "", // "5,5" for dashed lines

    // Arrow options
    showArrows: true,
    arrowDirection: "source-to-target", // "source-to-target", "target-to-source", "both"
    arrowSize: 8,
    arrowColor: "#666",

    // Curve options (for curved connections)
    curveRadius: 20,

    // Edge text styling
    textSize: 10,
    textColor: "#333",
    textBackgroundColor: "white",
  },
});
```

### Chart Layout Options

General chart layout and positioning:

```javascript
const chart = new TreeChart("container-id", {
  // Visualization type
  type: "direct", // "direct", "right-angle", "curved", "all-direction"

  // Spacing
  horizontalGap: 40,
  verticalGap: 60,

  // Alignment
  verticalAlign: "center", // "left", "center", "right"
  horizontalAlign: "top-to-bottom", // "top-to-bottom", "bottom-to-top"
});
```

### Title Configuration (`titleConfig`)

Add titles and descriptions to your charts:

````javascript
const chart = new TreeChart("container-id", {
  titleConfig: {
    // Title and description text
    title: "My Organization Chart",
    description: "Company hierarchy as of 2025",

    // Position configuration
    position: {
      horizontal: "center", // "left", "center", "right"
      vertical: "top", // "top", "bottom"
    },

    // Title styling (optional)
    titleStyle: {
      fontSize: 20,
      fontColor: "#333333",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      margin: 20,
    },

    // Description styling (optional)
    descriptionStyle: {
      fontSize: 14,
      fontColor: "#666666",
      fontFamily: "Arial, sans-serif",
      fontWeight: "normal",
      margin: 10,
    },
  }
});
```## Methods

### render(data)

Renders the tree chart with the provided data.

```javascript
chart.render(treeData);
````

### update(data)

Updates the chart with new data.

```javascript
chart.update(newTreeData);
```

### setOptions(options)

Updates chart options using the structured format.

```javascript
chart.setOptions({
  nodeConfig: {
    color: "#E74C3C",
    borderRadius: 10,
  },
  edgeConfig: {
    color: "#34495E",
    width: 3,
  },
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

## Data Format

TreeCharts expects data in a specific nested format:

```javascript
const treeData = {
  value: "Root Node", // Text to display in the node
  edgeText: "edge label", // Optional: text to display on the edge leading to this node
  child: [
    // Array of child nodes
    {
      value: "Child 1",
      edgeText: "to child 1",
      child: [
        {
          value: "Grandchild 1.1",
          edgeText: "to grandchild",
          child: [], // Empty array for leaf nodes
        },
      ],
    },
    {
      value: "Child 2",
      child: [],
    },
  ],
};
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
