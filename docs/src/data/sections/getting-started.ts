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

Choose the package that matches your setup:

### Core Library (Vanilla JavaScript)

\`\`\`bash
npm install treecharts
# or
yarn add treecharts
\`\`\`

### React Wrapper

\`\`\`bash
npm install treecharts-react
# or
yarn add treecharts-react
\`\`\`

### CDN (Vanilla JavaScript)

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/treecharts@latest/dist/treecharts.min.js"></script>
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
};
