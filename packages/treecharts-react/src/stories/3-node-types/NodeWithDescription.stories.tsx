import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "3. Node Types/Node with Description",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Node with Description

Node with Description extends regular nodes by adding descriptive text beneath the main node value. 
This node type is perfect for organizational charts, process flows, and any scenario where you need to 
provide additional context or details for each node while maintaining a clean visual hierarchy.

## Features

- **Rich Context** - Display detailed descriptions alongside main values
- **Automatic Layout** - Smart text wrapping and positioning  
- **Consistent Styling** - Maintains visual hierarchy with description text
- **Flexible Content** - Supports varying description lengths
- **Professional Appearance** - Clean separation between title and description

## Data Structure

To use nodes with descriptions, simply add a \`description\` property to your tree data:

\`\`\`typescript
const nodeData = {
  value: "Node Title",           // Main node text (required)
  description: "Additional context and details", // Description text (optional)
  child: [...]                  // Child nodes
};
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

const organizationData = {
  value: "Company",
  description: "Technology startup with innovative solutions",
  child: [
    {
      value: "Engineering",
      description:
        "Software development and technical teams responsible for product innovation",
      child: [
        {
          value: "Frontend",
          description: "User interface and experience development",
          child: [],
        },
        {
          value: "Backend",
          description: "Server-side logic and infrastructure",
          child: [],
        },
      ],
    },
    {
      value: "Marketing",
      description: "Brand promotion and customer acquisition strategies",
      child: [
        {
          value: "Content",
          description: "Blog posts, social media, and educational materials",
          child: [],
        },
      ],
    },
    {
      value: "Sales",
      description: "Revenue generation and client relationship management",
      child: [],
    },
  ],
};

export const BasicDescriptionExample: Story = {
  args: {
    data: organizationData,
    type: "right-angle",
    nodeConfig: {
      type: "node-with-description",
      color: "#e8f4fd",
      fontColor: "#333",
      width: 180,
      height: 80,
      padding: 12,
      fontSize: 14,
      borderColor: "#b3d9ff",
      borderWidth: 1,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#7f8c8d",
      width: 1.5,
    },
    titleConfig: {
      title: "Organization Chart with Descriptions",
      description:
        "Each node shows a title with additional descriptive text for better context",
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates a basic organizational chart using nodes with descriptions. 
Each department has both a name and a description of its function, providing clear context 
about roles and responsibilities within the organization.

The descriptions automatically wrap to fit within the node width and maintain consistent 
spacing and typography throughout the chart.
        `,
      },
    },
  },
};

const processFlowData = {
  value: "Software Development Process",
  description: "Complete workflow from conception to deployment",
  child: [
    {
      value: "Planning",
      description:
        "Requirements gathering, analysis, and project scoping with stakeholder input",
      child: [
        {
          value: "Research",
          description: "Market analysis and technical feasibility studies",
          child: [],
        },
        {
          value: "Design",
          description: "UI/UX mockups and system architecture planning",
          child: [],
        },
      ],
    },
    {
      value: "Development",
      description:
        "Code implementation using agile methodologies and best practices",
      child: [
        {
          value: "Frontend",
          description: "User interface development with modern frameworks",
          child: [],
        },
        {
          value: "Backend",
          description: "Server-side logic, APIs, and database integration",
          child: [],
        },
      ],
    },
    {
      value: "Testing",
      description:
        "Quality assurance through automated and manual testing procedures",
      child: [],
    },
    {
      value: "Deployment",
      description:
        "Production release with monitoring and rollback capabilities",
      child: [],
    },
  ],
};

export const ProcessFlowWithDescriptions: Story = {
  args: {
    data: processFlowData,
    type: "curved",
    nodeConfig: {
      type: "node-with-description",
      color: "#f0f8ff",
      fontColor: "#2c3e50",
      width: 240,
      borderColor: "#3498db",
    },
    edgeConfig: {
      color: "#34495e",
      width: 2,
      curveRadius: 25,
    },
    titleConfig: {
      title: "Software Development Process Flow",
      description:
        "Detailed breakdown of development stages with comprehensive descriptions",
    },
    width: "100%",
    height: "600px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This process flow example shows how nodes with descriptions can be used to document 
complex workflows. Each stage includes detailed information about what happens during 
that phase, making it an excellent tool for process documentation and training materials.

The curved connections provide a flowing, organic feel that complements the detailed 
descriptive content.
        `,
      },
    },
  },
};

const teamStructureData = {
  value: "Leadership Team",
  description:
    "Executive leadership driving company vision and strategic direction",
  child: [
    {
      value: "Chief Executive Officer",
      description:
        "Overall company strategy, vision, and stakeholder relationships",
      child: [],
    },
    {
      value: "Chief Technology Officer",
      description:
        "Technology strategy, architecture decisions, and technical innovation",
      child: [
        {
          value: "VP Engineering",
          description:
            "Engineering team management and software delivery oversight",
          child: [],
        },
        {
          value: "VP Product",
          description:
            "Product strategy, roadmap planning, and user experience",
          child: [],
        },
      ],
    },
    {
      value: "Chief Financial Officer",
      description:
        "Financial planning, budgeting, and investor relations management",
      child: [],
    },
    {
      value: "Chief Marketing Officer",
      description:
        "Brand strategy, marketing campaigns, and customer acquisition",
      child: [
        {
          value: "Marketing Director",
          description: "Campaign execution and marketing team coordination",
          child: [],
        },
      ],
    },
  ],
};

export const TeamStructureChart: Story = {
  args: {
    data: teamStructureData,
    type: "right-angle",
    nodeConfig: {
      type: "node-with-description",
      color: "#ffffff",
      fontColor: "#2c3e50",
      width: 220,
      borderColor: "#e74c3c",
      borderWidth: 2,
      borderRadius: 12,
    },
    edgeConfig: {
      color: "#7f8c8d",
      width: 2,
    },
    titleConfig: {
      title: "Executive Team Structure",
      description:
        "Leadership hierarchy with detailed role descriptions and responsibilities",
    },
    width: "100%",
    height: "700px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This executive team structure demonstrates how nodes with descriptions can create 
comprehensive organizational charts. Each position includes detailed role descriptions, 
making it clear what each person is responsible for within the organization.

This type of chart is perfect for:
- Onboarding new employees
- Clarifying reporting structures  
- Documenting roles and responsibilities
- Board presentations and stakeholder communications
        `,
      },
    },
  },
};

// Configuration examples showing different styling options
const configData = {
  value: "Configuration",
  description: "Different styling options for description nodes",
  child: [
    {
      value: "Option A",
      description: "Standard configuration with default styling",
      child: [],
    },
    {
      value: "Option B",
      description: "Custom colors and typography",
      child: [],
    },
    {
      value: "Option C",
      description: "Enhanced spacing and borders",
      child: [],
    },
  ],
};

export const StylingOptions: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Standard Styling</h4>
        <TreeChart
          data={configData}
          type="direct"
          nodeConfig={{
            type: "node-with-description",
            color: "#f8f9fa",
            fontColor: "#333",
            width: 160,
            padding: 10,
            fontSize: 12,
            borderColor: "#dee2e6",
            borderWidth: 1,
            borderRadius: 6,
          }}
          width="100%"
          height="200px"
        />
      </div>

      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Enhanced Styling</h4>
        <TreeChart
          data={configData}
          type="direct"
          nodeConfig={{
            type: "node-with-description",
            color: "#e3f2fd",
            fontColor: "#1565c0",
            width: 180,
            padding: 15,
            fontSize: 13,
            borderColor: "#2196f3",
            borderWidth: 2,
            borderRadius: 10,
          }}
          width="100%"
          height="200px"
        />
      </div>

      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Professional Dark Theme</h4>
        <TreeChart
          data={configData}
          type="direct"
          nodeConfig={{
            type: "node-with-description",
            color: "#2c3e50",
            fontColor: "#ecf0f1",
            width: 170,
            padding: 12,
            fontSize: 12,
            borderColor: "#34495e",
            borderWidth: 1,
            borderRadius: 8,
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
This example showcases different styling approaches for nodes with descriptions:

1. **Standard Styling**: Clean, minimal appearance with light colors
2. **Enhanced Styling**: More prominent borders and spacing with blue theme
3. **Professional Dark Theme**: Dark background for modern, professional look

Key styling properties for description nodes:
- \`width\`: Controls node width (descriptions wrap to fit)
- \`padding\`: Internal spacing around content
- \`fontSize\`: Size of the main title text
- \`color\`: Background color of the node
- \`fontColor\`: Color of all text (title and description)
- \`borderColor\` & \`borderWidth\`: Border styling
- \`borderRadius\`: Corner roundness
        `,
      },
    },
  },
};
