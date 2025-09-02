import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "3. Node Types/Regular Nodes",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Regular Node Types

TreeCharts supports a variety of node shapes to fit different visualization needs. Regular nodes include 
basic geometric shapes like rectangles, circles, diamonds, and more complex shapes like hexagons, stars, and polygons.

Each shape can be customized with colors, borders, gradients, shadows, and other styling options.

## Available Node Types

- **Rectangle** - Classic rectangular nodes (default)
- **Circle** - Circular nodes for softer appearance
- **Diamond** - Diamond-shaped nodes for decision points
- **Hexagon** - Six-sided nodes for technical diagrams
- **Triangle** - Triangular nodes for directional flow
- **Pentagon** - Five-sided nodes for unique styling
- **Octagon** - Eight-sided nodes for stop signs or alerts
- **Star** - Star-shaped nodes for highlights or ratings
        `,
      },
    },
  },
  argTypes: {
    nodeConfig: {
      control: false,
      description:
        "Node styling configuration including type, colors, and dimensions",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Sample data for shape demonstrations
const shapeData = {
  value: "Root",
  child: [
    { value: "Child 1", child: [] },
    { value: "Child 2", child: [] },
    { value: "Child 3", child: [] },
  ],
};

export const RectangleNodes: Story = {
  args: {
    data: shapeData,
    type: "right-angle",
    nodeConfig: {
      type: "rectangle",
      color: "#4CAF50",
      fontColor: "white",
      width: 100,
      height: 50,
      fontSize: 12,
      borderRadius: 6,
      borderColor: "#2E7D32",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Rectangle Nodes",
      description:
        "Classic rectangular nodes - the default and most common choice",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Rectangle nodes** are the default and most commonly used node type. They offer:

- Clean, professional appearance
- Excellent text readability
- Easy to style with borders and rounded corners
- Works well for organizational charts, flowcharts, and general hierarchies
- Supports \`borderRadius\` for rounded corners
        `,
      },
    },
  },
};

export const CircleNodes: Story = {
  args: {
    data: shapeData,
    type: "direct",
    nodeConfig: {
      type: "circle",
      color: "#2196F3",
      fontColor: "white",
      width: 80,
      height: 80,
      fontSize: 11,
      borderColor: "#1565C0",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Circle Nodes",
      description: "Circular nodes for a softer, more organic appearance",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Circle nodes** provide a softer, more organic appearance that works well for:

- People-centric organizational charts
- Mind maps and brainstorming
- Network diagrams
- When you want to emphasize connections over hierarchy
- Modern, friendly design aesthetics

Note: For circles, width and height should be equal for a perfect circle.
        `,
      },
    },
  },
};

export const DiamondNodes: Story = {
  args: {
    data: {
      value: "Start",
      child: [
        {
          value: "Decision Point",
          child: [
            { value: "Yes", child: [] },
            { value: "No", child: [] },
          ],
        },
      ],
    },
    type: "direct",
    nodeConfig: {
      type: "diamond",
      color: "#FF9800",
      fontColor: "white",
      width: 100,
      height: 60,
      fontSize: 11,
      borderColor: "#F57C00",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
    },
    titleConfig: {
      title: "Diamond Nodes",
      description:
        "Diamond-shaped nodes perfect for decision points and flowcharts",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Diamond nodes** are traditionally used for decision points and conditional logic in flowcharts. They're perfect for:

- Decision trees and flowcharts
- Process diagrams with conditional branches
- Highlighting choice points
- Technical documentation
- Algorithm visualization

Diamonds naturally draw attention and indicate that a decision or choice needs to be made.
        `,
      },
    },
  },
};

export const HexagonNodes: Story = {
  args: {
    data: shapeData,
    type: "curved",
    nodeConfig: {
      type: "hexagon",
      color: "#9C27B0",
      fontColor: "white",
      width: 90,
      height: 70,
      fontSize: 11,
      borderColor: "#7B1FA2",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      curveRadius: 20,
    },
    titleConfig: {
      title: "Hexagon Nodes",
      description: "Six-sided nodes for technical diagrams and unique styling",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Hexagon nodes** offer a unique six-sided shape that works well for:

- Technical and engineering diagrams
- Chemical structures or molecular diagrams  
- Honeycomb-style layouts
- Modern, geometric design aesthetics
- When you want something different from standard shapes

Hexagons provide a good balance between the organic feel of circles and the structure of rectangles.
        `,
      },
    },
  },
};

export const TriangleNodes: Story = {
  args: {
    data: {
      value: "Process Flow",
      child: [
        { value: "Step 1", child: [] },
        { value: "Step 2", child: [] },
        { value: "Step 3", child: [] },
      ],
    },
    type: "direct",
    nodeConfig: {
      type: "triangle",
      color: "#F44336",
      fontColor: "white",
      width: 80,
      height: 70,
      fontSize: 10,
      borderColor: "#D32F2F",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
    },
    titleConfig: {
      title: "Triangle Nodes",
      description: "Triangular nodes for directional flow and dynamic designs",
    },
    width: "100%",
    height: "300px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Triangle nodes** provide directional emphasis and work well for:

- Process flows with directional movement
- Warning or alert indicators
- Dynamic, energetic designs
- Pointing to important elements
- Modern, angular design aesthetics

Triangles naturally suggest movement and direction, making them perfect for flow-based diagrams.
        `,
      },
    },
  },
};

export const StarNodes: Story = {
  args: {
    data: {
      value: "Awards",
      child: [
        { value: "Gold ⭐", child: [] },
        { value: "Silver ⭐", child: [] },
        { value: "Bronze ⭐", child: [] },
      ],
    },
    type: "all-direction",
    nodeConfig: {
      type: "star",
      color: "#FFD700",
      fontColor: "#333",
      width: 90,
      height: 90,
      fontSize: 10,
      borderColor: "#FFA000",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Star Nodes",
      description:
        "Star-shaped nodes for highlights, ratings, and special emphasis",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Star nodes** are perfect for highlighting special or important items. They work well for:

- Rating systems and achievements
- Highlighting featured items
- Awards and recognition systems
- Favorite or bookmarked items
- Fun, playful designs

Stars naturally draw attention and convey importance, excellence, or special status.
        `,
      },
    },
  },
};

// Shape comparison view
export const ShapeComparison: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
      }}
    >
      {[
        { type: "rectangle" as const, color: "#4CAF50", name: "Rectangle" },
        { type: "circle" as const, color: "#2196F3", name: "Circle" },
        { type: "diamond" as const, color: "#FF9800", name: "Diamond" },
        { type: "hexagon" as const, color: "#9C27B0", name: "Hexagon" },
        { type: "triangle" as const, color: "#F44336", name: "Triangle" },
        { type: "pentagon" as const, color: "#795548", name: "Pentagon" },
        { type: "octagon" as const, color: "#607D8B", name: "Octagon" },
        { type: "star" as const, color: "#FFD700", name: "Star" },
      ].map((shape) => (
        <div key={shape.type} style={{ textAlign: "center" }}>
          <h5 style={{ margin: "0 0 10px 0", fontSize: "12px" }}>
            {shape.name}
          </h5>
          <TreeChart
            data={{ value: shape.name, child: [] }}
            type="direct"
            nodeConfig={{
              type: shape.type,
              color: shape.color,
              fontColor: shape.type === "star" ? "#333" : "white",
              width: 80,
              height: 60,
              fontSize: 10,
            }}
            width="100%"
            height="100px"
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This comparison shows all available regular node shapes side by side. Each shape has its own character and use case:

- **Rectangle**: Professional, readable, versatile
- **Circle**: Soft, organic, people-focused  
- **Diamond**: Decision points, flowcharts
- **Hexagon**: Technical, geometric, modern
- **Triangle**: Directional, dynamic, energetic
- **Pentagon**: Unique, government/military themes
- **Octagon**: Stop signs, warnings, alerts
- **Star**: Highlights, ratings, achievements

Choose the shape that best fits your content and design aesthetic.
        `,
      },
    },
  },
};
