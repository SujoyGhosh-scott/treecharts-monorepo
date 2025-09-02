import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "2. Tree Options/Connection Types",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Tree Connection Types

TreeCharts offers four distinct connection types to suit different visualization needs. Each renderer creates 
a unique visual style and is optimized for specific use cases.

- **Direct**: Straight lines connecting nodes - clean and minimal
- **Right Angle**: L-shaped connections - classic organizational chart style  
- **Curved**: Smooth curved connections - elegant and flowing
- **All Direction**: Radial layout - ideal for showcasing relationships from a central point

Each renderer supports the same core configuration options while providing its own unique visual characteristics.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["direct", "right-angle", "curved", "all-direction"],
      description: "Type of tree visualization",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Shared tree data for consistency across examples
const technologyStackData = {
  value: "Web Application",
  child: [
    {
      value: "Frontend",
      child: [
        { value: "React", child: [] },
        { value: "TypeScript", child: [] },
        { value: "Tailwind CSS", child: [] },
      ],
    },
    {
      value: "Backend",
      child: [
        { value: "Node.js", child: [] },
        { value: "Express", child: [] },
        { value: "PostgreSQL", child: [] },
      ],
    },
    {
      value: "DevOps",
      child: [
        { value: "Docker", child: [] },
        { value: "AWS", child: [] },
        { value: "GitHub Actions", child: [] },
      ],
    },
  ],
};

export const DirectConnections: Story = {
  args: {
    data: technologyStackData,
    type: "direct",
    nodeConfig: {
      color: "#4CAF50",
      fontColor: "white",
      width: 120,
      height: 50,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Direct Connections",
      description: "Straight lines connecting nodes for a clean, minimal look",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Direct connections** use straight lines to connect parent and child nodes. This creates a clean, minimal appearance 
that works well for:

- Simple hierarchies
- Technical diagrams  
- When you want to emphasize the content over the connections
- Minimal design aesthetics

The direct connection style is the most space-efficient and provides the clearest visual path between related nodes.
        `,
      },
    },
  },
};

export const RightAngleConnections: Story = {
  args: {
    data: technologyStackData,
    type: "right-angle",
    nodeConfig: {
      color: "#2196F3",
      fontColor: "white",
      width: 120,
      height: 50,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Right Angle Connections",
      description:
        "L-shaped connections for classic organizational chart style",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Right-angle connections** use L-shaped lines to create a classic organizational chart appearance. This style is perfect for:

- Organizational charts
- Process hierarchies
- Traditional business diagrams
- When you need clear parent-child relationships

The right-angle style creates clean horizontal and vertical lines that make the hierarchy very easy to follow.
        `,
      },
    },
  },
};

export const CurvedConnections: Story = {
  args: {
    data: technologyStackData,
    type: "curved",
    nodeConfig: {
      color: "#FF9800",
      fontColor: "white",
      width: 120,
      height: 50,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      curveRadius: 25,
    },
    titleConfig: {
      title: "Curved Connections",
      description:
        "Smooth curved connections for an elegant, flowing appearance",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Curved connections** use smooth curves to create an elegant, flowing appearance. This style works well for:

- Creative presentations
- Mind maps
- When you want a softer, more organic feel
- Modern, stylish visualizations

The curve radius can be customized via the \`edgeConfig.curveRadius\` property to make the curves more or less pronounced.
        `,
      },
    },
  },
};

export const AllDirectionRadial: Story = {
  args: {
    data: {
      value: "Central Concept",
      child: [
        { value: "Idea 1", child: [] },
        { value: "Idea 2", child: [] },
        { value: "Idea 3", child: [] },
        { value: "Idea 4", child: [] },
        { value: "Idea 5", child: [] },
        { value: "Idea 6", child: [] },
      ],
    },
    type: "all-direction",
    nodeConfig: {
      color: "#9C27B0",
      fontColor: "white",
      width: 100,
      height: 50,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "All Direction (Radial)",
      description:
        "Radial layout ideal for showcasing relationships from a central point",
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**All-direction (radial)** layout arranges child nodes in a circle around the parent node. This style is perfect for:

- Mind mapping
- Concept visualization
- Brainstorming sessions
- Central hub with related items
- When you want to emphasize equal importance of all children

The radial layout automatically distributes nodes evenly around the parent, creating a balanced and visually appealing arrangement.
        `,
      },
    },
  },
};

// Comparison story showing all types
const comparisonData = {
  value: "Root",
  child: [
    { value: "Child A", child: [] },
    { value: "Child B", child: [] },
    { value: "Child C", child: [] },
  ],
};

export const ComparisonView: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        height: "600px",
      }}
    >
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>Direct</h4>
        <TreeChart
          data={comparisonData}
          type="direct"
          nodeConfig={{
            color: "#4CAF50",
            fontColor: "white",
            width: 80,
            height: 40,
          }}
          edgeConfig={{ color: "#666", width: 2 }}
          width="100%"
          height="250px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          Right Angle
        </h4>
        <TreeChart
          data={comparisonData}
          type="right-angle"
          nodeConfig={{
            color: "#2196F3",
            fontColor: "white",
            width: 80,
            height: 40,
          }}
          edgeConfig={{ color: "#666", width: 2 }}
          width="100%"
          height="250px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>Curved</h4>
        <TreeChart
          data={comparisonData}
          type="curved"
          nodeConfig={{
            color: "#FF9800",
            fontColor: "white",
            width: 80,
            height: 40,
          }}
          edgeConfig={{ color: "#666", width: 2, curveRadius: 20 }}
          width="100%"
          height="250px"
        />
      </div>
      <div>
        <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
          All Direction
        </h4>
        <TreeChart
          data={comparisonData}
          type="all-direction"
          nodeConfig={{
            color: "#9C27B0",
            fontColor: "white",
            width: 80,
            height: 40,
          }}
          edgeConfig={{ color: "#666", width: 2 }}
          width="100%"
          height="250px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This comparison view shows all four connection types side by side using the same data structure. 
This makes it easy to see the visual differences and choose the style that best fits your needs.

Each connection type has its own strengths and is suitable for different use cases:
- **Direct**: Clean and minimal
- **Right Angle**: Traditional and structured  
- **Curved**: Elegant and flowing
- **All Direction**: Balanced and central-focused
        `,
      },
    },
  },
};
