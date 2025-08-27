import { DocTopic } from "@/types/docs";

export const curvedTopic: DocTopic = {
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
};
