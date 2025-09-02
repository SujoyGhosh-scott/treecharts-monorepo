import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "5. Tree Alignment/Layout Options",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Tree Alignment and Layout

TreeCharts provides flexible alignment and layout options to control how your tree is positioned 
and oriented. You can control both the overall tree direction and the alignment of nodes within levels.

## Alignment Options

### Horizontal Alignment (Tree Direction)
- **top-to-bottom**: Traditional tree flowing downward (default)
- **bottom-to-top**: Inverted tree flowing upward

### Vertical Alignment (Node Positioning)
- **left**: Align nodes to the left within their level
- **center**: Center nodes within their level (default)
- **right**: Align nodes to the right within their level

### Spacing Controls
- **horizontalGap**: Space between nodes on the same level
- **verticalGap**: Space between different levels of the tree

## Configuration Properties

\`\`\`typescript
{
  horizontalAlign: 'top-to-bottom' | 'bottom-to-top',
  verticalAlign: 'left' | 'center' | 'right',
  horizontalGap: number,  // Gap between nodes horizontally
  verticalGap: number,    // Gap between levels vertically
}
\`\`\`

Note: All-direction (radial) trees don't use alignment options as nodes are positioned radially around the center.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Sample data with varied branch sizes for alignment demonstration
const alignmentData = {
  value: "CEO",
  child: [
    {
      value: "Engineering",
      child: [
        { value: "Frontend", child: [] },
        { value: "Backend", child: [] },
        { value: "DevOps", child: [] },
        { value: "QA", child: [] },
      ],
    },
    {
      value: "Marketing",
      child: [
        { value: "Content", child: [] },
        { value: "Design", child: [] },
      ],
    },
    {
      value: "Sales",
      child: [{ value: "Enterprise", child: [] }],
    },
  ],
};

export const TopToBottomFlow: Story = {
  args: {
    data: alignmentData,
    type: "right-angle",
    horizontalAlign: "top-to-bottom",
    verticalAlign: "center",
    horizontalGap: 40,
    verticalGap: 80,
    nodeConfig: {
      color: "#4CAF50",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Top-to-Bottom Flow (Default)",
      description: "Traditional tree layout flowing from top to bottom",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Top-to-bottom flow** is the traditional and most common tree layout:

- Root node at the top
- Children flow downward 
- Natural reading pattern for most users
- Perfect for organizational charts and hierarchies
- Default layout for most tree visualizations

This layout works well when you want to show authority flowing downward or when following 
traditional organizational chart conventions.
        `,
      },
    },
  },
};

export const BottomToTopFlow: Story = {
  args: {
    data: alignmentData,
    type: "right-angle",
    horizontalAlign: "bottom-to-top",
    verticalAlign: "center",
    horizontalGap: 40,
    verticalGap: 80,
    nodeConfig: {
      color: "#2196F3",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Bottom-to-Top Flow",
      description: "Inverted tree layout flowing from bottom to top",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Bottom-to-top flow** inverts the traditional tree layout:

- Root node at the bottom
- Children flow upward
- Useful for showing growth or building up to a conclusion
- Good for decision trees that lead to final outcomes
- Alternative perspective on hierarchical data

This layout is particularly effective when you want to emphasize building up to a final 
result or when showing how individual components contribute to a larger whole.
        `,
      },
    },
  },
};

export const LeftAlignment: Story = {
  args: {
    data: alignmentData,
    type: "direct",
    horizontalAlign: "top-to-bottom",
    verticalAlign: "left",
    horizontalGap: 30,
    verticalGap: 70,
    nodeConfig: {
      color: "#FF9800",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Left Alignment",
      description: "Nodes aligned to the left within their level",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Left alignment** positions nodes to the left within their level:

- Nodes align to the left edge of their level
- Creates a left-justified appearance
- Useful when you want emphasis on the left side
- Good for languages that read left-to-right
- Creates a more compact layout on the left

This alignment works well when you want the tree to have a strong left edge or when 
integrating with other left-aligned content.
        `,
      },
    },
  },
};

export const CenterAlignment: Story = {
  args: {
    data: alignmentData,
    type: "curved",
    horizontalAlign: "top-to-bottom",
    verticalAlign: "center",
    horizontalGap: 35,
    verticalGap: 75,
    nodeConfig: {
      color: "#9C27B0",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      curveRadius: 20,
    },
    titleConfig: {
      title: "Center Alignment (Default)",
      description: "Nodes centered within their level for balanced appearance",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Center alignment** positions nodes in the center of their level:

- Nodes are centered within their level
- Creates a balanced, symmetrical appearance
- Most visually pleasing for most use cases
- Default alignment for TreeCharts
- Works well with all connection types

This is the most commonly used alignment as it creates the most visually balanced 
and aesthetically pleasing tree layouts.
        `,
      },
    },
  },
};

export const RightAlignment: Story = {
  args: {
    data: alignmentData,
    type: "direct",
    horizontalAlign: "top-to-bottom",
    verticalAlign: "right",
    horizontalGap: 30,
    verticalGap: 70,
    nodeConfig: {
      color: "#F44336",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Right Alignment",
      description: "Nodes aligned to the right within their level",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Right alignment** positions nodes to the right within their level:

- Nodes align to the right edge of their level
- Creates a right-justified appearance
- Useful for right-to-left reading languages
- Good when integrating with right-aligned content
- Creates emphasis on the right side of the tree

This alignment is less common but can be useful for specific design requirements 
or when working with right-to-left text layouts.
        `,
      },
    },
  },
};

export const CustomSpacing: Story = {
  render: () => (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
    >
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Tight Spacing
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              {
                value: "A",
                child: [
                  { value: "A1", child: [] },
                  { value: "A2", child: [] },
                ],
              },
              { value: "B", child: [{ value: "B1", child: [] }] },
            ],
          }}
          type="right-angle"
          horizontalGap={20}
          verticalGap={40}
          nodeConfig={{
            color: "#4CAF50",
            fontColor: "white",
            width: 60,
            height: 30,
            fontSize: 10,
          }}
          edgeConfig={{ color: "#666", width: 1 }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Wide Spacing
        </h4>
        <TreeChart
          data={{
            value: "Root",
            child: [
              {
                value: "A",
                child: [
                  { value: "A1", child: [] },
                  { value: "A2", child: [] },
                ],
              },
              { value: "B", child: [{ value: "B1", child: [] }] },
            ],
          }}
          type="right-angle"
          horizontalGap={60}
          verticalGap={100}
          nodeConfig={{
            color: "#2196F3",
            fontColor: "white",
            width: 60,
            height: 30,
            fontSize: 10,
          }}
          edgeConfig={{ color: "#666", width: 1 }}
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
Spacing controls affect the overall tree layout density and readability:

### Horizontal Gap
- **Tight (20px)**: Compact layout, saves space, nodes closer together
- **Wide (60px)**: Spacious layout, easier to read, better for complex trees

### Vertical Gap  
- **Tight (40px)**: Shorter trees, more content visible at once
- **Wide (100px)**: Taller trees, more breathing room between levels

### Choosing Spacing
- **Dense content**: Use tighter spacing to fit more information
- **Presentations**: Use wider spacing for better readability
- **Node size**: Larger nodes typically need more spacing
- **Connection type**: Curved connections may need more space
        `,
      },
    },
  },
};

// Comparison showing all alignments side by side
const comparisonData = {
  value: "Root",
  child: [
    {
      value: "Large Branch",
      child: [
        { value: "A", child: [] },
        { value: "B", child: [] },
        { value: "C", child: [] },
      ],
    },
    {
      value: "Small",
      child: [{ value: "D", child: [] }],
    },
  ],
};

export const AlignmentComparison: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "15px",
      }}
    >
      <div>
        <h4
          style={{
            margin: "0 0 10px 0",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Left Aligned
        </h4>
        <TreeChart
          data={comparisonData}
          type="right-angle"
          verticalAlign="left"
          horizontalGap={25}
          verticalGap={50}
          nodeConfig={{
            color: "#FF9800",
            fontColor: "white",
            width: 70,
            height: 30,
            fontSize: 9,
          }}
          edgeConfig={{ color: "#666", width: 1 }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4
          style={{
            margin: "0 0 10px 0",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Center Aligned
        </h4>
        <TreeChart
          data={comparisonData}
          type="right-angle"
          verticalAlign="center"
          horizontalGap={25}
          verticalGap={50}
          nodeConfig={{
            color: "#9C27B0",
            fontColor: "white",
            width: 70,
            height: 30,
            fontSize: 9,
          }}
          edgeConfig={{ color: "#666", width: 1 }}
          width="100%"
          height="200px"
        />
      </div>
      <div>
        <h4
          style={{
            margin: "0 0 10px 0",
            textAlign: "center",
            fontSize: "12px",
          }}
        >
          Right Aligned
        </h4>
        <TreeChart
          data={comparisonData}
          type="right-angle"
          verticalAlign="right"
          horizontalGap={25}
          verticalGap={50}
          nodeConfig={{
            color: "#F44336",
            fontColor: "white",
            width: 70,
            height: 30,
            fontSize: 9,
          }}
          edgeConfig={{ color: "#666", width: 1 }}
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
This comparison shows how different vertical alignments affect tree layout with uneven branches:

- **Left Aligned**: Nodes justified to the left, creating a strong left edge
- **Center Aligned**: Nodes centered for balanced, symmetrical appearance  
- **Right Aligned**: Nodes justified to the right, creating a strong right edge

Notice how the alignment is particularly visible when branches have different numbers of children. 
The "Large Branch" with three children and "Small" with one child demonstrate how alignment 
affects the overall tree shape and visual balance.

Choose the alignment that best fits your design needs and reading patterns.
        `,
      },
    },
  },
};
