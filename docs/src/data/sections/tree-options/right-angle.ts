import { DocTopic } from "@/types/docs";

export const rightAngleTopic: DocTopic = {
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
      description: "Create structured layouts with 90-degree angle connections",
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

- **Node Configuration** - See [Node Styling](/docs/node-types/regular-nodes) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edge-customization)`,
    },
  ],
};
