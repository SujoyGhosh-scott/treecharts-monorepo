import type { Meta, StoryObj } from '@storybook/react';
import { TreeChart } from '../../TreeChart';

const meta: Meta<typeof TreeChart> = {
  title: '3. Node Types/Collapsible Nodes',
  component: TreeChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Collapsible Nodes

Collapsible nodes provide interactive accordion-style functionality, allowing users to expand and collapse 
node descriptions on demand. This is perfect for keeping charts clean while providing detailed information 
when needed.

## Features

- **Interactive Controls** - Click expand/collapse buttons with intuitive arrow indicators (▼ collapsed, ▲ expanded)
- **State Management** - Each node maintains its own expansion state via \`collapsibleState.expanded\`
- **Dynamic Layout** - Chart automatically recalculates layout when nodes are expanded or collapsed
- **Clean Initial View** - Start with collapsed descriptions for a clean overview, expand details as needed
- **Smart Text Wrapping** - When expanded, descriptions wrap intelligently with proper spacing
- **Preserved Functionality** - All standard node features work seamlessly with collapsible behavior

## Data Structure

To use collapsible nodes, add \`collapsibleState\` to control expansion state:

\`\`\`typescript
const nodeData = {
  value: "Node Title",
  description: "Detailed description that can be collapsed",
  collapsibleState: { expanded: false }, // Controls initial state
  child: [...]
};
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

const companyOverviewData = {
  value: "Company Overview",
  description: "Global technology corporation specializing in software development, innovation, and digital transformation solutions for enterprises worldwide",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Engineering Division",
      description: "World-class engineering teams focused on building scalable, robust software solutions using cutting-edge technologies and best practices",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Frontend Teams",
          description: "Specialized teams creating exceptional user experiences using React, Vue, Angular, and modern web technologies",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Backend Teams",
          description: "Server-side development experts building APIs, microservices, and distributed systems with high performance and reliability",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "DevOps Teams",
          description: "Infrastructure and deployment specialists ensuring smooth CI/CD pipelines, monitoring, and cloud operations",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Product Division",
      description: "Strategic product management teams driving innovation, user research, and market-fit validation for all company products",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Product Strategy",
          description: "Long-term product vision, roadmap planning, and competitive analysis to guide product development",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "User Experience",
          description: "UX research, design systems, and user interface design ensuring optimal user satisfaction and engagement",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Business Operations",
      description: "Supporting business functions including finance, human resources, legal, and administrative operations",
      collapsibleState: { expanded: false },
      child: []
    }
  ]
};

export const InteractiveOrganizationChart: Story = {
  args: {
    data: companyOverviewData,
    type: 'right-angle',
    nodeConfig: {
      type: 'collapsible-node',
      color: '#f8f9fa',
      fontColor: '#333333',
      width: 200,
      height: 80,
      padding: 12,
      fontSize: 11,
      borderColor: '#dee2e6',
      borderWidth: 1,
      borderRadius: 8,
    },
    edgeConfig: {
      color: '#6c757d',
      width: 2,
    },
    titleConfig: {
      title: 'Interactive Collapsible Organization Chart',
      description: 'Click the ▼ buttons to expand descriptions and explore the organization structure',
    },
    width: '100%',
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story: `
This interactive organization chart demonstrates the power of collapsible nodes. Users can:

- Click the ▼ button to expand descriptions and see detailed information
- Click the ▲ button to collapse descriptions for a cleaner view
- Each node maintains its own state independently
- The chart layout automatically adjusts as nodes expand and collapse

Try clicking the expansion buttons to see how the chart dynamically adapts to show or hide detailed information!
        `,
      },
    },
  },
};

const projectPlanData = {
  value: "Product Launch Project",
  description: "Complete product launch timeline with detailed phases, deliverables, and milestone requirements for successful market introduction",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Phase 1: Research & Planning",
      description: "Market research, competitive analysis, user interviews, technical feasibility studies, and comprehensive project planning with resource allocation",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Market Research",
          description: "Comprehensive market analysis including target audience identification, competitor assessment, pricing strategies, and market size evaluation",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Technical Planning",
          description: "Architecture design, technology stack selection, infrastructure requirements, and technical risk assessment",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Phase 2: Development",
      description: "Agile development process with regular sprints, code reviews, testing integration, and continuous delivery pipeline setup",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "MVP Development",
          description: "Minimum viable product development focusing on core features, basic functionality, and user feedback integration",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Feature Enhancement",
          description: "Advanced feature development, performance optimization, security implementation, and scalability improvements",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Phase 3: Testing & Launch",
      description: "Comprehensive testing including unit tests, integration tests, user acceptance testing, and coordinated launch campaign execution",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Quality Assurance",
          description: "Thorough testing procedures including automated testing, manual testing, performance testing, and security audits",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Launch Campaign",
          description: "Marketing campaign execution, press releases, social media promotion, and customer onboarding process",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    }
  ]
};

export const ProjectPlanningChart: Story = {
  args: {
    data: projectPlanData,
    type: 'curved',
    nodeConfig: {
      type: 'collapsible-node',
      color: '#e3f2fd',
      fontColor: '#1565c0',
      width: 220,
      height: 90,
      padding: 15,
      fontSize: 12,
      borderColor: '#2196f3',
      borderWidth: 2,
      borderRadius: 10,
    },
    edgeConfig: {
      color: '#1976d2',
      width: 2,
      curveRadius: 20,
    },
    titleConfig: {
      title: 'Project Planning with Collapsible Details',
      description: 'Explore project phases by expanding sections to see detailed requirements and deliverables',
    },
    width: '100%',
    height: '700px',
  },
  parameters: {
    docs: {
      description: {
        story: `
This project planning example shows how collapsible nodes can organize complex project information:

- **High-level Overview**: Initial view shows main phases without overwhelming detail
- **Progressive Disclosure**: Users can drill down into specific areas of interest
- **Detailed Planning**: Each phase contains comprehensive information when expanded
- **Visual Organization**: Curved connections create a flowing, professional appearance

Perfect for project documentation, timeline presentations, and stakeholder communications where you need both overview and detail views.
        `,
      },
    },
  },
};

const knowledgeBaseData = {
  value: "Product Documentation",
  description: "Comprehensive documentation covering all aspects of product usage, configuration, troubleshooting, and advanced features",
  collapsibleState: { expanded: false },
  child: [
    {
      value: "Getting Started Guide",
      description: "Step-by-step instructions for new users including account setup, initial configuration, basic features overview, and first-time user tutorials",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Installation",
          description: "Detailed installation instructions for different operating systems, requirements, dependencies, and troubleshooting common installation issues",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Configuration",
          description: "Initial setup procedures, environment configuration, user preferences, and customization options for optimal user experience",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Advanced Features",
      description: "In-depth documentation for power users covering advanced functionality, integrations, customizations, and expert-level configurations",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "API Documentation",
          description: "Complete API reference including endpoints, authentication, request/response formats, rate limiting, and code examples",
          collapsibleState: { expanded: false },
          child: []
        },
        {
          value: "Integrations",
          description: "Third-party integrations, webhook configurations, plugin development, and custom extension creation guidelines",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    },
    {
      value: "Troubleshooting",
      description: "Common issues, error messages, diagnostic procedures, and solutions for technical problems users might encounter",
      collapsibleState: { expanded: false },
      child: []
    }
  ]
};

export const DocumentationHierarchy: Story = {
  args: {
    data: knowledgeBaseData,
    type: 'direct',
    nodeConfig: {
      type: 'collapsible-node',
      color: '#fff3e0',
      fontColor: '#e65100',
      width: 190,
      height: 85,
      padding: 12,
      fontSize: 11,
      borderColor: '#ff9800',
      borderWidth: 1,
      borderRadius: 6,
    },
    edgeConfig: {
      color: '#f57c00',
      width: 2,
      showArrows: true,
      arrowDirection: 'source-to-target',
    },
    titleConfig: {
      title: 'Documentation Knowledge Base',
      description: 'Navigate through documentation sections by expanding relevant topics',
    },
    width: '100%',
    height: '600px',
  },
  parameters: {
    docs: {
      description: {
        story: `
This documentation hierarchy demonstrates how collapsible nodes can organize knowledge bases and help systems:

- **Structured Information**: Clear hierarchy of topics and subtopics
- **User-Driven Exploration**: Users find only the information they need
- **Reduced Cognitive Load**: Collapsed state prevents information overload
- **Efficient Navigation**: Quick access to relevant sections

Ideal for documentation sites, help systems, training materials, and any content that benefits from progressive disclosure.
        `,
      },
    },
  },
};

// State management demonstration
const stateExampleData = {
  value: "State Management Demo",
  description: "This node starts expanded to demonstrate initial state control",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Collapsed by Default",
      description: "This node starts collapsed and can be expanded by clicking the button",
      collapsibleState: { expanded: false },
      child: []
    },
    {
      value: "Expanded by Default",
      description: "This node starts expanded to show the description immediately",
      collapsibleState: { expanded: true },
      child: []
    },
    {
      value: "Mixed States",
      description: "Each node can have its own independent expansion state",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Child A",
          description: "Child nodes also have independent state management",
          collapsibleState: { expanded: true },
          child: []
        },
        {
          value: "Child B",
          description: "Each child maintains its own expansion state separately",
          collapsibleState: { expanded: false },
          child: []
        }
      ]
    }
  ]
};

export const StateManagementDemo: Story = {
  args: {
    data: stateExampleData,
    type: 'right-angle',
    nodeConfig: {
      type: 'collapsible-node',
      color: '#f3e5f5',
      fontColor: '#4a148c',
      width: 180,
      height: 75,
      padding: 10,
      fontSize: 11,
      borderColor: '#9c27b0',
      borderWidth: 1,
      borderRadius: 8,
    },
    edgeConfig: {
      color: '#7b1fa2',
      width: 2,
    },
    titleConfig: {
      title: 'Collapsible State Management',
      description: 'Example showing different initial states and independent state control',
    },
    width: '100%',
    height: '500px',
  },
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates the flexible state management of collapsible nodes:

- **Independent State**: Each node manages its own expansion state
- **Initial Control**: Set initial expanded/collapsed state via \`collapsibleState.expanded\`
- **Persistent Interaction**: User interactions update the state dynamically
- **Nested Behavior**: Parent and child nodes have independent controls

The \`collapsibleState.expanded\` property controls whether each node starts expanded (true) or collapsed (false).
        `,
      },
    },
  },
};
