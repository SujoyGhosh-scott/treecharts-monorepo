import { docsNavigation } from "../../../../data/docs";
import CodeDisplay from "../../../../components/docs/CodeDisplay";

const example = {
  title: "Basic Family Tree",
  description: "A simple family tree showing parent-child relationships",
  id: "basic-family-tree",
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

    angular: `import { Component } from '@angular/core';
import { TreeChartModule } from '@treecharts/angular';

@Component({
  selector: 'app-family-tree',
  template: \`
    <tree-chart
      [data]="treeData"
      nodeRenderer="circle"
      direction="down"
      [width]="800"
      [height]="600">
    </tree-chart>
  \`,
  standalone: true,
  imports: [TreeChartModule]
})
export class FamilyTreeComponent {
  treeData = {
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
}`,

    vue: `<template>
  <TreeChart
    :data="treeData"
    node-renderer="circle"
    direction="down"
    :width="800"
    :height="600"
  />
</template>

<script setup>
import { TreeChart } from '@treecharts/vue';

const treeData = {
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
</script>`,
  },
};

export default function BasicUsagePage() {
  // Find the basic-usage topic
  const doc = docsNavigation.sections
    .flatMap((section) => section.topics)
    .find((topic) => topic.id === "basic-usage");

  if (!doc) {
    return <div>Documentation not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-macondo">{doc.title}</h1>
        <p className="text-lg text-base-content/70">{doc.description}</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-macondo">Simple Family Tree Example</h2>
        <p>
          This example shows how to create a basic family tree with just a few
          lines of code. The tree will display a simple hierarchical structure
          with parent-child relationships.
        </p>

        <CodeDisplay example={example} />

        <h2 className="font-macondo">Key Concepts</h2>
        <ul>
          <li>
            <strong>Data Structure:</strong> TreeCharts expects a nested object
            with optional <code>children</code> arrays
          </li>
          <li>
            <strong>Node Renderer:</strong> Determines how each node is visually
            displayed (circle, rectangle, etc.)
          </li>
          <li>
            <strong>Direction:</strong> Controls the flow of the tree (down, up,
            left, right)
          </li>
          <li>
            <strong>Container:</strong> The DOM element or component where the
            tree will be rendered
          </li>
        </ul>

        <h2 className="font-macondo">Next Steps</h2>
        <p>Now that you have a basic tree running, you can explore:</p>
        <ul>
          <li>
            <a href="/docs/node-types/circle-nodes" className="text-primary">
              Circle Node Styling
            </a>
          </li>
          <li>
            <a href="/docs/tree-options/direction" className="text-primary">
              Tree Direction Options
            </a>
          </li>
          <li>
            <a
              href="/docs/edges-customization/styling"
              className="text-primary"
            >
              Customizing Connections
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
