import { DocTopic } from "@/types/docs";

export const regularNodesTopic: DocTopic = {
  id: "regular-nodes",
  title: "Regular Nodes (style and configuration)",
  description: "Standard geometric shapes for displaying text content",
  path: "/docs/node-types/regular-nodes",
  content: [
    {
      type: "markdown",
      value: `# Regular Nodes

Regular nodes are the fundamental building blocks of TreeCharts, offering a variety of geometric shapes to display text content. They provide clean, professional visualizations perfect for organizational charts, decision trees, mind maps, and hierarchical data structures.

Regular nodes offer extensive customization options. Here are some examples of what you can achieve:`,
    },
    {
      type: "image-grid",
      images: [
        {
          src: "/docs/node/regular/regular-node-visual-styling.svg",
          alt: "Visual styling with colors, borders, and shadows",
          description: "Colors, borders, and shadows",
        },
        {
          src: "/docs/node/regular/regular-node-text-styling.svg",
          alt: "Typography customization with fonts and sizing",
          description: "Typography customization",
        },
        {
          src: "/docs/node/regular/regular-node-advanced-styling.svg",
          alt: "Advanced effects with gradients and shadows",
          description: "Gradients and advanced effects",
        },
        {
          src: "/docs/node/regular/regular-node-individual-config.svg",
          alt: "Individual node styling for different departments",
          description: "Per-node styling options",
        },
      ],
      gridConfig: {
        desktop: 4,
        mobile: 2,
        gap: "1.5rem",
        maxWidth: "1000px",
      },
    },
    {
      type: "markdown",
      value: `## Default Configuration

Regular nodes come with sensible defaults that create clean, professional visualizations:

| Property | Default Value | Description |
|----------|---------------|-------------|
| \`type\` | \`"rectangle"\` | Node shape |
| \`width\` | \`80\` | Node width in pixels |
| \`height\` | \`40\` | Node height in pixels |
| \`color\` | \`"skyblue"\` | Background color |
| \`borderColor\` | \`"black"\` | Border color |
| \`borderWidth\` | \`1\` | Border thickness |
| \`borderRadius\` | \`6\` | Corner roundness (rectangles only) |
| \`opacity\` | \`1\` | Node transparency (0-1) |
| \`fontSize\` | \`14\` | Text size in pixels |
| \`fontColor\` | \`"black"\` | Text color |
| \`fontFamily\` | \`"Arial, sans-serif"\` | Font family |`,
    },
    {
      type: "markdown",
      value: `## Basic Configuration Options

### Dimensions and Layout

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`width\` | \`number\` | \`80\` | Node width in pixels |
| \`height\` | \`number\` | \`40\` | Node height in pixels |
| \`padding\` | \`number\` | \`5\` | Internal text padding |

### Colors and Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`color\` | \`string\` | \`"skyblue"\` | Background color (CSS color) |
| \`borderColor\` | \`string\` | \`"black"\` | Border color (CSS color) |
| \`borderWidth\` | \`number\` | \`1\` | Border thickness in pixels |
| \`borderRadius\` | \`number\` | \`6\` | Corner roundness (rectangles only) |
| \`opacity\` | \`number\` | \`1\` | Node transparency (0-1) |

### Typography

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`fontSize\` | \`number\` | \`14\` | Text size in pixels |
| \`fontColor\` | \`string\` | \`"black"\` | Text color (CSS color) |
| \`fontFamily\` | \`string\` | \`"Arial, sans-serif"\` | Font family |`,
    },
    {
      type: "markdown",
      value: `## Advanced Styling Options

### Shadow Effects

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`shadow\` | \`boolean\` | \`false\` | Enable drop shadow |
| \`shadowColor\` | \`string\` | \`"rgba(0,0,0,0.3)"\` | Shadow color |
| \`shadowOffset\` | \`{x: number, y: number}\` | \`{x: 2, y: 2}\` | Shadow offset |

### Gradient Fills

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`gradient\` | \`boolean\` | \`false\` | Enable gradient fill |
| \`gradientStartColor\` | \`string\` | \`""\` | Gradient start color |
| \`gradientEndColor\` | \`string\` | \`""\` | Gradient end color |

### Custom Attributes

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`customAttributes\` | \`object\` | \`{}\` | Custom SVG attributes |`,
    },
    {
      type: "markdown",
      value: `## Individual Node Configuration

One of TreeCharts' most powerful features is the ability to configure individual nodes differently while maintaining a consistent default style for the rest of the tree. This is achieved using the \`nodeConfig\` property directly in your tree data.

### How It Works

Each node in your tree data can include a \`nodeConfig\` property that overrides the default configuration for that specific node. This allows you to:

- Highlight important nodes with different colors
- Use different shapes for different node types
- Create visual hierarchies and categories
- Apply special styling to specific branches

### Configuration Priority

The configuration follows this priority order:
1. **Individual node config** (highest priority)
2. **Global node config** (default fallback)
3. **Built-in defaults** (lowest priority)`,
    },
    {
      type: "code",
      title: "Individual Node Configuration Example",
      description:
        "Apply different styling to individual nodes using nodeConfig",
      id: "individual-node-config",
      outputImage: "/docs/node/regular/regular-node-individual-config.svg",
      codes: {
        javascript: `// Tree data with individual node configurations
const treeData = {
  value: "Root",
  child: [
    {
      value: "Child 1",
      nodeConfig: {
        color: "#FF6B6B",        // Red background
        fontColor: "white",      // White text
        borderColor: "#FF5252",  // Darker red border
        borderWidth: 2
      },
      child: []
    },
    {
      value: "Child 2",
      nodeConfig: {
        color: "#FFE66D",        // Yellow background
        fontColor: "#333",       // Dark text
        borderColor: "#FFC107",  // Orange border
        borderWidth: 2
      },
      child: []
    }
  ]
};

// Create chart with default styling
const chart = new TreeChart("container", {
  type: "direct",
  nodeConfig: {
    type: "rectangle",
    color: "#E3F2FD",          // Light blue (default)
    borderColor: "#2196F3",     // Blue border (default)
    borderWidth: 2,
    borderRadius: 6,
    fontSize: 14,
    fontColor: "#1976D2",       // Dark blue text (default)
    width: 120,
    height: 50
  }
});

// The root node will use default styling
// Child nodes will use their individual nodeConfig
chart.render(treeData);`,
      },
    },
    {
      type: "markdown",
      value: `
## Common Use Cases

### Organizational Charts
Use rectangles with professional colors and clear typography for corporate hierarchies.

### Decision Trees  
Combine rectangles for processes and diamonds for decision points.

### Mind Maps
Use circles or rounded rectangles with different colors for various categories.

### Process Flows
Use different shapes to represent different types of process steps.`,
    },
  ],
};
