import { Navigation } from "@/types/docs";

export const docsNavigation: Navigation = {
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn how to install and use TreeCharts in your project",
      content: `
# Getting Started

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

Once installed, you can create your first tree chart in just a few lines:

\`\`\`javascript
// Define your data structure
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

chart.render();
\`\`\`

## TypeScript Support

All packages include TypeScript definitions out of the box.

## What's Next?

- [Basic Usage](/docs/core-concepts/basic-usage) - Learn the fundamentals
- [Tree Options](/docs/tree-options) - Explore different layouts and connections  
- [Node Types](/docs/node-types) - Customize how nodes are displayed
      `,
      topics: [],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      description: "Understanding the fundamentals of TreeCharts",
      content: `
# Core Concepts

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

### Required Properties

- **name**: The display text for the node
- **children**: Array of child nodes (optional)

### Optional Properties

- **id**: Unique identifier for the node
- **description**: Additional text description
- **image**: URL to an image for the node
- **customData**: Any additional data you want to store

## Renderers

TreeCharts supports multiple node renderers:

- **Circle**: Simple circular nodes
- **Rectangle**: Rectangular nodes with text
- **Image**: Nodes with images
- **Collapsible**: Nodes that can expand/collapse children

## Connections

Different connection types are available:

- **Direct**: Straight lines between nodes
- **Curved**: Smooth curved connections  
- **Right Angle**: L-shaped connections
- **All Directional**: Multi-directional layouts

## Layout Directions

Trees can be oriented in different directions:

- **Down**: Traditional top-to-bottom layout
- **Up**: Bottom-to-top layout
- **Left**: Right-to-left layout
- **Right**: Left-to-right layout
      `,
      topics: [
        {
          id: "basic-usage",
          title: "Basic Usage",
          description: "Learn how to create your first tree chart",
          path: "/docs/core-concepts/basic-usage",
          content: `
# Basic Usage

Create your first tree chart with minimal configuration.

## Simple Family Tree Example

This example shows how to create a basic family tree with just a few lines of code. The tree will display a simple hierarchical structure with parent-child relationships.
          `,
        },
      ],
    },
    {
      id: "tree-options",
      title: "Tree Options",
      description: "Different tree layout and connection types",
      topics: [
        {
          id: "direct",
          title: "Direct Connection",
          description: "Simple straight-line connections between nodes",
          path: "/docs/tree-options/direct",
          content: `
# Direct Connection

Direct connections use straight lines to connect parent and child nodes.

## Features

- Clean, minimal appearance
- Best for simple hierarchical data
- Fast rendering performance
          `,
        },
        {
          id: "right-angle",
          title: "Right Angle",
          description: "90-degree angle connections for structured layouts",
          path: "/docs/tree-options/right-angle",
          content: `
# Right Angle Connections

Right angle connections create structured, grid-like layouts.

## Features

- Professional appearance
- Clear hierarchical structure
- Good for organizational charts
          `,
        },
        {
          id: "all-directional",
          title: "All Directional",
          description: "Multi-directional tree layouts",
          path: "/docs/tree-options/all-directional",
          content: `
# All Directional Layout

All directional trees can expand in multiple directions from the root.

## Features

- Flexible positioning
- Optimal space utilization
- Great for complex relationships
          `,
        },
        {
          id: "family-tree",
          title: "Family Tree",
          description: "Specialized layout for family relationships",
          path: "/docs/tree-options/family-tree",
          tag: "new",
          content: `
# Family Tree Layout

Specialized layout designed specifically for family relationships and genealogy.

## Features

- Support for marriages and partnerships
- Multiple parent relationships
- Gender-specific styling options
- Generation-based alignment
          `,
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
          description: "Standard text-based nodes",
          path: "/docs/node-types/regular-nodes",
          content: `
# Regular Nodes

Standard nodes that display text content in simple shapes.

## Basic Text Nodes

The most common node type for displaying names and labels.
          `,
        },
        {
          id: "custom-shape-nodes",
          title: "Custom Shape Nodes",
          description: "Nodes with custom shapes and styling",
          path: "/docs/node-types/custom-shape-nodes",
          content: `
# Custom Shape Nodes

Create nodes with custom shapes like circles, rectangles, hexagons, and more.

## Available Shapes

- Circle
- Rectangle 
- Rounded Rectangle
- Hexagon
- Diamond
- Custom SVG paths
          `,
        },
        {
          id: "node-with-description",
          title: "Node with Description",
          description: "Nodes that include additional descriptive text",
          path: "/docs/node-types/node-with-description",
          content: `
# Node with Description

Nodes that can display both a title and additional descriptive text.

## Features

- Primary title text
- Secondary description text
- Flexible text positioning
- Custom typography options
          `,
        },
        {
          id: "collapsible-node",
          title: "Collapsible Node",
          description: "Interactive nodes that can expand/collapse children",
          path: "/docs/node-types/collapsible-node",
          content: `
# Collapsible Nodes

Interactive nodes that allow users to expand and collapse child branches.

## Features

- Click to expand/collapse
- Visual indicators for collapsed state
- Smooth animations
- Keyboard navigation support
          `,
        },
        {
          id: "image-node",
          title: "Image Node",
          description: "Nodes that display images alongside text",
          path: "/docs/node-types/image-node",
          tag: "new",
          content: `
# Image Nodes

Nodes that can display images alongside or instead of text content.

## Features

- Support for various image formats
- Automatic image sizing
- Fallback options for failed loads
- Custom image positioning
          `,
        },
      ],
    },
    {
      id: "node-styling",
      title: "Node Styling",
      description: "Customize the appearance of your tree nodes",
      topics: [
        {
          id: "colors-and-themes",
          title: "Colors and Themes",
          description: "Apply colors, gradients, and theme styling to nodes",
          path: "/docs/node-styling/colors-and-themes",
          content: `
# Colors and Themes

Customize the visual appearance of your tree nodes with colors and themes.

## Color Options

- Background colors
- Border colors
- Text colors
- Gradient fills
- Theme-based color schemes
          `,
        },
        {
          id: "typography",
          title: "Typography",
          description: "Control fonts, sizes, and text styling",
          path: "/docs/node-styling/typography",
          content: `
# Typography

Control the typography and text styling of your tree nodes.

## Text Styling Options

- Font family selection
- Font size and weight
- Text alignment
- Line height and spacing
- Text shadows and effects
          `,
        },
      ],
    },
    {
      id: "edges-customization",
      title: "Edges Customization",
      description: "Style the connections between nodes",
      content: `
# Edges Customization

Customize the appearance and behavior of connections between nodes in your tree charts.

## Line Styles

Control the visual appearance of connection lines:

### Basic Styling

\`\`\`javascript
const chart = new TreeChart(container, {
  data: data,
  edgeStyles: {
    stroke: '#08CB00',
    strokeWidth: 2,
    strokeDasharray: '5,5' // Dashed lines
  }
});
\`\`\`

### Styling Options

- **Line thickness**: Control stroke width
- **Line colors**: Set stroke color
- **Dash patterns**: Create dashed or dotted lines
- **Arrow styles**: Add directional arrows
- **Curved vs straight**: Choose connection style

## Connection Types

Different connection renderers are available:

- **Direct**: Simple straight lines
- **Curved**: Smooth bezier curves  
- **Right Angle**: L-shaped connections
- **All Directional**: Multi-directional layouts

## Animations

Add smooth animations to edge connections:

### Animation Types

- **Draw-in animations**: Lines appear progressively
- **Hover effects**: Interactive highlighting
- **Connection transitions**: Smooth changes
- **Loading animations**: Progressive tree building

### Example

\`\`\`javascript
const chart = new TreeChart(container, {
  data: data,
  animations: {
    enabled: true,
    duration: 800,
    easing: 'ease-in-out'
  }
});
\`\`\`
      `,
      topics: [],
    },
    {
      id: "alignment-and-options",
      title: "Alignment and Other Options",
      description: "Control layout, positioning, and additional features",
      topics: [
        {
          id: "horizontal-alignment",
          title: "Horizontal Alignment",
          description: "Control horizontal positioning and spacing",
          path: "/docs/alignment-and-options/horizontal-alignment",
          content: `
# Horizontal Alignment

Control how nodes are positioned horizontally within the tree layout.

## Alignment Options

- Left alignment
- Center alignment
- Right alignment
- Justified spacing
- Custom spacing controls
          `,
        },
        {
          id: "vertical-alignment",
          title: "Vertical Alignment",
          description: "Control vertical positioning and spacing",
          path: "/docs/alignment-and-options/vertical-alignment",
          content: `
# Vertical Alignment

Control how nodes are positioned vertically within the tree layout.

## Alignment Options

- Top alignment
- Middle alignment
- Bottom alignment
- Even spacing
- Custom vertical spacing
          `,
        },
        {
          id: "tree-title",
          title: "Tree Title and Description",
          description: "Add titles and descriptions to your trees",
          path: "/docs/alignment-and-options/tree-title",
          content: `
# Tree Title and Description

Add descriptive titles and descriptions to provide context for your trees.

## Features

- Main tree title
- Subtitle support
- Description text
- Custom positioning
- Styling options
          `,
        },
        {
          id: "action-buttons",
          title: "Action Buttons",
          description: "Add interactive buttons for tree operations",
          path: "/docs/alignment-and-options/action-buttons",
          content: `
# Action Buttons

Add interactive buttons to provide users with tree manipulation capabilities.

## Available Actions

- Zoom in/out
- Reset view
- Export options
- Print functionality
- Full screen mode
- Data filtering
          `,
        },
      ],
    },
  ],
};
