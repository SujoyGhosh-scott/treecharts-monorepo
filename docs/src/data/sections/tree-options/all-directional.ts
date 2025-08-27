import { DocTopic } from "@/types/docs";

export const allDirectionalTopic: DocTopic = {
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
};
