import { Navigation } from "@/types/docs";

export const docsNavigation: Navigation = {
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn how to install and use TreeCharts in your project",
      topics: [
        {
          id: "installation",
          title: "Installation",
          description:
            "Install TreeCharts for React, Angular, Vue, or vanilla JavaScript",
          path: "/docs/getting-started/installation",
          content: `
# Installation

TreeCharts provides packages for all major frontend frameworks and vanilla JavaScript.

## React

\`\`\`bash
npm install @treecharts/react
# or
yarn add @treecharts/react
\`\`\`

## Angular

\`\`\`bash
npm install @treecharts/angular
# or
yarn add @treecharts/angular
\`\`\`

## Vue

\`\`\`bash
npm install @treecharts/vue
# or
yarn add @treecharts/vue
\`\`\`

## CDN (Vanilla JavaScript)

\`\`\`html
<script src="https://cdn.jsdelivr.net/npm/@treecharts/core@latest/dist/treecharts.min.js"></script>
\`\`\`

## TypeScript Support

All packages include TypeScript definitions out of the box.
          `,
        },
        {
          id: "quick-start",
          title: "Quick Start",
          description: "Create your first tree visualization in minutes",
          path: "/docs/getting-started/quick-start",
          content: `
# Quick Start

Get up and running with TreeCharts in just a few minutes.

## React Example

\`\`\`jsx
import React from 'react';
import { TreeChart } from '@treecharts/react';

const data = {
  name: "Root",
  children: [
    { name: "Child 1" },
    { name: "Child 2" }
  ]
};

function App() {
  return (
    <TreeChart
      data={data}
      width={800}
      height={600}
      nodeRenderer="circle"
      connectionRenderer="direct"
    />
  );
}
\`\`\`

## Angular Example

\`\`\`typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <tree-chart
      [data]="treeData"
      [width]="800"
      [height]="600"
      nodeRenderer="circle"
      connectionRenderer="direct">
    </tree-chart>
  \`
})
export class AppComponent {
  treeData = {
    name: "Root",
    children: [
      { name: "Child 1" },
      { name: "Child 2" }
    ]
  };
}
\`\`\`

## Vue Example

\`\`\`vue
<template>
  <TreeChart
    :data="treeData"
    :width="800"
    :height="600"
    node-renderer="circle"
    connection-renderer="direct"
  />
</template>

<script>
import { TreeChart } from '@treecharts/vue';

export default {
  components: {
    TreeChart
  },
  data() {
    return {
      treeData: {
        name: "Root",
        children: [
          { name: "Child 1" },
          { name: "Child 2" }
        ]
      }
    };
  }
};
</script>
\`\`\`
          `,
        },
      ],
    },
    {
      id: "core-concepts",
      title: "Core Concepts",
      description: "Understand the fundamental concepts of TreeCharts",
      topics: [
        {
          id: "data-structure",
          title: "Data Structure",
          description:
            "Learn about the expected data format for tree visualizations",
          path: "/docs/core-concepts/data-structure",
          content: `
# Data Structure

TreeCharts expects a hierarchical data structure that represents your tree.

## Basic Structure

\`\`\`typescript
interface TreeNode {
  name: string;
  children?: TreeNode[];
  // Optional properties
  id?: string;
  description?: string;
  image?: string;
  customData?: any;
}
\`\`\`

## Example

\`\`\`javascript
const treeData = {
  name: "CEO",
  children: [
    {
      name: "CTO",
      children: [
        { name: "Lead Developer" },
        { name: "DevOps Engineer" }
      ]
    },
    {
      name: "CMO",
      children: [
        { name: "Marketing Manager" },
        { name: "Content Creator" }
      ]
    }
  ]
};
\`\`\`

## Advanced Properties

You can include additional data for enhanced visualizations:

\`\`\`javascript
const advancedData = {
  name: "John Doe",
  description: "Chief Executive Officer",
  image: "/path/to/image.jpg",
  customData: {
    department: "Executive",
    startDate: "2020-01-01"
  },
  children: [...]
};
\`\`\`
          `,
        },
        {
          id: "rendering-pipeline",
          title: "Rendering Pipeline",
          description: "Understand how TreeCharts renders your visualizations",
          path: "/docs/core-concepts/rendering-pipeline",
          content: `
# Rendering Pipeline

TreeCharts uses a flexible rendering pipeline that separates concerns.

## Pipeline Steps

1. **Data Processing**: Your input data is processed and validated
2. **Layout Calculation**: Node positions are calculated based on the tree structure
3. **Node Rendering**: Individual nodes are rendered using the specified node renderer
4. **Connection Drawing**: Connections between nodes are drawn using the connection renderer
5. **Interaction Setup**: Event handlers and interactions are configured

## Customization Points

You can customize each step of the pipeline:

- **Node Renderers**: Control how individual nodes appear
- **Connection Renderers**: Control how connections between nodes are drawn
- **Layout Algorithms**: Control how nodes are positioned
- **Event Handlers**: Control how users interact with the tree

## Performance Considerations

TreeCharts is optimized for large trees:

- Virtual rendering for trees with many nodes
- Efficient re-rendering on data changes
- Configurable rendering options for performance tuning
          `,
        },
      ],
    },
    {
      id: "tree-types",
      title: "Tree Types",
      description: "Explore different tree visualization styles",
      topics: [
        {
          id: "direct-connection",
          title: "Direct Connection Tree",
          description: "Simple straight lines connecting nodes",
          path: "/docs/tree-types/direct-connection",
          content: `
# Direct Connection Tree

The simplest form of tree visualization using straight lines to connect nodes.

## Usage

\`\`\`jsx
<TreeChart
  data={data}
  connectionRenderer="direct"
/>
\`\`\`

## Characteristics

- Clean, minimal appearance
- Fastest rendering performance
- Best for simple hierarchies
- Good for small to medium trees

## Customization

\`\`\`jsx
<TreeChart
  data={data}
  connectionRenderer="direct"
  connectionStyle={{
    stroke: "#333",
    strokeWidth: 2,
    strokeDasharray: "5,5" // Dashed lines
  }}
/>
\`\`\`
          `,
        },
        {
          id: "right-angle",
          title: "Right Angle Tree",
          description: "Connections with right angles for cleaner organization",
          path: "/docs/tree-types/right-angle",
          content: `
# Right Angle Tree

Tree visualization using right-angled connections for a more structured appearance.

## Usage

\`\`\`jsx
<TreeChart
  data={data}
  connectionRenderer="rightAngle"
/>
\`\`\`

## Characteristics

- Professional, organized appearance
- Clear parent-child relationships
- Good for organizational charts
- Works well with any tree size

## Customization Options

- Corner radius for rounded corners
- Line thickness and color
- Gap spacing between levels
          `,
        },
        {
          id: "curved-edges",
          title: "Curved Edges Tree",
          description: "Smooth curved connections for elegant visualizations",
          path: "/docs/tree-types/curved-edges",
          content: `
# Curved Edges Tree

Elegant tree visualization with smooth curved connections.

## Usage

\`\`\`jsx
<TreeChart
  data={data}
  connectionRenderer="curved"
/>
\`\`\`

## Characteristics

- Elegant, flowing appearance
- Organic, natural feel
- Great for creative presentations
- Smooth visual transitions

## Curve Options

- Bezier curve tension
- Curve direction
- Multiple curve styles
          `,
        },
        {
          id: "all-direction",
          title: "All Direction Tree",
          description: "Nodes can be positioned in any direction from the root",
          path: "/docs/tree-types/all-direction",
          content: `
# All Direction Tree

A flexible tree layout where nodes can extend in all directions from the root.

## Usage

\`\`\`jsx
<TreeChart
  data={data}
  layout="allDirection"
  connectionRenderer="curved"
/>
\`\`\`

## Characteristics

- Maximum space utilization
- Radial-like appearance
- Good for complex hierarchies
- Flexible node positioning

## Layout Options

- Starting angle
- Angular distribution
- Radius calculation
- Collision detection
          `,
        },
      ],
    },
    {
      id: "node-types",
      title: "Node Types",
      description: "Different ways to display nodes in your tree",
      topics: [
        {
          id: "regular-nodes",
          title: "Regular Nodes",
          description: "Standard rectangular and circular nodes",
          path: "/docs/node-types/regular-nodes",
          content: `
# Regular Nodes

The basic node types available in TreeCharts.

## Circle Nodes

\`\`\`jsx
<TreeChart
  data={data}
  nodeRenderer="circle"
/>
\`\`\`

## Rectangle Nodes

\`\`\`jsx
<TreeChart
  data={data}
  nodeRenderer="rectangle"
/>
\`\`\`

## Customization

\`\`\`jsx
<TreeChart
  data={data}
  nodeRenderer="circle"
  nodeStyle={{
    fill: "#3b82f6",
    stroke: "#1d4ed8",
    strokeWidth: 2,
    radius: 30
  }}
/>
\`\`\`
          `,
        },
        {
          id: "custom-nodes",
          title: "Custom Nodes",
          description: "Create your own node renderers",
          path: "/docs/node-types/custom-nodes",
          content: `
# Custom Nodes

Create custom node renderers for unique visualizations.

## Custom Renderer

\`\`\`jsx
const CustomNodeRenderer = ({ node, x, y }) => (
  <g transform={\`translate(\${x}, \${y})\`}>
    <rect width={100} height={50} fill="#f3f4f6" stroke="#374151" />
    <text x={50} y={25} textAnchor="middle" dominantBaseline="middle">
      {node.name}
    </text>
  </g>
);

<TreeChart
  data={data}
  nodeRenderer={CustomNodeRenderer}
/>
\`\`\`

## Advanced Custom Nodes

- Interactive elements
- Complex layouts
- Dynamic styling
- Animation support
          `,
        },
      ],
    },
    {
      id: "customization",
      title: "Other Customization",
      description: "Advanced customization options for your trees",
      topics: [
        {
          id: "tree-title",
          title: "Tree Title",
          description: "Add titles and headers to your trees",
          path: "/docs/customization/tree-title",
          content: `
# Tree Title

Add descriptive titles to your tree visualizations.

## Basic Title

\`\`\`jsx
<TreeChart
  data={data}
  title="Organization Chart"
/>
\`\`\`

## Custom Title Styling

\`\`\`jsx
<TreeChart
  data={data}
  title="Organization Chart"
  titleStyle={{
    fontSize: 24,
    fontWeight: "bold",
    fill: "#1f2937"
  }}
/>
\`\`\`

## Multiple Titles

- Main title
- Subtitle
- Custom positioning
          `,
        },
        {
          id: "action-buttons",
          title: "Action Buttons",
          description: "Add interactive buttons to your trees",
          path: "/docs/customization/action-buttons",
          content: `
# Action Buttons

Add interactive action buttons to enhance user experience.

## Basic Actions

\`\`\`jsx
<TreeChart
  data={data}
  actions={[
    {
      label: "Expand All",
      onClick: () => expandAll(),
      icon: "expand"
    },
    {
      label: "Reset Zoom",
      onClick: () => resetZoom(),
      icon: "reset"
    }
  ]}
/>
\`\`\`

## Custom Actions

- Export to image
- Print functionality
- Data filtering
- View switching
          `,
        },
      ],
    },
  ],
};
