import { DocSection } from "@/types/docs";

export const coreConceptsSection: DocSection = {
  id: "core-concepts",
  title: "Core Concepts",
  description: "Understanding the fundamentals of TreeCharts",
  topics: [],
  content: [
    {
      type: "markdown",
      value: `# Core Concepts

TreeCharts takes your nested tree data and generates lightweight, highly customizable tree charts. It works with a simple nested data structure and provides flexible options for rendering and layout.

## Tree Data Structure

TreeCharts uses a nested object structure where each node can have children. The correct format uses \`value\` for the node text and \`child\` for the children array:

\`\`\`json
{
  "value": "Root Node",
  "child": [
    {
      "value": "Child 1",
      "child": [
        { "value": "Grandchild 1", "child": [] },
        { "value": "Grandchild 2", "child": [] }
      ]
    },
    {
      "value": "Child 2",
      "child": []
    }
  ]
}
\`\`\`

TreeCharts now works with this specific format, but we're working on supporting more common tree data structures in upcoming versions!

## Basic Usage

Learn how to create your first tree chart with TreeCharts using the same data structure shown above.`,
    },
    {
      type: "code",
      title: "Basic Tree Example",
      description: "Converting the tree data structure into a visual chart",
      id: "basic-tree-example",
      outputImage: "/docs/core-concepts-example.svg",
      codes: {
        react: `import { TreeChart } from 'treecharts-react';

// Using the same tree data from above
const treeData = {
  value: "Root Node",
  child: [
    {
      value: "Child 1",
      child: [
        { value: "Grandchild 1", child: [] },
        { value: "Grandchild 2", child: [] }
      ]
    },
    {
      value: "Child 2",
      child: []
    }
  ]
};

function BasicTree() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      nodeConfig={{
        color: "#90EE90",
        width: 120,
      }}
      width={600}
      height={400}
    />
  );
}

export default BasicTree;`,
        javascript: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TreeCharts Basic Example</title>
</head>
<body>
  <!-- Container for the tree chart -->
  <div id="tree-container" style="width: 600px; height: 400px; margin: 20px auto;"></div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script>
    // Using the same tree data from above
    const treeData = {
      value: "Root Node",
      child: [
        {
          value: "Child 1",
          child: [
            { value: "Grandchild 1", child: [] },
            { value: "Grandchild 2", child: [] }
          ]
        },
        {
          value: "Child 2",
          child: []
        }
      ]
    };

    // Initialize the tree chart
    const chart = new TreeChart("tree-container", {
      type: "right-angle",
      nodeConfig: {
        color: "#90EE90",
        width: 120,
      }
    }); 

    // Render the chart
    chart.render(treeData);
  </script>
</body>
</html>`,
      },
    },
    {
      type: "markdown",
      value: `## Next Steps

Now that you understand the basics, to personalize your chart based on your needs for further customization, please check out the following concepts and features:

- [Tree Options](/docs/tree-options) - Different connection types and layouts
- [Node Types](/docs/node-types) - Various node shapes and styles  
- [Edge Customization](/docs/edge-customization) - Customize connections between nodes
- [Tree Alignment](/docs/tree-alignment) - Control positioning and flow direction`,
    },
  ],
};
