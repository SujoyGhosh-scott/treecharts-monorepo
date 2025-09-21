import { DocTopic } from "@/types/docs";

export const nodeWithDescriptionTopic: DocTopic = {
  id: "node-with-description",
  title: "Node with Description",
  description: "Enhanced nodes with additional descriptive text content",
  path: "/docs/node-types/node-with-description",
  content: [
    {
      type: "markdown",
      value: `# Node with Description

Node with Description extends regular nodes by adding descriptive text beneath the main node value. This node type is perfect for organizational charts, process flows, and any scenario where you need to provide additional context or details for each node while maintaining a clean visual hierarchy.

These nodes automatically handle text wrapping and layout to ensure optimal readability while preserving the overall tree structure.`,
    },
    {
      type: "code",
      title: "Node with Description Example",
      description:
        "Create nodes with additional descriptive text for better context and information",
      id: "node-with-description-example",
      outputImage: "/docs/node/other/node-with-description-example.svg",
      codes: {
        react: `import { TreeChart } from 'treecharts-react';

// Tree data with descriptions
const treeData = {
  value: "Company",
  description: "Technology startup with innovative solutions",
  child: [
    {
      value: "Engineering",
      description: "Software development and technical teams",
      child: [],
    },
    {
      value: "Marketing",
      description: "Brand promotion and customer acquisition",
      child: [],
    },
    {
      value: "Sales",
      description: "Revenue generation and client relations",
      child: [],
    },
  ],
};

function NodeWithDescriptionTree() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      nodeConfig={{
        type: "node-with-description",
        color: "#e8f4fd",
        width: 180,
        padding: 10,
      }}
      edgeConfig={{
        color: "#7f8c8d",
        width: 1.5,
      }}
      titleConfig={{
        title: "Node with Description Example",
        description: "Each node shows a title with additional descriptive text",
      }}
      width={600}
      height={500}
    />
  );
}

export default NodeWithDescriptionTree;`,
        javascript: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TreeCharts Node with Description Example</title>
</head>
<body>
  <!-- Container for the tree chart -->
  <div id="container-id" style="width: 600px; height: 500px; margin: 20px auto;"></div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script>
    // Tree data with descriptions
    const treeData = {
      value: "Company",
      description: "Technology startup with innovative solutions",
      child: [
        {
          value: "Engineering",
          description: "Software development and technical teams",
          child: [],
        },
        {
          value: "Marketing",
          description: "Brand promotion and customer acquisition",
          child: [],
        },
        {
          value: "Sales",
          description: "Revenue generation and client relations",
          child: [],
        },
      ],
    };

    // Create chart with node-with-description type
    const chart = new TreeChart("container-id", {
      type: "right-angle",
      nodeConfig: {
        type: "node-with-description",
        color: "#e8f4fd",
        width: 180,
        padding: 10,
      },
      edgeConfig: {
        color: "#7f8c8d",
        width: 1.5,
      },
      titleConfig: {
        title: "Node with Description Example",
        description: "Each node shows a title with additional descriptive text",
      },
    });

    // Render the tree
    chart.render(treeData);
  </script>
</body>
</html>`,
      },
    },
    {
      type: "markdown",
      value: `## Features

- **Rich Context** - Display detailed descriptions alongside main values
- **Automatic Layout** - Smart text wrapping and positioning
- **Consistent Styling** - Maintains visual hierarchy with description text
- **Flexible Content** - Supports varying description lengths
- **Professional Appearance** - Clean separation between title and description

## Data Structure

To use nodes with descriptions, simply add a \`description\` property to your tree data:

\`\`\`javascript
const nodeData = {
  value: "Node Title",           // Main node text (required)
  description: "Additional context and details", // Description text (optional)
  child: [...]                  // Child nodes
};
\`\`\`

## Configuration Options

Node with Description inherits all regular node properties and adds description-specific styling:

### Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`type\` | \`string\` | \`"node-with-description"\` | Must be set to enable descriptions |
| \`width\` | \`number\` | \`180\` | Node width (wider for descriptions) |
| \`height\` | \`string\` | \`"auto"\` | Auto-calculated based on content |
| \`padding\` | \`number\` | \`12\` | Internal padding around content |
| \`color\` | \`string\` | \`"#f8f9fa"\` | Background color |
| \`borderColor\` | \`string\` | \`"#dee2e6"\` | Border color |
| \`borderWidth\` | \`number\` | \`1\` | Border thickness |
| \`borderRadius\` | \`number\` | \`6\` | Corner roundness |

### Typography

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`fontSize\` | \`number\` | \`14\` | Title text size |
| \`fontColor\` | \`string\` | \`"black"\` | Title text color |
| \`fontFamily\` | \`string\` | \`"Arial, sans-serif"\` | Font family for all text |
| \`descriptionFontSize\` | \`number\` | \`11\` | Description text size |
| \`descriptionFontColor\` | \`string\` | \`"#666666"\` | Description text color |
| \`descriptionMarginTop\` | \`number\` | \`4\` | Space between title and description |

### Advanced Configuration Example

\`\`\`javascript
const chart = new TreeChart("container", {
  type: "right-angle",
  nodeConfig: {
    type: "node-with-description",
    
    // Node styling
    color: "#ffffff",
    borderColor: "#e1e8ed",
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    padding: 15,
    
    // Title styling
    fontSize: 13,
    fontColor: "#2c3e50",
    fontFamily: "Arial, sans-serif",
    
    // Description styling
    descriptionFontSize: 11,
    descriptionFontColor: "#666666",
    descriptionMarginTop: 4
  }
});
\`\`\``,
    },
    {
      type: "markdown",
      value: `## Common Use Cases

### Organizational Charts
Display names with job titles, departments, or responsibilities.

### Process Documentation
Show process steps with detailed explanations or requirements.

### Project Hierarchies
Present project phases with descriptions of deliverables and timelines.

### Knowledge Management
Create learning paths with topics and detailed explanations.

### Product Catalogs
Display product categories with features and specifications.`,
    },
  ],
};
