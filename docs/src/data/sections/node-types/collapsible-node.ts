import { DocTopic } from "@/types/docs";

export const collapsibleNodeTopic: DocTopic = {
  id: "collapsible-node",
  title: "Collapsible Node",
  description: "Interactive nodes with expandable/collapsible descriptions",
  path: "/docs/node-types/collapsible-node",
  content: [
    {
      type: "markdown",
      value: `# Collapsible Node

Collapsible nodes provide interactive functionality that allows users to expand or collapse node descriptions on demand. This node type is perfect for large hierarchical structures where you want to provide detailed information while maintaining a clean, uncluttered overview.

These nodes feature clickable chevron icons and smart state management to create engaging, user-friendly tree visualizations.`,
    },
    {
      type: "code",
      title: "Collapsible Node Example",
      description:
        "Create interactive nodes that can expand/collapse to show detailed descriptions",
      id: "collapsible-node-example",
      outputImage: "/docs/node/other/collapsible-node-example.svg",
      codes: {
        javascript: `import { TreeChart } from '@treecharts/core';

// Tree data with collapsible descriptions
const treeData = {
  value: "Organization",
  description: "Modern technology company with distributed teams",
  nodeConfig: { type: "collapsible-node" },
  child: [
    {
      value: "Development",
      description: "Software development and product creation teams",
      child: [],
    },
    {
      value: "Operations",
      description: "Infrastructure management and DevOps initiatives",
      child: [],
    },
    {
      value: "Business",
      description: "Strategic partnerships and business growth",
      collapsibleState: { expanded: true },
      child: [],
    },
  ],
};

// Create chart with collapsible nodes
const chart = new TreeChart("container-id", {
  type: "right-angle",
  nodeConfig: {
    type: "collapsible-node",
    width: 200,
    color: "#e8f4fd",
  },
  titleConfig: {
    title: "Collapsible Node Example",
    description: "Click the ▼ buttons to expand and view detailed descriptions",
  },
});

// Render the tree
chart.render(treeData);`,
      },
    },
    {
      type: "markdown",
      value: `## Features

- **Interactive Control** - Click chevron icons to expand/collapse descriptions
- **Space Efficient** - Show details only when needed to maintain clean layout
- **Visual Indicators** - Clear expand/collapse chevron buttons
- **State Management** - Automatic tracking of expanded/collapsed states
- **Dynamic Sizing** - Nodes automatically resize based on content and state

## Data Structure

Collapsible nodes require specific data structure properties:

\`\`\`javascript
const nodeData = {
  value: "Node Title",           // Main node text (required)
  description: "Additional context", // Description text (optional)
  nodeConfig: { 
    type: "collapsible-node"     // Enable collapsible functionality (required)
  },
  collapsibleState: { 
    expanded: false              // Initial state (optional, defaults to false)
  },
  child: [...]                  // Child nodes
};
\`\`\`

## Configuration Options

Collapsible nodes inherit all regular node properties plus interactive features:

### Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`type\` | \`string\` | \`"collapsible-node"\` | Must be set to enable collapsible functionality |
| \`width\` | \`number\` | \`200\` | Node width (wider for descriptions) |
| \`height\` | \`string\` | \`"auto"\` | Auto-calculated based on content and state |
| \`padding\` | \`number\` | \`5\` | Internal padding around content |
| \`color\` | \`string\` | \`"skyblue"\` | Background color |
| \`borderColor\` | \`string\` | \`"black"\` | Border color |
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

### Interactive Features

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`collapsibleState.expanded\` | \`boolean\` | \`false\` | Initial expanded/collapsed state |

### Chevron Icon Styling

| Property | Value | Description |
|----------|-------|-------------|
| \`chevronSize\` | \`8px\` | Fixed chevron icon size |
| \`chevronPadding\` | \`8px\` | Distance from right edge |
| \`clickAreaSize\` | \`20px\` | Invisible click area for better UX |
| \`strokeWidth\` | \`2px\` | Chevron line thickness |
| \`strokeColor\` | \`fontColor\` | Inherits from node's fontColor |

**Note:** 
- **Down chevron (▼)** indicates collapsed state (clickable to expand)
- **Up chevron (▲)** indicates expanded state (clickable to collapse)

### Advanced Configuration Example

\`\`\`javascript
const chart = new TreeChart("container", {
  type: "right-angle",
  nodeConfig: {
    type: "collapsible-node",
    
    // Node styling
    color: "#ffffff",
    borderColor: "#e1e8ed",
    borderWidth: 1,
    borderRadius: 8,
    width: 220,
    padding: 12,
    
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
      value: `## State Management

### Initial State

Set the initial expanded/collapsed state for individual nodes:

\`\`\`javascript
const nodeData = {
  value: "Node Title",
  description: "Node description",
  collapsibleState: { expanded: true }, // Start expanded
  child: []
};
\`\`\`

### Default Behavior

- **All nodes start collapsed** by default (unless specified otherwise)
- **Click chevron to toggle** between expanded/collapsed states
- **State is maintained** during interactions
- **Dynamic resizing** occurs automatically when toggling

## Common Use Cases

### Organizational Charts
Interactive company hierarchies with expandable role descriptions.

### Process Documentation
Workflow diagrams with detailed step explanations available on demand.

### Knowledge Management
Learning trees with expandable topic details and explanations.

### Project Planning
Project breakdown structures with detailed task descriptions.

### System Architecture
Technical diagrams with expandable component specifications.`,
    },
  ],
};
