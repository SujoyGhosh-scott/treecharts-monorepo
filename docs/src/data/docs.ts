import { Navigation } from "@/types/docs";

export const docsNavigation: Navigation = {
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn how to install and use TreeCharts in your project",
      content: [
        {
          type: "markdown",
          value: `# Getting Started

TreeCharts is a powerful, flexible library for creating interactive tree visualizations. It supports all major frontend frameworks and vanilla JavaScript.

## Installation

Choose the package that matches your framework:

### React

\`\`\`bash
npm install @treecharts/react
# or
yarn add @treecharts/react
\`\`\`

### Angular

\`\`\`bash
npm install @treecharts/angular
# or
yarn add @treecharts/angular
\`\`\`

### Vue

\`\`\`bash
npm install @treecharts/vue
# or
yarn add @treecharts/vue
\`\`\`

### CDN (Vanilla JavaScript)

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@treecharts/core@latest/dist/treecharts.min.js"></script>
\`\`\`

## Quick Start

Once installed, you can create your first tree chart in just a few lines:`,
        },
        {
          type: "code",
          title: "Quick Start Example",
          description: "Create your first tree chart with minimal setup",
          id: "quick-start-example",
          codes: {
            javascript: `// Define your data structure
const data = {
  name: "Root Node",
  children: [
    { name: "Child 1" },
    { name: "Child 2" }
  ]
};

// Create the tree chart
const chart = new TreeChart(container, {
  data: data,
  nodeRenderer: 'circle'
});

chart.render();`,
          },
        },
        {
          type: "markdown",
          value: `## TypeScript Support

All packages include TypeScript definitions out of the box.

## What's Next?

- [Basic Usage](/docs/core-concepts/basic-usage) - Learn the fundamentals
- [Tree Options](/docs/tree-options) - Explore different layouts and connections  
- [Node Types](/docs/node-types) - Customize how nodes are displayed`,
        },
      ],
      topics: [],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      description: "Understanding the fundamentals of TreeCharts",
      content: [
        {
          type: "markdown",
          value: `# Core Concepts

TreeCharts works with a simple nested data structure and provides flexible options for rendering and layout.

## Tree Data Structure

TreeCharts accepts a nested object structure where each node can have children:

\`\`\`json
{
  "name": "Root Node",
  "children": [
    {
      "name": "Child 1",
      "children": [
        { "name": "Grandchild 1" },
        { "name": "Grandchild 2" }
      ]
    },
    {
      "name": "Child 2"
    }
  ]
}
\`\`\`

## Configuration Options

TreeCharts provides extensive configuration options for customizing the appearance and behavior of your trees.`,
        },
      ],
      topics: [
        {
          id: "basic-usage",
          title: "Basic Usage",
          description: "Learn the fundamentals of creating tree charts",
          path: "/docs/core-concepts/basic-usage",
          content: [
            {
              type: "markdown",
              value: `# Basic Usage

Learn how to create your first tree chart with TreeCharts.

## Overview

TreeCharts makes it easy to create beautiful, interactive tree visualizations from your hierarchical data.`,
            },
            {
              type: "code",
              title: "Basic Family Tree",
              description:
                "A simple family tree showing parent-child relationships",
              id: "basic-family-tree",
              outputImage: "/docs/tree/basic-family-tree-example.svg",
              codes: {
                javascript: `// Create a basic tree chart
const data = {
  name: "John Smith",
  children: [
    {
      name: "Jane Smith",
      children: [
        { name: "Bob Smith" },
        { name: "Alice Smith" }
      ]
    },
    {
      name: "Mike Smith",
      children: [
        { name: "Emma Smith" }
      ]
    }
  ]
};

// Initialize the tree chart
const chart = new TreeChart(document.getElementById('tree-container'), {
  data: data,
  nodeRenderer: 'circle',
  direction: 'down'
});

// Render the chart
chart.render();`,
                react: `import { TreeChart } from '@treecharts/react';

const data = {
  name: "John Smith",
  children: [
    {
      name: "Jane Smith",
      children: [
        { name: "Bob Smith" },
        { name: "Alice Smith" }
      ]
    },
    {
      name: "Mike Smith",
      children: [
        { name: "Emma Smith" }
      ]
    }
  ]
};

function FamilyTree() {
  return (
    <TreeChart
      data={data}
      nodeRenderer="circle"
      direction="down"
      width={800}
      height={600}
    />
  );
}

export default FamilyTree;`,
              },
            },
          ],
        },
      ],
    },
    {
      id: "tree-options",
      title: "Tree Options",
      description: "Different tree layout and connection types",
      content: [
        {
          type: "markdown",
          value: `# Tree Options

TreeCharts offers four distinct connection types to suit different visualization needs. Each renderer creates a unique visual style and is optimized for specific use cases. Each renderer supports the same core configuration options while providing its own unique visual characteristics.

## Available Renderers

### Direct Connection
Clean, straight-line connections between nodes. Perfect for simple hierarchies and when performance matters.

### Right Angle Connection  
Professional 90-degree angle connections that create structured, grid-like layouts. Ideal for organizational charts.

### Curved Connection
Smooth, flowing curved lines that create organic and visually appealing tree structures. Great for creative presentations.

### All Directional Layout
Radial tree layout with the root at center and children distributed in all directions. Optimal for complex networks and space efficiency.

## Choosing the Right Renderer

- **Direct** - Use for simple, clean hierarchies and maximum performance
- **Right Angle** - Choose for professional, structured organizational charts  
- **Curved** - Select for visually appealing, organic tree presentations
- **All Directional** - Pick for complex trees, network diagrams, or space-constrained layouts

## Configuration Options

### Node Configuration
- Colors, sizes, shapes, fonts, and borders
- Custom styling and theming options

### Node Behavior and Interactivity  
- Click handlers, hover effects, selection states
- Interactive features and event handling`,
        },
      ],
      topics: [
        {
          id: "direct",
          title: "Direct Connection",
          description: "Simple straight-line connections between nodes",
          path: "/docs/tree-options/direct",
          content: [
            {
              type: "markdown",
              value: `# Direct Connection

Direct connections provide the foundation for clean, professional tree visualizations that focus on content over visual effects. Direct connections use clean, straight lines to connect parent and child nodes, providing the most minimal and straightforward tree visualization.`,
            },
            {
              type: "code",
              title: "Direct Connection Example",
              description:
                "Create a tree chart with clean, straight-line connections",
              id: "direct-connection-example",
              outputImage: "/docs/tree/direct-renderer-example.svg",
              codes: {
                javascript: `import { TreeChart } from '@treecharts/core';

// Define your tree data
const treeData = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        { value: "D", child: [] },
        { value: "E", child: [] }
      ]
    },
    {
      value: "C",
      child: [
        { value: "F", child: [] }
      ]
    }
  ]
};

// Create chart with direct connections
const chart = new TreeChart("container-id", {
  type: "direct",
  nodeConfig: {
    color: "#08CB00"
  }
});

// Render the tree
chart.render(treeData);`,
              },
            },
            {
              type: "markdown",
              value: `## Features

- **Clean, minimal appearance** - Straight lines create a clutter-free visualization
- **Best performance** - Fastest rendering with minimal computational overhead
- **Clear hierarchy** - Direct visual path from parent to child
- **Universal compatibility** - Works well in all contexts and screen sizes

## When to Use

Direct connections are ideal for simple organizational charts, basic hierarchical data visualization, and situations when performance is critical. They work particularly well for clean professional presentations, mobile applications where better touch interaction is needed, and high-density data where clarity is important.

## Configuration Options

The direct renderer supports all standard TreeChart configuration options. For detailed customization:

- **Node Configuration** - See [Node Styling](/docs/node-styling) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edges-customization)`,
            },
          ],
        },
        {
          id: "right-angle",
          title: "Right Angle",
          description: "90-degree angle connections for structured layouts",
          path: "/docs/tree-options/right-angle",
          content: [
            {
              type: "markdown",
              value: `# Right Angle Connections

Right angle connections provide the most structured and professional approach to tree visualization, making them ideal for corporate and formal applications. Right angle connections create structured, professional layouts using clean 90-degree angles to connect parent and child nodes.`,
            },
            {
              type: "code",
              title: "Right Angle Connection Example",
              description:
                "Create structured layouts with 90-degree angle connections",
              id: "right-angle-connection-example",
              outputImage: "/docs/tree/right-angle-renderer-example.svg",
              codes: {
                javascript: `import { TreeChart } from '@treecharts/core';

// Define your tree data
const treeData = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        { value: "D", child: [] },
        { value: "E", child: [] }
      ]
    },
    {
      value: "C",
      child: [
        { value: "F", child: [] }
      ]
    }
  ]
};

// Create chart with right angle connections
const chart = new TreeChart("container-id", {
  type: "right-angle",
  nodeConfig: {
    color: "#08CB00"
  }
});

// Render the tree
chart.render(treeData);`,
              },
            },
            {
              type: "markdown",
              value: `## Features

- **Professional appearance** - Clean, structured look perfect for business use
- **Clear hierarchical structure** - Easy to follow parent-child relationships
- **Grid-like alignment** - Nodes align perfectly in rows and columns
- **Optimal for organizational charts** - Industry standard for corporate hierarchies

## When to Use

Right angle connections are perfect for organizational charts and corporate hierarchies, flowcharts and process diagrams, and system architecture diagrams. They excel in structured data visualization, formal presentations and reports, and any scenario where you need clear visual separation between levels.

## Configuration Options

The right angle renderer supports all standard TreeChart configuration options. For detailed customization:

- **Node Configuration** - See [Node Styling](/docs/node-styling) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edges-customization)`,
            },
          ],
        },
        {
          id: "curved",
          title: "Curved Connection",
          description: "Smooth curved connections for organic tree layouts",
          path: "/docs/tree-options/curved",
          content: [
            {
              type: "markdown",
              value: `# Curved Connection

The curved renderer creates beautiful, flowing tree visualizations that are perfect for when you want to add visual elegance to your hierarchical data. Curved connections use smooth, flowing lines to connect parent and child nodes, creating an organic and visually appealing appearance.`,
            },
            {
              type: "code",
              title: "Curved Connection Example",
              description:
                "Create organic tree layouts with smooth, flowing curved connections",
              id: "curved-connection-example",
              outputImage: "/docs/tree/curved-renderer-example.svg",
              codes: {
                javascript: `import { TreeChart } from '@treecharts/core';

// Define your tree data
const treeData = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        { value: "D", child: [] },
        { value: "E", child: [] }
      ]
    },
    {
      value: "C",
      child: [
        { value: "F", child: [] }
      ]
    }
  ]
};

// Create chart with curved connections
const chart = new TreeChart("container-id", {
  type: "curved",
  nodeConfig: {
    color: "#08CB00"
  }
});

// Render the tree
chart.render(treeData);`,
              },
            },
            {
              type: "markdown",
              value: `## Features

- **Smooth, curved lines** - Creates elegant flowing connections between nodes
- **Organic appearance** - Perfect for natural hierarchies and mind maps
- **Visual appeal** - More aesthetically pleasing than straight lines
- **Better readability** - Easier to follow complex tree structures

## When to Use

Curved connections work best for mind maps and brainstorming diagrams, creative and artistic presentations, and family trees and genealogy charts. They're particularly effective for natural hierarchies like biological classifications and any scenario where you want a softer, more organic visual style.

## Configuration Options

The curved renderer supports all standard TreeChart configuration options. For detailed customization:

- **Node Configuration** - See [Node Styling](/docs/node-styling) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edges-customization)`,
            },
          ],
        },
        {
          id: "all-directional",
          title: "All Directional",
          description: "Multi-directional tree layouts",
          path: "/docs/tree-options/all-directional",
          content: [
            {
              type: "markdown",
              value: `# All Directional Layout

All directional layouts create visually stunning tree visualizations that make optimal use of space while providing clear hierarchical relationships in a radial format. All directional trees use a radial layout where nodes are distributed in multiple directions from the center, creating space-efficient and visually striking tree visualizations.`,
            },
            {
              type: "code",
              title: "All Directional Layout Example",
              description:
                "Create radial tree layouts with nodes distributed in all directions",
              id: "all-directional-layout-example",
              outputImage: "/docs/tree/all-direction-renderer-example.svg",
              codes: {
                javascript: `import { TreeChart } from '@treecharts/core';

// Define your tree data
const treeData = {
  value: "A",
  child: [
    {
      value: "B",
      child: [
        { value: "D", child: [] },
        { value: "E", child: [] }
      ]
    },
    {
      value: "C",
      child: [
        { value: "F", child: [] }
      ]
    },
    {
      value: "G", child: [] },
    {
      value: "H", child: [] },
    {
      value: "I", child: [] }
  ]
};

// Create chart with all-directional layout
const chart = new TreeChart("container-id", {
  type: "all-direction",
  nodeConfig: {
    color: "#08CB00"
  }
});

// Render the tree
chart.render(treeData);`,
              },
            },
            {
              type: "markdown",
              value: `## Features

- **Radial layout** - Root node at center with children radiating outward
- **Space efficient** - Optimal use of available space in all directions
- **Scalable design** - Handles large trees better than linear layouts
- **Visual impact** - Creates striking, eye-catching diagrams

## When to Use

All directional layouts work best for network diagrams and relationship maps, mind maps and brainstorming sessions, and complex hierarchies with many branches. They're particularly effective when space is limited but the tree is large, for scientific diagrams like molecular structures and taxonomies, social network visualizations, and hub-and-spoke organizational structures.

## Configuration Options

The all-directional renderer has specialized options for radial layouts. For detailed customization:

- **Node Configuration** - See [Node Styling](/docs/node-styling) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edges-customization)`,
            },
          ],
        },
      ],
    },
    {
      id: "node-types",
      title: "Node Types",
      description: "Different node styles and configurations",
      topics: [
        {
          id: "regular-nodes",
          title: "Regular Nodes",
          description: "Standard geometric shapes for displaying text content",
          path: "/docs/node-types/regular-nodes",
          content: [
            {
              type: "markdown",
              value: `# Regular Nodes

Regular nodes are the fundamental building blocks of TreeCharts, offering a variety of geometric shapes to display text content. They provide clean, professional visualizations perfect for organizational charts, decision trees, mind maps, and hierarchical data structures.

Regular nodes offer extensive customization options. Here are some examples of what you can achieve:`,
            },
            {
              type: "image-grid",
              images: [
                {
                  src: "/docs/node/regular/regular-node-visual-styling.svg",
                  alt: "Visual styling with colors, borders, and shadows",
                  description: "Colors, borders, and shadows",
                },
                {
                  src: "/docs/node/regular/regular-node-text-styling.svg",
                  alt: "Typography customization with fonts and sizing",
                  description: "Typography customization",
                },
                {
                  src: "/docs/node/regular/regular-node-advanced-styling.svg",
                  alt: "Advanced effects with gradients and shadows",
                  description: "Gradients and advanced effects",
                },
                {
                  src: "/docs/node/regular/regular-node-individual-config.svg",
                  alt: "Individual node styling for different departments",
                  description: "Per-node styling options",
                },
              ],
              gridConfig: {
                desktop: 4,
                mobile: 2,
                gap: "1.5rem",
                maxWidth: "1000px",
              },
            },
            {
              type: "markdown",
              value: `## Default Configuration

Regular nodes come with sensible defaults that create clean, professional visualizations:

| Property | Default Value | Description |
|----------|---------------|-------------|
| \`type\` | \`"rectangle"\` | Node shape |
| \`width\` | \`80\` | Node width in pixels |
| \`height\` | \`40\` | Node height in pixels |
| \`color\` | \`"skyblue"\` | Background color |
| \`borderColor\` | \`"black"\` | Border color |
| \`borderWidth\` | \`1\` | Border thickness |
| \`borderRadius\` | \`6\` | Corner roundness (rectangles only) |
| \`opacity\` | \`1\` | Node transparency (0-1) |
| \`fontSize\` | \`14\` | Text size in pixels |
| \`fontColor\` | \`"black"\` | Text color |
| \`fontFamily\` | \`"Arial, sans-serif"\` | Font family |`,
            },
            {
              type: "markdown",
              value: `## Basic Configuration Options

### Dimensions and Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`width\` | \`number\` | \`80\` | Node width in pixels |
| \`height\` | \`number\` | \`40\` | Node height in pixels |
| \`padding\` | \`number\` | \`5\` | Internal text padding |

### Colors and Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`color\` | \`string\` | \`"skyblue"\` | Background color (CSS color) |
| \`borderColor\` | \`string\` | \`"black"\` | Border color (CSS color) |
| \`borderWidth\` | \`number\` | \`1\` | Border thickness in pixels |
| \`borderRadius\` | \`number\` | \`6\` | Corner roundness (rectangles only) |
| \`opacity\` | \`number\` | \`1\` | Node transparency (0-1) |

### Typography

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`fontSize\` | \`number\` | \`14\` | Text size in pixels |
| \`fontColor\` | \`string\` | \`"black"\` | Text color (CSS color) |
| \`fontFamily\` | \`string\` | \`"Arial, sans-serif"\` | Font family |`,
            },
            {
              type: "markdown",
              value: `## Advanced Styling Options

### Shadow Effects

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`shadow\` | \`boolean\` | \`false\` | Enable drop shadow |
| \`shadowColor\` | \`string\` | \`"rgba(0,0,0,0.3)"\` | Shadow color |
| \`shadowOffset\` | \`{x: number, y: number}\` | \`{x: 2, y: 2}\` | Shadow offset |

### Gradient Fills

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`gradient\` | \`boolean\` | \`false\` | Enable gradient fill |
| \`gradientStartColor\` | \`string\` | \`""\` | Gradient start color |
| \`gradientEndColor\` | \`string\` | \`""\` | Gradient end color |

### Custom Attributes

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`customAttributes\` | \`object\` | \`{}\` | Custom SVG attributes |`,
            },
            {
              type: "markdown",
              value: `## Individual Node Configuration

One of TreeCharts' most powerful features is the ability to configure individual nodes differently while maintaining a consistent default style for the rest of the tree. This is achieved using the \`nodeConfig\` property directly in your tree data.

### How It Works

Each node in your tree data can include a \`nodeConfig\` property that overrides the default configuration for that specific node. This allows you to:

- Highlight important nodes with different colors
- Use different shapes for different node types
- Create visual hierarchies and categories
- Apply special styling to specific branches

### Configuration Priority

The configuration follows this priority order:
1. **Individual node config** (highest priority)
2. **Global node config** (default fallback)
3. **Built-in defaults** (lowest priority)`,
            },
            {
              type: "code",
              title: "Individual Node Configuration Example",
              description:
                "Apply different styling to individual nodes using nodeConfig",
              id: "individual-node-config",
              outputImage:
                "/docs/node/regular/regular-node-individual-config.svg",
              codes: {
                javascript: `// Tree data with individual node configurations
const treeData = {
  value: "Root",
  child: [
    {
      value: "Child 1",
      nodeConfig: {
        color: "#FF6B6B",        // Red background
        fontColor: "white",      // White text
        borderColor: "#FF5252",  // Darker red border
        borderWidth: 2
      },
      child: []
    },
    {
      value: "Child 2",
      nodeConfig: {
        color: "#FFE66D",        // Yellow background
        fontColor: "#333",       // Dark text
        borderColor: "#FFC107",  // Orange border
        borderWidth: 2
      },
      child: []
    }
  ]
};

// Create chart with default styling
const chart = new TreeChart("container", {
  type: "direct",
  nodeConfig: {
    type: "rectangle",
    color: "#E3F2FD",          // Light blue (default)
    borderColor: "#2196F3",     // Blue border (default)
    borderWidth: 2,
    borderRadius: 6,
    fontSize: 14,
    fontColor: "#1976D2",       // Dark blue text (default)
    width: 120,
    height: 50
  }
});

// The root node will use default styling
// Child nodes will use their individual nodeConfig
chart.render(treeData);`,
              },
            },
            {
              type: "markdown",
              value: `
## Common Use Cases

### Organizational Charts
Use rectangles with professional colors and clear typography for corporate hierarchies.

### Decision Trees  
Combine rectangles for processes and diamonds for decision points.

### Mind Maps
Use circles or rounded rectangles with different colors for various categories.

### Process Flows
Use different shapes to represent different types of process steps.`,
            },
          ],
        },
      ],
    },
  ],
};
