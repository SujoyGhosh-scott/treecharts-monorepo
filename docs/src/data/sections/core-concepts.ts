import { DocSection } from "@/types/docs";

export const coreConceptsSection: DocSection = {
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
};
