import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";
import React from "react";

const meta: Meta<typeof TreeChart> = {
  title: "6. Advanced Features/Real World Examples",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Real World Examples

This section showcases comprehensive examples that demonstrate how TreeCharts can be used 
in real-world scenarios. These examples combine multiple features and styling options to 
create professional, production-ready visualizations.

Each example represents a common use case and demonstrates best practices for:
- Data structure organization
- Visual styling and branding
- Feature combination
- Professional presentation
- User experience considerations

Use these examples as starting points for your own implementations or as inspiration 
for creating custom visualizations that meet your specific needs.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

const corporateOrgData = {
  value: "Global Corporation",
  description:
    "Multinational technology company with operations across 50+ countries",
  imageUrl:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop",
  title: "GlobalTech Inc.",
  subtitle: "Fortune 500 Technology Leader",
  child: [
    {
      value: "Chief Executive Officer",
      description:
        "Strategic leadership and overall company direction, investor relations, and board communications",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "John Smith",
      subtitle: "CEO & Chairman",
      child: [
        {
          value: "Chief Technology Officer",
          description:
            "Technology strategy, innovation roadmap, and digital transformation initiatives",
          imageUrl:
            "https://images.unsplash.com/photo-1494790108755-2616b9297b60?w=150&h=150&fit=crop&crop=face",
          title: "Sarah Johnson",
          subtitle: "CTO",
          child: [
            {
              value: "VP Engineering",
              description:
                "Software development teams, architecture decisions, and technical delivery",
              imageUrl:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
              title: "Mike Chen",
              subtitle: "VP Engineering",
              child: [],
            },
            {
              value: "VP Product",
              description:
                "Product strategy, user experience, and market-driven innovation",
              imageUrl:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
              title: "Lisa Rodriguez",
              subtitle: "VP Product",
              child: [],
            },
          ],
        },
        {
          value: "Chief Financial Officer",
          description:
            "Financial planning, investor relations, risk management, and strategic investments",
          imageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
          title: "David Wilson",
          subtitle: "CFO",
          child: [],
        },
        {
          value: "Chief Marketing Officer",
          description:
            "Brand strategy, customer acquisition, digital marketing, and market expansion",
          imageUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
          title: "Emily Davis",
          subtitle: "CMO",
          child: [],
        },
      ],
    },
  ],
};

export const CorporateOrganizationChart: Story = {
  args: {
    data: corporateOrgData,
    type: "right-angle",
    horizontalGap: 60,
    verticalGap: 100,
    nodeConfig: {
      type: "image",
      color: "#ffffff",
      width: 200,
      height: 180,
      borderColor: "#e0e0e0",
      borderWidth: 2,
      borderRadius: 12,
      imageConfig: {
        imageWidth: 80,
        imageHeight: 80,
        imageBorderRadius: 40,
        imageBorderColor: "#1976d2",
        imageBorderWidth: 3,
        imageOpacity: 1,
      },
      imageTitleConfig: {
        fontSize: 14,
        fontColor: "#1976d2",
        fontWeight: "bold",
        alignment: "center",
      },
      imageSubtitleConfig: {
        fontSize: 11,
        fontColor: "#666666",
        fontWeight: "normal",
        alignment: "center",
      },
      imageTextPositionConfig: {
        position: "bottom",
        padding: 10,
        spacing: 4,
      },
      imageMargin: 12,
    },
    edgeConfig: {
      color: "#1976d2",
      width: 3,
      opacity: 0.8,
    },
    titleConfig: {
      title: "Executive Leadership Structure",
      description:
        "Senior leadership team driving strategic initiatives and organizational growth",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 24,
        fontColor: "#1976d2",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 30,
      },
      descriptionStyle: {
        fontSize: 14,
        fontColor: "#424242",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 20,
      },
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "executive-leadership-chart",
      },
    },
    width: "100%",
    height: "700px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Corporate Organization Chart** - A professional executive leadership chart featuring:

- **Image Nodes**: Professional headshots for each executive
- **Rich Descriptions**: Detailed role descriptions and responsibilities
- **Professional Styling**: Corporate blue color scheme with clean borders
- **Download Capability**: Users can save the chart for presentations
- **Comprehensive Titles**: Professional title and description
- **Optimal Spacing**: Generous spacing for executive-level presentations

Perfect for: Annual reports, board presentations, investor communications, and HR documentation.
        `,
      },
    },
  },
};

const projectTimelineData = {
  value: "Product Launch Timeline",
  description: "Complete 18-month roadmap from concept to market launch",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Q1 2024: Research & Planning",
      description:
        "Market research, competitive analysis, technical feasibility studies, and comprehensive project planning with stakeholder alignment",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Market Research",
          description:
            "Comprehensive market analysis, target audience identification, competitive landscape review, and pricing strategy development",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Technical Architecture",
          description:
            "System design, technology stack selection, scalability planning, and infrastructure requirements assessment",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Resource Planning",
          description:
            "Team composition, skill requirements, budget allocation, and timeline estimation with risk assessment",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
    {
      value: "Q2-Q3 2024: Development Phase",
      description:
        "Agile development with regular sprints, continuous integration, and iterative testing cycles",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "MVP Development",
          description:
            "Core feature development, basic functionality implementation, and initial user feedback integration",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Feature Enhancement",
          description:
            "Advanced feature development, performance optimization, security implementation, and scalability improvements",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Quality Assurance",
          description:
            "Comprehensive testing including unit tests, integration tests, security audits, and performance validation",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
    {
      value: "Q4 2024: Pre-Launch",
      description:
        "Final preparations, marketing campaigns, and launch readiness validation",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Beta Testing",
          description:
            "Limited user testing, feedback collection, bug fixes, and final feature refinements",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Marketing Campaign",
          description:
            "Brand awareness campaigns, content creation, press releases, and customer onboarding preparation",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
    {
      value: "Q1 2025: Launch & Scale",
      description:
        "Product launch execution, monitoring, optimization, and scaling based on market response",
      collapsibleState: { expanded: false },
      child: [],
    },
  ],
};

export const ProjectTimelineChart: Story = {
  args: {
    data: projectTimelineData,
    type: "curved",
    horizontalGap: 50,
    verticalGap: 90,
    nodeConfig: {
      type: "collapsible-node",
      color: "#e8f5e8",
      fontColor: "#2e7d32",
      width: 240,
      height: 85,
      padding: 15,
      fontSize: 12,
      borderColor: "#4caf50",
      borderWidth: 2,
      borderRadius: 10,
    },
    edgeConfig: {
      color: "#388e3c",
      width: 3,
      curveRadius: 30,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 8,
    },
    titleConfig: {
      title: "Product Development Roadmap",
      description:
        "Interactive timeline with expandable details for each phase - click ▼ to explore",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 22,
        fontColor: "#2e7d32",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 25,
      },
      descriptionStyle: {
        fontSize: 13,
        fontColor: "#424242",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 18,
      },
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "product-development-roadmap",
      },
    },
    width: "100%",
    height: "800px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Interactive Project Timeline** - A comprehensive project roadmap featuring:

- **Collapsible Nodes**: Click to expand/collapse detailed information
- **Timeline Structure**: Quarterly phases with clear progression
- **Detailed Planning**: Comprehensive descriptions for each phase and milestone
- **Interactive Exploration**: Users can drill down into areas of interest
- **Professional Styling**: Green theme suggesting growth and progress
- **Curved Connections**: Smooth flow representing project progression

Perfect for: Project presentations, stakeholder updates, team planning sessions, and milestone tracking.
        `,
      },
    },
  },
};

const softwareArchitectureData = {
  value: "Microservices Architecture",
  child: [
    {
      value: "API Gateway",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=150&fit=crop",
      title: "Kong Gateway",
      subtitle: "Request Routing & Auth",
      child: [
        {
          value: "Rate Limiting",
          imageUrl:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
          title: "Rate Limiter",
          subtitle: "Traffic Control",
          child: [],
        },
        {
          value: "Authentication",
          imageUrl:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
          title: "Auth Service",
          subtitle: "JWT & OAuth2",
          child: [],
        },
      ],
    },
    {
      value: "Core Services",
      child: [
        {
          value: "User Service",
          imageUrl:
            "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=150&h=150&fit=crop",
          title: "User Management",
          subtitle: "Node.js + Express",
          child: [],
        },
        {
          value: "Order Service",
          imageUrl:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&h=150&fit=crop",
          title: "Order Processing",
          subtitle: "Java Spring Boot",
          child: [],
        },
        {
          value: "Payment Service",
          imageUrl:
            "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=150&h=150&fit=crop",
          title: "Payment Gateway",
          subtitle: "Python FastAPI",
          child: [],
        },
      ],
    },
    {
      value: "Data Layer",
      child: [
        {
          value: "Primary Database",
          imageUrl:
            "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=150&h=150&fit=crop",
          title: "PostgreSQL",
          subtitle: "ACID Transactions",
          child: [],
        },
        {
          value: "Cache Layer",
          imageUrl:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop",
          title: "Redis Cluster",
          subtitle: "High-Speed Cache",
          child: [],
        },
        {
          value: "Message Queue",
          imageUrl:
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop",
          title: "Apache Kafka",
          subtitle: "Event Streaming",
          child: [],
        },
      ],
    },
  ],
};

export const SoftwareArchitectureChart: Story = {
  args: {
    data: softwareArchitectureData,
    type: "direct",
    horizontalGap: 45,
    verticalGap: 75,
    nodeConfig: {
      type: "image",
      color: "#f5f5f5",
      width: 150,
      height: 130,
      borderColor: "#2196f3",
      borderWidth: 2,
      borderRadius: 8,
      imageConfig: {
        imageWidth: 60,
        imageHeight: 60,
        imageBorderRadius: 6,
        imageBorderColor: "#1976d2",
        imageBorderWidth: 1,
        imageOpacity: 0.9,
      },
      imageTitleConfig: {
        fontSize: 12,
        fontColor: "#1976d2",
        fontWeight: "bold",
        alignment: "center",
      },
      imageSubtitleConfig: {
        fontSize: 10,
        fontColor: "#424242",
        fontWeight: "normal",
        alignment: "center",
      },
      imageTextPositionConfig: {
        position: "bottom",
        padding: 6,
        spacing: 2,
      },
      imageMargin: 8,
    },
    edgeConfig: {
      color: "#1976d2",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 7,
      opacity: 0.8,
    },
    titleConfig: {
      title: "Microservices System Architecture",
      description:
        "Scalable cloud-native architecture with containerized services and modern tech stack",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 20,
        fontColor: "#1976d2",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 25,
      },
      descriptionStyle: {
        fontSize: 12,
        fontColor: "#424242",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 15,
      },
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "microservices-architecture",
      },
    },
    width: "100%",
    height: "600px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Software Architecture Diagram** - A technical system overview featuring:

- **Visual Components**: Images representing different system components
- **Technical Details**: Technology stack information for each service
- **Clear Hierarchy**: Logical grouping of related services
- **Professional Layout**: Direct connections showing data flow
- **Technical Styling**: Blue theme appropriate for technical documentation
- **Compact Design**: Efficient use of space for complex systems

Perfect for: Technical documentation, architecture reviews, developer onboarding, and system planning.
        `,
      },
    },
  },
};

const decisionTreeData = {
  value: "Customer Support Decision Tree",
  child: [
    {
      value: "Issue Category?",
      child: [
        {
          value: "Technical Issue",
          edgeText: "Tech",
          child: [
            {
              value: "Severity Level?",
              child: [
                {
                  value: "Critical - Immediate Escalation",
                  edgeText: "High",
                  child: [],
                },
                {
                  value: "Standard - Technical Support",
                  edgeText: "Medium",
                  child: [],
                },
                {
                  value: "Low - Self-Service Portal",
                  edgeText: "Low",
                  child: [],
                },
              ],
            },
          ],
        },
        {
          value: "Billing Issue",
          edgeText: "Billing",
          child: [
            {
              value: "Account Review Required",
              child: [],
            },
          ],
        },
        {
          value: "General Inquiry",
          edgeText: "General",
          child: [
            {
              value: "FAQ / Knowledge Base",
              child: [],
            },
          ],
        },
      ],
    },
  ],
};

export const DecisionTreeChart: Story = {
  args: {
    data: decisionTreeData,
    type: "right-angle",
    horizontalGap: 40,
    verticalGap: 70,
    nodeConfig: {
      type: "diamond",
      color: "#ff9800",
      fontColor: "white",
      width: 140,
      height: 70,
      fontSize: 10,
      borderColor: "#f57c00",
      borderWidth: 2,
    },
    edgeConfig: {
      color: "#f57c00",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
      textSize: 9,
      textColor: "#e65100",
      textBackgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    titleConfig: {
      title: "Customer Support Decision Framework",
      description:
        "Automated routing system for efficient customer issue resolution",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 18,
        fontColor: "#e65100",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 25,
      },
      descriptionStyle: {
        fontSize: 12,
        fontColor: "#424242",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 15,
      },
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "customer-support-decision-tree",
      },
    },
    width: "100%",
    height: "550px",
  },
  parameters: {
    docs: {
      description: {
        story: `
**Decision Tree Workflow** - A customer support routing system featuring:

- **Diamond Nodes**: Perfect for decision points and conditional logic
- **Edge Labels**: Clear path indicators showing decision options
- **Logical Flow**: Structured decision-making process
- **Orange Theme**: Attention-grabbing color for important decisions
- **Right-Angle Connections**: Clear, structured flow paths
- **Professional Terminology**: Business-appropriate language

Perfect for: Process documentation, workflow automation, training materials, and operational procedures.
        `,
      },
    },
  },
};

export const ShowcaseComparison: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
        height: "800px",
      }}
    >
      <div>
        <h3
          style={{
            margin: "0 0 20px 0",
            textAlign: "center",
            color: "#1976d2",
          }}
        >
          Corporate Organization
        </h3>
        <TreeChart
          data={{
            value: "CEO",
            imageUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            title: "John Smith",
            subtitle: "Chief Executive",
            child: [
              {
                value: "CTO",
                imageUrl:
                  "https://images.unsplash.com/photo-1494790108755-2616b9297b60?w=100&h=100&fit=crop&crop=face",
                title: "Sarah Johnson",
                subtitle: "Technology Lead",
                child: [],
              },
              {
                value: "CFO",
                imageUrl:
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                title: "David Wilson",
                subtitle: "Financial Lead",
                child: [],
              },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            type: "image",
            color: "#ffffff",
            width: 120,
            height: 100,
            borderColor: "#1976d2",
            borderWidth: 1,
            borderRadius: 8,
            imageConfig: {
              imageWidth: 50,
              imageHeight: 50,
              imageBorderRadius: 25,
            },
            imageTitleConfig: { fontSize: 10, fontWeight: "bold" },
            imageSubtitleConfig: { fontSize: 8 },
            imageTextPositionConfig: {
              position: "bottom",
              padding: 4,
              spacing: 2,
            },
          }}
          edgeConfig={{ color: "#1976d2", width: 2 }}
          width="100%"
          height="350px"
        />
      </div>

      <div>
        <h3
          style={{
            margin: "0 0 20px 0",
            textAlign: "center",
            color: "#4caf50",
          }}
        >
          Project Timeline
        </h3>
        <TreeChart
          data={{
            value: "Project Launch",
            description: "6-month development timeline",
            collapsibleState: { expanded: true },
            child: [
              {
                value: "Phase 1",
                description: "Planning and research phase",
                collapsibleState: { expanded: false },
                child: [],
              },
              {
                value: "Phase 2",
                description: "Development and testing",
                collapsibleState: { expanded: false },
                child: [],
              },
              {
                value: "Phase 3",
                description: "Launch and optimization",
                collapsibleState: { expanded: false },
                child: [],
              },
            ],
          }}
          type="curved"
          nodeConfig={{
            type: "collapsible-node",
            color: "#e8f5e8",
            fontColor: "#2e7d32",
            width: 140,
            height: 60,
            padding: 8,
            fontSize: 9,
            borderColor: "#4caf50",
            borderWidth: 1,
            borderRadius: 6,
          }}
          edgeConfig={{ color: "#4caf50", width: 2, curveRadius: 15 }}
          width="100%"
          height="350px"
        />
      </div>

      <div>
        <h3
          style={{
            margin: "0 0 20px 0",
            textAlign: "center",
            color: "#ff9800",
          }}
        >
          Decision Process
        </h3>
        <TreeChart
          data={{
            value: "Start Process",
            child: [
              {
                value: "Evaluate Options",
                edgeText: "assess",
                child: [
                  { value: "Option A", edgeText: "yes", child: [] },
                  { value: "Option B", edgeText: "no", child: [] },
                ],
              },
            ],
          }}
          type="direct"
          nodeConfig={{
            type: "diamond",
            color: "#ff9800",
            fontColor: "white",
            width: 100,
            height: 50,
            fontSize: 9,
          }}
          edgeConfig={{
            color: "#f57c00",
            width: 2,
            showArrows: true,
            arrowDirection: "source-to-target",
            textSize: 8,
            textColor: "#e65100",
            textBackgroundColor: "rgba(255,255,255,0.8)",
          }}
          width="100%"
          height="350px"
        />
      </div>

      <div>
        <h3
          style={{
            margin: "0 0 20px 0",
            textAlign: "center",
            color: "#9c27b0",
          }}
        >
          System Architecture
        </h3>
        <TreeChart
          data={{
            value: "API Gateway",
            imageUrl:
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop",
            title: "Kong Gateway",
            subtitle: "Request Router",
            child: [
              {
                value: "Auth Service",
                imageUrl:
                  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop",
                title: "Authentication",
                subtitle: "JWT Tokens",
                child: [],
              },
              {
                value: "User Service",
                imageUrl:
                  "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=100&h=100&fit=crop",
                title: "User API",
                subtitle: "Node.js",
                child: [],
              },
            ],
          }}
          type="right-angle"
          nodeConfig={{
            type: "image",
            color: "#f3e5f5",
            width: 100,
            height: 80,
            borderColor: "#9c27b0",
            borderWidth: 1,
            borderRadius: 6,
            imageConfig: {
              imageWidth: 40,
              imageHeight: 40,
              imageBorderRadius: 4,
            },
            imageTitleConfig: { fontSize: 9, fontWeight: "bold" },
            imageSubtitleConfig: { fontSize: 7 },
            imageTextPositionConfig: {
              position: "bottom",
              padding: 3,
              spacing: 1,
            },
          }}
          edgeConfig={{ color: "#9c27b0", width: 2 }}
          width="100%"
          height="350px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Real-World Use Cases Showcase** - Four common applications of TreeCharts:

1. **Corporate Organization**: Executive teams with photos and roles
2. **Project Timeline**: Interactive phases with collapsible details  
3. **Decision Process**: Workflow with conditional paths and labels
4. **System Architecture**: Technical components with visual representations

Each example demonstrates:
- **Different Node Types**: Images, descriptions, collapsible, diamonds
- **Varied Styling**: Color themes appropriate for each use case
- **Professional Appearance**: Suitable for business and technical contexts
- **Specific Features**: Tailored to the particular visualization needs

These examples can serve as templates for your own implementations, showing how to combine 
TreeCharts features effectively for different scenarios and audiences.
        `,
      },
    },
  },
};
