import { DocSection } from "@/types/docs";

export const edgeCustomizationSection: DocSection = {
  id: "edge-customization",
  title: "Edge Customization",
  description:
    "Comprehensive styling and configuration options for connections between nodes",
  topics: [],
  content: [
    {
      type: "markdown",
      value: `TreeCharts provides extensive customization options for edges (connections between nodes). You can control every aspect of how connections appear, from basic styling to advanced features like arrows, text labels, and visual effects.

## Edge Configuration Overview

All edge styling is controlled through the \`edgeConfig\` property in your TreeChart options. This configuration applies to all connections in your tree and works with all renderer types (direct, right-angle, curved, and all-directional).

### Key Features

- **Visual Styling**: Colors, thickness, opacity, and dash patterns
- **Arrow Indicators**: Directional arrows with customizable size and color  
- **Edge Text Labels**: Text labels on connections with styling options
- **Advanced Options**: Curve radius, transparency, and renderer-specific features`,
    },
    {
      type: "code",
      title: "Edge Customization Example",
      description:
        "This example demonstrates comprehensive edge styling including colors, patterns, arrows, and text labels.",
      outputImage: "/docs/edge-customization-example.svg",
      id: "edge-customization-demo",
      codes: {
        javascript: `import { TreeChart } from "treecharts";

// Tree data with edge text labels
const treeData = {
  value: "A",
  child: [
    {
      value: "B",
      edgeText: "to Department B",
      child: [
        {
          value: "B1",
          edgeText: "sub-unit",
          child: [],
        },
        {
          value: "B2",
          edgeText: "branch",
          child: [],
        },
      ],
    },
    {
      value: "C",
      edgeText: "to Department C",
      child: [
        {
          value: "C1",
          edgeText: "division",
          child: [],
        },
      ],
    },
  ],
};

const chart = new TreeChart("container", {
  type: "right-angle",
  horizontalGap: 120,
  verticalGap: 100,

  // Node styling
  nodeConfig: {
    width: 60,
    height: 40,
    color: "#e8f4fd",
    borderColor: "#4a90e2",
    borderWidth: 2,
    fontSize: 14,
    fontColor: "#2c3e50",
  },

  // Comprehensive edge customization
  edgeConfig: {
    // Basic line styling
    color: "#e74c3c",        // Red edges
    width: 2,                // Thicker lines
    dasharray: "5,5",        // Dashed pattern
    opacity: 0.8,            // Slightly transparent

    // Arrow configuration
    showArrows: true,
    arrowDirection: "source-to-target",
    arrowSize: 5,
    arrowColor: "#c0392b",   // Darker red arrows

    // Edge text styling
    textSize: 11,
    textColor: "#8e44ad",    // Purple text
    textBackgroundColor: "#f8f9fa", // Light background
  },

  // Chart title
  titleConfig: {
    title: "Edge Customization Example",
    description: "Dashed red edges with purple text labels and arrow indicators",
  },
});

chart.render(treeData);`,
      },
    },
    {
      type: "markdown",
      value: `## Basic Styling Properties

### Line Appearance

| Property | Type | Default | Description | Examples |
|----------|------|---------|-------------|----------|
| \`color\` | string | \`"black"\` | Edge line color | \`"#e74c3c"\`, \`"red"\`, \`"rgb(231, 76, 60)"\` |
| \`width\` | number | \`1\` | Line thickness in pixels | \`2\`, \`3\`, \`0.5\` |
| \`opacity\` | number | \`1\` | Line transparency (0.0 to 1.0) | \`0.8\`, \`0.5\`, \`1\` |
| \`dasharray\` | string | \`""\` | SVG dash pattern for dashed lines | \`"5,5"\`, \`"10,3"\`, \`"5,3,1,3"\` |

### Color Format Support

TreeCharts accepts all standard CSS color formats:

| Format | Example | Description |
|--------|---------|-------------|
| Hex | \`"#ff6b35"\` | 6-digit hexadecimal |
| RGB | \`"rgb(255, 107, 53)"\` | Red, green, blue values |
| RGBA | \`"rgba(255, 107, 53, 0.8)"\` | RGB with alpha transparency |
| Named | \`"orange"\`, \`"red"\` | CSS color names |
| HSL | \`"hsl(15, 100%, 60%)"\` | Hue, saturation, lightness |

### Dash Pattern Examples

| Pattern | Result | Use Case |
|---------|--------|----------|
| \`""\` | Solid line | Default, clean connections |
| \`"5,5"\` | Equal dashes and gaps | Subtle visual distinction |
| \`"10,3"\` | Long dashes, short gaps | Emphasis while maintaining readability |
| \`"5,3,1,3"\` | Dash-dot pattern | Complex hierarchical relationships |`,
    },
    {
      type: "markdown",
      value: `## Arrow Configuration

### Arrow Properties

| Property | Type | Default | Description | Options |
|----------|------|---------|-------------|---------|
| \`showArrows\` | boolean | \`false\` | Enable/disable arrow indicators | \`true\`, \`false\` |
| \`arrowDirection\` | string | \`"source-to-target"\` | Arrow direction | \`"source-to-target"\`, \`"target-to-source"\`, \`"both"\` |
| \`arrowSize\` | number | \`6\` | Arrow size in pixels | \`4\`, \`8\`, \`10\` |
| \`arrowColor\` | string | \`"black"\` | Arrow color (inherits edge color if not set) | Any CSS color format |

### Arrow Direction Guide

| Direction | Visual Result | Best Use Case |
|-----------|---------------|---------------|
| \`"source-to-target"\` | Parent → Child | Organizational charts, flowcharts |
| \`"target-to-source"\` | Parent ← Child | Reverse hierarchies, dependency trees |
| \`"both"\` | Parent ↔ Child | Bidirectional relationships |

### Arrow Styling Notes

- Arrows automatically inherit the edge color unless \`arrowColor\` is explicitly set
- Arrow size controls both width and height of the arrowhead
- Arrows work with all renderer types (direct, right-angle, curved, all-directional)`,
    },
    {
      type: "markdown",
      value: `## Edge Text Labels

### Text Properties

| Property | Type | Default | Description | Examples |
|----------|------|---------|-------------|----------|
| \`textSize\` | number | \`12\` | Font size in pixels | \`10\`, \`14\`, \`16\` |
| \`textColor\` | string | \`"#666666"\` | Text color | \`"#8e44ad"\`, \`"blue"\`, \`"rgb(142, 68, 173)"\` |
| \`textBackgroundColor\` | string | \`""\` | Background color behind text (optional) | \`"#f8f9fa"\`, \`"white"\`, \`"rgba(255,255,255,0.9)"\` |

### Adding Edge Text to Data

Add text labels directly in your tree data structure:

\`\`\`javascript
const treeData = {
  value: "Parent",
  child: [
    {
      value: "Child 1",
      edgeText: "Primary Branch",  // Text for this connection
      child: []
    },
    {
      value: "Child 2", 
      edgeText: "Secondary Branch",
      child: []
    }
  ]
};
\`\`\`

### Text Background Behavior

| Background Setting | Result | Best Use Case |
|--------------------|--------|---------------|
| Empty (\`""\`) | Transparent background | Clean, minimal appearance |
| Color value | Rounded rectangle background | Complex backgrounds, better readability |
| Semi-transparent | Subtle background highlight | Balanced visibility without overwhelming |`,
    },
    {
      type: "markdown",
      value: `## Advanced Configuration

### Curve Radius (Curved Renderer Only)

| Property | Type | Default | Description | Examples |
|----------|------|---------|-------------|----------|
| \`curveRadius\` | number | \`20\` | Curve intensity for curved renderer | \`10\`, \`30\`, \`50\` |

**Usage Example:**
\`\`\`javascript
{
  type: "curved",
  edgeConfig: {
    curveRadius: 30  // Higher values = more pronounced curves
  }
}
\`\`\`

### Performance Impact

| Feature | Performance Impact | Notes |
|---------|-------------------|-------|
| **Basic Styling** | Minimal | Efficiently rendered using SVG |
| **Arrows** | Minimal | Uses SVG markers, very efficient |
| **Edge Text** | Low | Slight impact with 100+ labels |
| **Dash Patterns** | Minimal | Native SVG support |
| **Transparency** | Minimal | Hardware accelerated on modern browsers |`,
    },
    {
      type: "markdown",
      value: `## Complete EdgeConfig Reference

\`\`\`typescript
interface EdgeConfig {
  // Basic styling
  color?: string;              // Edge color
  width?: number;              // Line thickness  
  opacity?: number;            // Transparency (0.0-1.0)
  dasharray?: string;          // Dash pattern

  // Arrow options
  showArrows?: boolean;        // Enable/disable arrows
  arrowDirection?: "source-to-target" | "target-to-source" | "both";
  arrowSize?: number;          // Arrow size in pixels
  arrowColor?: string;         // Arrow color (defaults to edge color)

  // Curve options (curved renderer only)
  curveRadius?: number;        // Curve intensity

  // Edge text styling
  textSize?: number;           // Text font size
  textColor?: string;          // Text color  
  textBackgroundColor?: string; // Text background (optional)
}
\`\`\`

## Tips and Best Practices

💡 **Edge Text**: Works best with shorter labels. For longer descriptions, consider using node descriptions instead.

💡 **Right-Angle Arrows**: When using arrows with right-angle connections, they appear on the appropriate segments based on direction.

⚠️ **Thick Lines**: Very thick lines (width > 10) may affect arrow positioning. Test your configuration with different arrow sizes.

💡 **Color Contrast**: Use contrasting colors for edges and nodes to ensure good visual separation and readability.`,
    },
  ],
};
