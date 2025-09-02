import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "4. Edge Customization/Connection Styling",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Edge Customization

TreeCharts provides extensive customization options for the connections (edges) between nodes. 
You can control colors, line styles, arrows, text labels, and more to create exactly the 
visual style you need.

## Edge Configuration Options

- **Basic Styling**: Colors, width, opacity, and line patterns
- **Arrows**: Directional indicators with customizable size and direction
- **Edge Text**: Labels on connections with styling options
- **Curved Connections**: Adjustable curve radius for smooth connections
- **Dashed Lines**: Various dash patterns for different visual effects
- **Advanced Styling**: Shadows, gradients, and custom patterns

## Configuration Properties

\`\`\`typescript
edgeConfig: {
  color: string;           // Line color
  width: number;           // Line thickness
  opacity: number;         // Transparency (0-1)
  dasharray: string;       // Dash pattern ("5,5" for dashed)
  showArrows: boolean;     // Enable directional arrows
  arrowDirection: string;  // "source-to-target", "target-to-source", "both"
  arrowSize: number;       // Arrow size in pixels
  arrowColor: string;      // Arrow color (defaults to line color)
  curveRadius: number;     // Curve radius for curved connections
  textSize: number;        // Edge text font size
  textColor: string;       // Edge text color
  textBackgroundColor: string; // Edge text background
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Sample data for edge demonstrations
const flowData = {
  value: "Process Start",
  child: [
    {
      value: "Step 1",
      edgeText: "Initialize",
      child: [
        {
          value: "Sub-step A",
          edgeText: "Validate",
          child: [],
        },
        {
          value: "Sub-step B",
          edgeText: "Process",
          child: [],
        },
      ],
    },
    {
      value: "Step 2",
      edgeText: "Execute",
      child: [
        {
          value: "Final Step",
          edgeText: "Complete",
          child: [],
        },
      ],
    },
  ],
};

export const BasicStyling: Story = {
  args: {
    data: flowData,
    type: "right-angle",
    nodeConfig: {
      color: "#4CAF50",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#333333",
      width: 2,
      opacity: 1,
    },
    titleConfig: {
      title: "Basic Edge Styling",
      description: "Simple, clean connections with standard line styling",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic edge styling with:
- Solid lines in dark gray
- 2px line width for good visibility
- Full opacity for crisp appearance
- Clean, professional look suitable for business diagrams
        `,
      },
    },
  },
};

export const ArrowConnections: Story = {
  args: {
    data: flowData,
    type: "direct",
    nodeConfig: {
      color: "#2196F3",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#1976D2",
      width: 3,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 3,
      arrowColor: "#1976D2",
    },
    titleConfig: {
      title: "Directional Arrows",
      description: "Arrows indicate flow direction from parent to child nodes",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Directional arrows showing:
- Flow direction from parent to child
- 8px arrow size for good visibility
- Matching arrow and line colors
- Perfect for process flows and decision trees

Arrow direction options:
- \`source-to-target\`: Arrows point from parent to child
- \`target-to-source\`: Arrows point from child to parent  
- \`both\`: Arrows on both ends of the connection
        `,
      },
    },
  },
};

export const DashedLines: Story = {
  args: {
    data: {
      value: "Main Process",
      child: [
        {
          value: "Required Step",
          child: [],
        },
        {
          value: "Optional Step",
          child: [],
        },
        {
          value: "Alternative Path",
          child: [],
        },
      ],
    },
    type: "right-angle",
    nodeConfig: {
      color: "#FF9800",
      fontColor: "white",
      width: 120,
      height: 40,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#F57C00",
      width: 2,
      dasharray: "8,4",
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
    },
    titleConfig: {
      title: "Dashed Line Connections",
      description: "Dashed lines can indicate optional or alternative paths",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Dashed line styling with:
- "8,4" dash pattern (8px line, 4px gap)
- Useful for showing optional or conditional connections
- Combined with arrows for clear directional flow
- Great for flowcharts with different types of relationships

Common dash patterns:
- \`"5,5"\`: Equal dashes and gaps
- \`"10,3"\`: Long dashes, short gaps
- \`"2,2,8,2"\`: Complex pattern with varying lengths
        `,
      },
    },
  },
};

export const EdgeLabels: Story = {
  args: {
    data: flowData,
    type: "curved",
    nodeConfig: {
      color: "#9C27B0",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#7B1FA2",
      width: 2,
      curveRadius: 25,
      textSize: 10,
      textColor: "#4A148C",
      textBackgroundColor: "#F3E5F5",
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
    },
    titleConfig: {
      title: "Edge Labels",
      description:
        "Text labels on connections provide additional context and flow information",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Edge labels demonstrate:
- Text labels on connections via \`edgeText\` property in data
- Background color for better text readability
- Small font size (10px) to avoid cluttering
- Curved connections for elegant flow

Edge text is defined in the data structure:
\`\`\`typescript
{
  value: "Node Name",
  edgeText: "Label Text", // Text appears on connecting edge
  child: [...]
}
\`\`\`
        `,
      },
    },
  },
};

export const ThickConnections: Story = {
  args: {
    data: {
      value: "Data Flow",
      child: [
        {
          value: "High Priority",
          child: [],
        },
        {
          value: "Medium Priority",
          child: [],
        },
        {
          value: "Low Priority",
          child: [],
        },
      ],
    },
    type: "direct",
    nodeConfig: {
      color: "#F44336",
      fontColor: "white",
      width: 110,
      height: 40,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#D32F2F",
      width: 6,
      opacity: 0.8,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 2,
    },
    titleConfig: {
      title: "Thick Connections",
      description:
        "Bold lines emphasize important relationships or high-volume data flow",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Thick connection styling features:
- 6px line width for high impact
- Large arrows (12px) proportional to line thickness
- Slightly reduced opacity (0.8) for softer appearance
- Perfect for emphasizing important connections or data flow volume

Use thick lines when you want to:
- Show high-priority or high-volume connections
- Create visual hierarchy between different types of relationships
- Make the diagram more bold and impactful
        `,
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Blue Theme
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              { value: "Child A", child: [] },
              { value: "Child B", child: [] },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            color: "#E3F2FD",
            fontColor: "#1565C0",
            width: 80,
            height: 35,
          }}
          edgeConfig={{
            color: "#2196F3",
            width: 3,
            showArrows: true,
            arrowDirection: "source-to-target",
            arrowSize: 4,
          }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Green Theme
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              { value: "Child A", child: [] },
              { value: "Child B", child: [] },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            color: "#E8F5E8",
            fontColor: "#2E7D32",
            width: 80,
            height: 35,
          }}
          edgeConfig={{
            color: "#4CAF50",
            width: 3,
            showArrows: true,
            arrowDirection: "source-to-target",
            arrowSize: 4,
          }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Purple Theme
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              { value: "Child A", child: [] },
              { value: "Child B", child: [] },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            color: "#F3E5F5",
            fontColor: "#7B1FA2",
            width: 80,
            height: 35,
          }}
          edgeConfig={{
            color: "#9C27B0",
            width: 3,
            showArrows: true,
            arrowDirection: "source-to-target",
            arrowSize: 4,
          }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Dark Theme
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              { value: "Child A", child: [] },
              { value: "Child B", child: [] },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            color: "#424242",
            fontColor: "#FFFFFF",
            width: 80,
            height: 35,
          }}
          edgeConfig={{
            color: "#757575",
            width: 3,
            showArrows: true,
            arrowDirection: "source-to-target",
            arrowSize: 4,
          }}
          width="100%"
          height="200px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Color coordination examples showing how edges can match your design theme:

- **Blue Theme**: Professional and trustworthy, great for business diagrams
- **Green Theme**: Natural and growth-oriented, perfect for environmental or organic themes
- **Purple Theme**: Creative and innovative, ideal for design and artistic projects
- **Dark Theme**: Modern and sophisticated, excellent for technical documentation

Tips for color coordination:
- Match edge colors with node border colors
- Use lighter node backgrounds with darker edge colors for contrast
- Consider your brand colors when choosing the color palette
- Ensure sufficient contrast for accessibility
        `,
      },
    },
  },
};

export const AdvancedStyling: Story = {
  args: {
    data: {
      value: "Advanced System",
      child: [
        {
          value: "Critical Path",
          edgeText: "High Priority",
          child: [
            {
              value: "End Point A",
              edgeText: "Success",
              child: [],
            },
          ],
        },
        {
          value: "Alternative Path",
          edgeText: "Fallback",
          child: [
            {
              value: "End Point B",
              edgeText: "Backup",
              child: [],
            },
          ],
        },
      ],
    },
    type: "curved",
    nodeConfig: {
      type: "diamond",
      color: "#1A237E",
      fontColor: "white",
      width: 120,
      height: 60,
      fontSize: 11,
      borderColor: "#3F51B5",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#3F51B5",
      width: 4,
      curveRadius: 30,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 3,
      arrowColor: "#1A237E",
      textSize: 9,
      textColor: "#1A237E",
      textBackgroundColor: "rgba(255, 255, 255, 0.9)",
      opacity: 0.9,
    },
    titleConfig: {
      title: "Advanced Edge Styling",
      description:
        "Complex styling with curves, arrows, labels, and professional color scheme",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Advanced styling combines multiple features:
- Curved connections with custom radius (30px)
- Bold lines (4px) with custom opacity
- Large arrows with different color than lines
- Edge labels with semi-transparent backgrounds
- Diamond nodes for decision points
- Professional blue color scheme

This example demonstrates how to create sophisticated, professional-looking diagrams 
that could be used in technical documentation, process flows, or system architecture diagrams.
        `,
      },
    },
  },
};
