import { DocTopic } from "@/types/docs";

export const directConnectionTopic: DocTopic = {
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
      description: "Create a tree chart with clean, straight-line connections",
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

- **Node Configuration** - See [Node Styling](/docs/node-types/regular-nodes) and [Node Types](/docs/node-types)
- **Edge Configuration** - See [Edges Customization](/docs/edge-customization)`,
    },
  ],
};
