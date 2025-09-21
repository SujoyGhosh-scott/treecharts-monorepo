import { DocTopic } from "@/types/docs";

export const customShapeTopic: DocTopic = {
  id: "custom-shape",
  title: "Custom Shape",
  description: "Geometric shapes and SVG paths for visual distinction",
  path: "/docs/node-types/custom-shape",
  content: [
    {
      type: "markdown",
      value: `# Custom Shape

Custom shape nodes provide extensive visual variety through built-in geometric shapes and unlimited custom SVG paths. These nodes enable you to create visually distinctive tree structures where different shapes can represent different categories, types, or hierarchical levels.

With 9 built-in geometric shapes plus custom SVG path support, you can create highly visual and categorized tree visualizations that enhance user understanding through shape-based visual encoding.`,
    },
    {
      type: "code",
      title: "Custom Shape Example",
      description:
        "Use different geometric shapes to categorize nodes and create visually distinctive tree structures",
      id: "custom-shape-example",
      outputImage: "/docs/node/other/custom-shape-example.svg",
      codes: {
        react: `import { TreeChart } from 'treecharts-react';

// Tree data with various custom shapes
const treeData = {
  value: "Shapes",
  nodeConfig: { type: "hexagon", color: "#e8f4fd" },
  child: [
    {
      value: "Circle",
      nodeConfig: { type: "circle", color: "#98FB98" },
      child: [
        {
          value: "Pentagon",
          nodeConfig: { type: "pentagon", color: "#87CEEB" },
          child: [],
        },
      ],
    },
    {
      value: "Diamond",
      nodeConfig: { type: "diamond", color: "#FFD700" },
      child: [
        {
          value: "Octagon",
          nodeConfig: { type: "octagon", color: "#DDA0DD" },
          child: [],
        },
      ],
    },
    {
      value: "Triangle",
      nodeConfig: { type: "triangle", color: "#FFB6C1" },
      child: [
        {
          value: "Star",
          nodeConfig: { type: "star", color: "#F0E68C" },
          child: [],
        },
      ],
    },
    {
      value: "Custom",
      nodeConfig: {
        type: "custom",
        color: "#FF6B6B",
        customAttributes: {
          d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
        },
      },
      child: [],
    },
  ],
};

function CustomShapeTree() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      horizontalGap={100}
      verticalGap={80}
      nodeConfig={{
        width: 80,
        height: 60,
        fontSize: 11,
        fontColor: "#333333",
        borderWidth: 2,
        borderColor: "#666666",
      }}
      width={800}
      height={500}
    />
  );
}

export default CustomShapeTree;`,
        javascript: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TreeCharts Custom Shape Example</title>
</head>
<body>
  <!-- Container for the tree chart -->
  <div id="container-id" style="width: 800px; height: 500px; margin: 20px auto;"></div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script>
    // Tree data with various custom shapes
    const treeData = {
      value: "Shapes",
      nodeConfig: { type: "hexagon", color: "#e8f4fd" },
      child: [
        {
          value: "Circle",
          nodeConfig: { type: "circle", color: "#98FB98" },
          child: [
            {
              value: "Pentagon",
              nodeConfig: { type: "pentagon", color: "#87CEEB" },
              child: [],
            },
          ],
        },
        {
          value: "Diamond",
          nodeConfig: { type: "diamond", color: "#FFD700" },
          child: [
            {
              value: "Octagon",
              nodeConfig: { type: "octagon", color: "#DDA0DD" },
              child: [],
            },
          ],
        },
        {
          value: "Triangle",
          nodeConfig: { type: "triangle", color: "#FFB6C1" },
          child: [
            {
              value: "Star",
              nodeConfig: { type: "star", color: "#F0E68C" },
              child: [],
            },
          ],
        },
        {
          value: "Custom",
          nodeConfig: {
            type: "custom",
            color: "#FF6B6B",
            customAttributes: {
              d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
            },
          },
          child: [],
        },
      ],
    };

    // Create chart with custom shapes
    const chart = new TreeChart("container-id", {
      type: "right-angle",
      horizontalGap: 100,
      verticalGap: 80,
      nodeConfig: {
        width: 80,
        height: 60,
        fontSize: 11,
        fontColor: "#333333",
        borderWidth: 2,
        borderColor: "#666666",
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

- **9 Built-in Shapes** - Complete geometric shape library for immediate use
- **Custom SVG Paths** - Create any shape using standard SVG path syntax
- **Visual Categorization** - Use shapes to represent different data types or categories
- **Consistent Styling** - All shapes support the same styling options (colors, borders, gradients)
- **Flexible Positioning** - Shapes automatically position and scale within node dimensions
- **Professional Appearance** - Clean, precise geometric shapes for polished visualizations

## Built-in Shape Types

TreeCharts provides 9 geometric shapes out of the box:

**Basic Shapes:** \`"rectangle"\` (default), \`"circle"\`, \`"ellipse"\`, \`"diamond"\`, \`"triangle"\`

**Polygon Shapes:** \`"pentagon"\`, \`"hexagon"\`, \`"octagon"\`, \`"star"\`

Simply set the \`type\` property in your nodeConfig to use any of these shapes. For example: \`type: "hexagon"\` or \`type: "star"\`.

## Shape Configuration

Set the shape type using the \`type\` property in nodeConfig:

\`\`\`javascript
const nodeConfig = {
  type: "circle",        // Shape type
  color: "#98FB98",      // Fill color
  borderColor: "#666",   // Border color
  borderWidth: 2,        // Border thickness
  width: 80,             // Node width
  height: 60             // Node height
};
\`\`\`

## Custom SVG Paths

For unlimited shape possibilities, use the \`"custom"\` type with SVG path data:

\`\`\`javascript
const customNodeConfig = {
  type: "custom",
  color: "#FF6B6B",
  customAttributes: {
    d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z"
  }
};
\`\`\`

### SVG Path Syntax

Custom paths use standard SVG path commands:

- \`M x,y\` - Move to coordinates
- \`L x,y\` - Line to coordinates  
- \`C x1,y1 x2,y2 x,y\` - Cubic Bézier curve
- \`Q x1,y1 x,y\` - Quadratic Bézier curve
- \`A rx,ry rotation large-arc sweep x,y\` - Arc
- \`Z\` - Close path

### Path Coordinate System

- Paths are positioned relative to the node's coordinate system
- Use coordinates that fit within your node dimensions (width × height)
- The transform positioning is handled automatically
- Recommended to design paths within 0-80 × 0-60 coordinate space for standard nodes

### Custom Attributes

For custom shapes, additional SVG attributes can be specified:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`customAttributes\` | \`object\` | \`{}\` | SVG attributes for custom shapes |
| \`customAttributes.d\` | \`string\` | \`undefined\` | SVG path data for custom shapes |

All other styling properties (colors, borders, gradients, shadows, text) work the same as regular nodes - see the [Regular Nodes](/docs/node-types/regular-nodes) documentation for complete styling options.`,
    },
    {
      type: "markdown",
      value: `## Advanced Examples

### Multi-Shape Categorization

\`\`\`javascript
const orgChart = {
  value: "Company",
  nodeConfig: { type: "hexagon", color: "#2c3e50" },
  child: [
    {
      value: "Executive Team",
      nodeConfig: { type: "diamond", color: "#e74c3c" },
      child: [
        { value: "CEO", nodeConfig: { type: "star", color: "#f39c12" } },
        { value: "CTO", nodeConfig: { type: "star", color: "#f39c12" } }
      ]
    },
    {
      value: "Departments",
      nodeConfig: { type: "pentagon", color: "#3498db" },
      child: [
        { value: "Engineering", nodeConfig: { type: "circle", color: "#27ae60" } },
        { value: "Marketing", nodeConfig: { type: "triangle", color: "#9b59b6" } }
      ]
    }
  ]
};
\`\`\`

### Custom SVG Heart Shape

\`\`\`javascript
const heartNode = {
  value: "Love",
  nodeConfig: {
    type: "custom",
    color: "#e91e63",
    borderWidth: 2,
    borderColor: "#ad1457",
    customAttributes: {
      d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z"
    }
  }
};
\`\`\`

### Arrow Shape with Custom Path

\`\`\`javascript
const arrowNode = {
  value: "Next",
  nodeConfig: {
    type: "custom",
    color: "#4caf50",
    customAttributes: {
      d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z"
    }
  }
};
\`\`\`

## Shape Design Guidelines

### Built-in Shapes

- **Circles**: Best for representing people, completion states, or equal entities
- **Diamonds**: Ideal for decision points, critical nodes, or gateways  
- **Triangles**: Perfect for hierarchical indicators, warnings, or directional flow
- **Hexagons**: Great for processes, systems, or technical components
- **Stars**: Excellent for highlights, achievements, or featured items
- **Pentagons/Octagons**: Useful for specialized categories or unique classifications

### Custom Shape Design

- **Size Appropriately**: Design paths to fit within standard node dimensions (80×60)
- **Consider Text Space**: Leave room for text labels within the shape
- **Use Consistent Styling**: Maintain visual coherence with border widths and colors
- **Test Readability**: Ensure text remains legible over the shape background
- **Optimize Complexity**: Balance visual appeal with rendering performance

## Common Use Cases

### Process Flow Diagrams
Different shapes represent different process types (diamond for decisions, circle for start/end, rectangle for actions).

### Organizational Charts  
Shape hierarchy to show different organizational levels (star for executives, diamond for directors, circle for managers).

### System Architecture
Technical diagrams using hexagons for services, circles for databases, triangles for external systems.

### Decision Trees
Diamonds for decision points, circles for outcomes, rectangles for actions.

### Network Diagrams
Custom shapes for different network components, routers, servers, and connections.`,
    },
  ],
};
