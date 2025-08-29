import { DocSection } from "@/types/docs";

export const gettingStartedSection: DocSection = {
  id: "getting-started",
  title: "Getting Started",
  description: "Learn how to install and use TreeCharts in your project",
  content: [
    {
      type: "markdown",
      value: `# Getting Started

TreeCharts is a powerful, flexible library for creating interactive tree visualizations. It supports React and vanilla JavaScript with a highly customizable and lightweight architecture.

## Installation

Choose the package that matches your setup:`,
    },
    {
      type: "code",
      title: "Installation Commands",
      description: "Install TreeCharts for your preferred framework",
      id: "installation-commands",
      showOutput: false,
      codes: {
        javascript: `# Core Library (Vanilla JavaScript)

# CDN Alternative
# <script src="https://cdn.jsdelivr.net/npm/treecharts@latest/dist/treecharts.min.js"></script>`,
        react: `# React Wrapper
npm install treecharts-react
# or
yarn add treecharts-react`,
      },
    },
    {
      type: "markdown",
      value: `## Quick Start

Once installed, you can create your first tree chart in just a few lines:`,
    },
    {
      type: "code",
      title: "Quick Start Example",
      description: "Create your first tree chart with minimal setup",
      id: "quick-start-example",
      outputImage: "/docs/getting-started-example.svg",
      codes: {
        javascript: `// Define your tree data structure
const treeData = {
  value: "Root Node",
  child: [
    { value: "Child 1", child: [] },
    { value: "Child 2", child: [] }
  ]
};

// Create the tree chart
const chart = new TreeChart("container", {
  type: "right-angle",
  nodeConfig: {
    color: "#90EE90",
    width: 120,
  }
});

// Render the tree
chart.render(treeData);`,
        react: `import { TreeChart } from 'treecharts-react';

const treeData = {
  value: "Root Node",
  child: [
    { value: "Child 1", child: [] },
    { value: "Child 2", child: [] }
  ]
};

function MyComponent() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      nodeConfig={{
        color: "#90EE90",
        width: 120,
      }}
    />
  );
}`,
      },
    },
    {
      type: "markdown",
      value: `## TypeScript Support

All packages include TypeScript definitions out of the box.

## What's Next?

- [Core Concepts](/docs/core-concepts) - Learn the fundamentals
- [Tree Options](/docs/tree-options) - Explore different layouts and connections
- [Node Types](/docs/node-types) - Customize how nodes are displayed
- [Edge Customization](/docs/edge-customization) - Control the appearance of connections
- [Tree Alignment](/docs/tree-alignment) - Adjust the positioning of nodes and branches
`,
    },
  ],
  topics: [],
};
