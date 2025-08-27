import { DocSection } from "@/types/docs";

export const gettingStartedSection: DocSection = {
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
};
