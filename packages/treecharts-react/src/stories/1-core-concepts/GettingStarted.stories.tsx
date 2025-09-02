import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "1. Core Concepts/Getting Started",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Getting Started with TreeCharts React

TreeCharts React provides a simple and intuitive way to create tree visualizations in React applications. 
This component wraps the core TreeCharts library and provides a React-friendly interface.

## Basic Usage

The TreeChart component requires a \`data\` prop containing your tree structure. Each node should have a \`value\` property 
for the display text and a \`child\` array for children nodes.

## Tree Data Structure

TreeCharts uses a nested object structure where each node can have children:

\`\`\`typescript
interface TreeNode {
  value: string;           // Display text for the node
  child: TreeNode[];      // Array of child nodes
  description?: string;   // Optional description for enhanced nodes
  edgeText?: string;     // Optional text on connecting edge
  // ... other optional properties
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: false,
      description: "Tree data structure with nested nodes",
    },
    type: {
      control: "select",
      options: ["direct", "right-angle", "curved", "all-direction"],
      description: "Type of tree visualization",
    },
    nodeConfig: {
      control: false,
      description: "Node styling configuration",
    },
    edgeConfig: {
      control: false,
      description: "Edge/connection styling configuration",
    },
    titleConfig: {
      control: false,
      description: "Chart title configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Sample tree data used across stories
const basicTreeData = {
  value: "Root Node",
  child: [
    {
      value: "Child 1",
      child: [
        { value: "Grandchild 1", child: [] },
        { value: "Grandchild 2", child: [] },
      ],
    },
    {
      value: "Child 2",
      child: [],
    },
  ],
};

export const BasicExample: Story = {
  args: {
    data: basicTreeData,
    type: "right-angle",
    nodeConfig: {
      color: "#90EE90",
      width: 120,
      height: 50,
      fontSize: 14,
      fontColor: "black",
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This is the most basic example of a TreeChart component. It demonstrates:

- Simple tree data structure with nested nodes
- Right-angle connection type for clear hierarchy visualization
- Basic node styling with custom colors and dimensions
- Standard edge styling

The tree structure shows a root node with two children, where one child has its own children (grandchildren).
        `,
      },
    },
  },
};

const organizationData = {
  value: "CEO",
  child: [
    {
      value: "Engineering",
      child: [
        { value: "Frontend Team", child: [] },
        { value: "Backend Team", child: [] },
        { value: "DevOps Team", child: [] },
      ],
    },
    {
      value: "Marketing",
      child: [
        { value: "Content Team", child: [] },
        { value: "Design Team", child: [] },
      ],
    },
    {
      value: "Sales",
      child: [
        { value: "Enterprise Sales", child: [] },
        { value: "SMB Sales", child: [] },
      ],
    },
  ],
};

export const OrganizationChart: Story = {
  args: {
    data: organizationData,
    type: "right-angle",
    nodeConfig: {
      color: "#4CAF50",
      fontColor: "white",
      width: 140,
      height: 50,
      fontSize: 12,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#333",
      width: 2,
    },
    titleConfig: {
      title: "Company Organization Chart",
      description: "Hierarchical view of company structure",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
A more complex example showing an organizational chart with:

- Multiple levels of hierarchy (3 levels deep)
- Professional styling suitable for business use
- Chart title and description
- Proper spacing and layout for readability

This demonstrates how TreeCharts can be used for organizational visualization.
        `,
      },
    },
  },
};

const processFlowData = {
  value: "Start Process",
  child: [
    {
      value: "Collect Requirements",
      child: [
        {
          value: "Analysis Phase",
          child: [
            { value: "Design", child: [] },
            { value: "Review", child: [] },
          ],
        },
      ],
    },
    {
      value: "Implementation",
      child: [
        { value: "Development", child: [] },
        { value: "Testing", child: [] },
      ],
    },
    {
      value: "Deployment",
      child: [],
    },
  ],
};

export const ProcessFlow: Story = {
  args: {
    data: processFlowData,
    type: "direct",
    nodeConfig: {
      type: "diamond",
      color: "#2196F3",
      fontColor: "white",
      width: 120,
      height: 60,
      fontSize: 11,
    },
    edgeConfig: {
      color: "#757575",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
    },
    titleConfig: {
      title: "Process Flow Diagram",
      description: "Step-by-step process visualization",
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
A process flow example demonstrating:

- Diamond-shaped nodes for process steps
- Direct connections with arrows showing flow direction
- Multi-level process breakdown
- Professional color scheme

This shows how TreeCharts can be used for process documentation and workflow visualization.
        `,
      },
    },
  },
};
