import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "6. Advanced Features/Chart Titles & Actions",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Advanced Features

TreeCharts provides advanced features to enhance your visualizations including chart titles, 
descriptions, and action buttons for additional functionality.

## Chart Titles

Add professional titles and descriptions to your charts with full styling control:

- **Title and Description**: Main title and subtitle text
- **Positioning**: Top/bottom and left/center/right positioning
- **Styling**: Custom fonts, colors, sizes, and spacing
- **Professional Appearance**: Perfect for presentations and reports

## Action Buttons

Interactive features for enhanced user experience:

- **Download Feature**: Allow users to download chart as SVG
- **Positioning**: Place buttons in any corner
- **Custom Actions**: Extend with your own action buttons

## Title Configuration

\`\`\`typescript
titleConfig: {
  title: string;                    // Main title text
  description: string;              // Subtitle/description text
  position: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
  titleStyle: {                     // Main title styling
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    margin: number;
  };
  descriptionStyle: {               // Description styling
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    margin: number;
  };
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

const sampleData = {
  value: "Technology Stack",
  child: [
    {
      value: "Frontend",
      child: [
        { value: "React", child: [] },
        { value: "TypeScript", child: [] },
        { value: "Tailwind", child: [] },
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
      ],
    },
  ],
};

export const ChartWithTitle: Story = {
  args: {
    data: sampleData,
    type: "right-angle",
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
      title: "Modern Technology Stack",
      description:
        "Our current technology choices for web application development",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic chart title configuration with:
- Centered title at the top
- Main title and descriptive subtitle
- Default styling for professional appearance
- Perfect for presentations and documentation

The title provides context and helps viewers understand what the chart represents.
        `,
      },
    },
  },
};

export const CustomTitleStyling: Story = {
  args: {
    data: sampleData,
    type: "curved",
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
      curveRadius: 20,
    },
    titleConfig: {
      title: "Enterprise Architecture Overview",
      description:
        "Comprehensive technology stack for scalable enterprise applications",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 24,
        fontColor: "#1565C0",
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
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Custom title styling demonstrates:
- Large, bold title (24px) for high impact
- Professional blue color scheme
- Descriptive subtitle with smaller text (14px)
- Custom margins for optimal spacing
- Professional appearance suitable for executive presentations

All title styling properties can be customized to match your brand or design requirements.
        `,
      },
    },
  },
};

export const BottomPositionedTitle: Story = {
  args: {
    data: sampleData,
    type: "direct",
    nodeConfig: {
      color: "#FF9800",
      fontColor: "white",
      width: 160,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 3,
    },
    titleConfig: {
      title: "Technology Decision Tree",
      description:
        "Technology choices and their relationships in our development process",
      position: {
        horizontal: "center",
        vertical: "bottom",
      },
      titleStyle: {
        fontSize: 18,
        fontColor: "#E65100",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 25,
      },
      descriptionStyle: {
        fontSize: 12,
        fontColor: "#5D4037",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 15,
      },
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Bottom-positioned title example:
- Title appears below the chart instead of above
- Useful when you want the chart to be the first thing viewers see
- Good for presentations where you want to explain after showing
- Maintains the same styling options as top-positioned titles

The bottom position works well in scenarios where you want the visual impact first, 
followed by the explanation.
        `,
      },
    },
  },
};

export const LeftAlignedTitle: Story = {
  args: {
    data: sampleData,
    type: "right-angle",
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
    },
    titleConfig: {
      title: "Development Stack Analysis",
      description:
        "Current technologies used across different layers of our application",
      position: {
        horizontal: "left",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 16,
        fontColor: "#4A148C",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 20,
      },
      descriptionStyle: {
        fontSize: 12,
        fontColor: "#6A1B9A",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 15,
      },
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Left-aligned title configuration:
- Title and description aligned to the left side
- Creates a more casual, document-like appearance
- Good for reports and detailed documentation
- Works well when the chart is part of a larger left-aligned layout

Left alignment can make the chart feel more integrated with surrounding text content.
        `,
      },
    },
  },
};

export const RightAlignedTitle: Story = {
  args: {
    data: sampleData,
    type: "curved",
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
      curveRadius: 25,
    },
    titleConfig: {
      title: "System Architecture",
      description:
        "High-level overview of our application architecture and technology choices",
      position: {
        horizontal: "right",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 16,
        fontColor: "#C62828",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 20,
      },
      descriptionStyle: {
        fontSize: 12,
        fontColor: "#D32F2F",
        fontFamily: "Arial, sans-serif",
        fontWeight: "normal",
        margin: 15,
      },
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Right-aligned title configuration:
- Title and description aligned to the right side
- Less common but useful for specific design requirements
- Good for right-to-left reading languages
- Can create visual balance with left-aligned content elsewhere

Right alignment might be used to balance other elements in a complex layout.
        `,
      },
    },
  },
};

export const WithDownloadAction: Story = {
  args: {
    data: sampleData,
    type: "right-angle",
    nodeConfig: {
      color: "#607D8B",
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
      title: "Interactive Technology Chart",
      description:
        "Chart with download functionality - click the download button to save as SVG",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    actionConfig: {
      download: {
        enabled: true,
        position: "top-right",
        filename: "technology-stack-chart",
      },
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Chart with download functionality:
- Download button appears in the top-right corner
- Users can save the chart as an SVG file
- Custom filename can be specified
- Button position is configurable (top-left, top-right, bottom-left, bottom-right)

The download feature is perfect for:
- Allowing users to save charts for reports
- Creating shareable visualizations
- Enabling offline use of the charts
- Integration with documentation workflows

\`\`\`typescript
actionConfig: {
  download: {
    enabled: true,
    position: 'top-right',
    filename: 'my-chart'
  }
}
\`\`\`
        `,
      },
    },
  },
};

// Comprehensive example combining multiple features
const comprehensiveData = {
  value: "Digital Transformation Initiative",
  child: [
    {
      value: "Phase 1: Foundation",
      child: [
        { value: "Infrastructure Setup", child: [] },
        { value: "Team Training", child: [] },
        { value: "Tool Selection", child: [] },
      ],
    },
    {
      value: "Phase 2: Implementation",
      child: [
        { value: "System Migration", child: [] },
        { value: "Process Automation", child: [] },
        { value: "Quality Assurance", child: [] },
      ],
    },
    {
      value: "Phase 3: Optimization",
      child: [
        { value: "Performance Monitoring", child: [] },
        { value: "Continuous Improvement", child: [] },
      ],
    },
  ],
};

export const ComprehensiveExample: Story = {
  args: {
    data: comprehensiveData,
    type: "curved",
    horizontalGap: 50,
    verticalGap: 80,
    nodeConfig: {
      type: "rectangle",
      color: "#1976D2",
      fontColor: "white",
      borderColor: "#0D47A1",
      borderWidth: 1,
      width: 160,
    },
    edgeConfig: {
      color: "#1565C0",
      width: 3,
      curveRadius: 0,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 4,
      opacity: 0.9,
    },
    titleConfig: {
      title: "Digital Transformation Roadmap",
      description:
        "Strategic initiative to modernize our technology infrastructure and business processes",
      position: {
        horizontal: "center",
        vertical: "top",
      },
      titleStyle: {
        fontSize: 20,
        fontColor: "#0D47A1",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        margin: 25,
      },
      descriptionStyle: {
        fontSize: 13,
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
        filename: "digital-transformation-roadmap",
      },
    },
    width: "100%",
    height: "550px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This comprehensive example combines multiple advanced features:

**Visual Features:**
- Professional curved connections with arrows
- Custom spacing for optimal readability  
- Consistent color scheme throughout
- Border styling for enhanced appearance

**Content Features:**
- Descriptive title and subtitle
- Clear phase-based organization
- Professional terminology and structure

**Interactive Features:**
- Download button for saving the chart
- Custom filename for the downloaded file

**Styling Features:**
- Custom title positioning and styling
- Professional color palette
- Proper spacing and margins
- Enterprise-ready appearance

This example demonstrates how to create presentation-ready charts suitable for 
executive reports, project documentation, and stakeholder communications.
        `,
      },
    },
  },
};
