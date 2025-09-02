import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "3. Node Types/Image Nodes",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Image Nodes

Image nodes allow you to create rich visual nodes with customizable images, titles, and descriptions. 
Perfect for team organizational charts, product catalogs, or any scenario where visual representation 
enhances understanding.

## Features

- **Flexible Image Display** - Support for any image URL with smart loading and error handling
- **Title and Subtitle Support** - Optional title and subtitle text with independent styling control
- **Configurable Text Positioning** - Position text above, below, left, or right of the image
- **Dynamic Sizing** - Automatic node sizing based on image dimensions and text content
- **Smart Layout Adaptation** - Image margins, padding, and spacing automatically adjust for optimal appearance
- **Border and Styling** - Customizable image borders, opacity, and background colors
- **Typography Control** - Independent font configuration for titles and subtitles with alignment options

## Data Structure

To use image nodes, add image-related properties to your tree data:

\`\`\`typescript
const nodeData = {
  value: "Fallback Text",        // Used if title is not provided
  imageUrl: "https://...",       // Image URL
  title: "Primary Title",        // Main title text (optional)
  subtitle: "Subtitle Text",     // Secondary text (optional)
  child: [...]
};
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

const teamData = {
  value: "Leadership Team",
  child: [
    {
      value: "CEO",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      title: "John Smith",
      subtitle: "Chief Executive Officer",
      child: [],
    },
    {
      value: "CTO",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b9297b60?w=150&h=150&fit=crop&crop=face",
      title: "Sarah Johnson",
      subtitle: "Chief Technology Officer",
      child: [
        {
          value: "Engineering Manager",
          imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          title: "Mike Chen",
          subtitle: "VP Engineering",
          child: [],
        },
        {
          value: "Product Manager",
          imageUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          title: "Lisa Rodriguez",
          subtitle: "VP Product",
          child: [],
        },
      ],
    },
    {
      value: "CFO",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      title: "David Wilson",
      subtitle: "Chief Financial Officer",
      child: [],
    },
  ],
};

export const TeamOrganizationChart: Story = {
  args: {
    data: teamData,
    type: "right-angle",
    nodeConfig: {
      type: "image",
      color: "#ffffff",
      width: 140,
      height: 160,
      borderColor: "#e0e0e0",
      borderWidth: 1,
      borderRadius: 12,
      imageConfig: {
        imageWidth: 80,
        imageHeight: 80,
        imageBorderRadius: 40,
        imageBorderColor: "#333333",
        imageBorderWidth: 2,
        imageOpacity: 1,
      },
      imageTitleConfig: {
        fontSize: 14,
        fontColor: "#333333",
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
        padding: 8,
        spacing: 4,
      },
      imageMargin: 8,
    },
    edgeConfig: {
      color: "#666",
      width: 2,
    },
    titleConfig: {
      title: "Team Organization Chart with Photos",
      description:
        "Visual representation of our leadership team with profile pictures",
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This team organization chart demonstrates image nodes with:

- **Profile Photos**: Professional headshots for each team member
- **Circular Images**: Rounded images create a friendly, approachable feel
- **Title and Subtitle**: Name and position clearly displayed
- **Professional Styling**: Clean layout suitable for business use
- **Bottom Text Position**: Text positioned below images for optimal readability

Perfect for HR systems, company directories, and team introduction materials.
        `,
      },
    },
  },
};

const productCatalogData = {
  value: "Product Catalog",
  child: [
    {
      value: "Smartphones",
      child: [
        {
          value: "iPhone 15 Pro",
          imageUrl:
            "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=150&h=150&fit=crop",
          title: "iPhone 15 Pro",
          subtitle: "$999 - Premium smartphone",
          child: [],
        },
        {
          value: "Samsung Galaxy S24",
          imageUrl:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop",
          title: "Galaxy S24",
          subtitle: "$899 - Android flagship",
          child: [],
        },
      ],
    },
    {
      value: "Laptops",
      child: [
        {
          value: "MacBook Pro",
          imageUrl:
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=150&h=150&fit=crop",
          title: 'MacBook Pro 16"',
          subtitle: "$2,499 - Professional laptop",
          child: [],
        },
        {
          value: "Dell XPS",
          imageUrl:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop",
          title: "Dell XPS 13",
          subtitle: "$1,299 - Ultrabook",
          child: [],
        },
      ],
    },
    {
      value: "Accessories",
      child: [
        {
          value: "Wireless Headphones",
          imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
          title: "AirPods Pro",
          subtitle: "$249 - Noise cancelling",
          child: [],
        },
      ],
    },
  ],
};

export const ProductCatalog: Story = {
  args: {
    data: productCatalogData,
    type: "curved",
    nodeConfig: {
      type: "image",
      color: "#f8f9fa",
      width: 160,
      height: 180,
      borderColor: "#dee2e6",
      borderWidth: 1,
      borderRadius: 8,
      imageConfig: {
        imageWidth: 100,
        imageHeight: 100,
        imageBorderRadius: 8,
        imageBorderColor: "#adb5bd",
        imageBorderWidth: 1,
        imageOpacity: 1,
      },
      imageTitleConfig: {
        fontSize: 13,
        fontColor: "#212529",
        fontWeight: "bold",
        alignment: "center",
      },
      imageSubtitleConfig: {
        fontSize: 11,
        fontColor: "#6c757d",
        fontWeight: "normal",
        alignment: "center",
      },
      imageTextPositionConfig: {
        position: "bottom",
        padding: 10,
        spacing: 3,
      },
      imageMargin: 10,
    },
    edgeConfig: {
      color: "#495057",
      width: 2,
      curveRadius: 20,
    },
    titleConfig: {
      title: "Product Catalog with Images",
      description:
        "Visual product hierarchy with images, names, and pricing information",
    },
    width: "100%",
    height: "600px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This product catalog example shows how image nodes can be used for e-commerce and product organization:

- **Product Images**: High-quality product photos
- **Product Information**: Names and pricing displayed clearly
- **Category Structure**: Hierarchical organization of products
- **Visual Appeal**: Images make the catalog more engaging and easier to browse

Great for product catalogs, inventory systems, and e-commerce applications.
        `,
      },
    },
  },
};

const softwareArchitectureData = {
  value: "System Architecture",
  child: [
    {
      value: "Frontend",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=150&h=150&fit=crop",
      title: "React App",
      subtitle: "User Interface Layer",
      child: [],
    },
    {
      value: "API Gateway",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&h=150&fit=crop",
      title: "API Gateway",
      subtitle: "Request Routing",
      child: [
        {
          value: "Auth Service",
          imageUrl:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&h=150&fit=crop",
          title: "Authentication",
          subtitle: "User Security",
          child: [],
        },
        {
          value: "User Service",
          imageUrl:
            "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=150&h=150&fit=crop",
          title: "User Management",
          subtitle: "Profile & Settings",
          child: [],
        },
      ],
    },
    {
      value: "Database",
      imageUrl:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=150&h=150&fit=crop",
      title: "PostgreSQL",
      subtitle: "Data Storage",
      child: [],
    },
  ],
};

export const SoftwareArchitecture: Story = {
  args: {
    data: softwareArchitectureData,
    type: "direct",
    nodeConfig: {
      type: "image",
      color: "#e3f2fd",
      width: 150,
      height: 170,
      borderColor: "#2196f3",
      borderWidth: 2,
      borderRadius: 10,
      imageConfig: {
        imageWidth: 70,
        imageHeight: 70,
        imageBorderRadius: 8,
        imageBorderColor: "#1976d2",
        imageBorderWidth: 1,
        imageOpacity: 0.9,
      },
      imageTitleConfig: {
        fontSize: 12,
        fontColor: "#0d47a1",
        fontWeight: "bold",
        alignment: "center",
      },
      imageSubtitleConfig: {
        fontSize: 10,
        fontColor: "#1565c0",
        fontWeight: "normal",
        alignment: "center",
      },
      imageTextPositionConfig: {
        position: "bottom",
        padding: 8,
        spacing: 2,
      },
      imageMargin: 8,
    },
    edgeConfig: {
      color: "#1976d2",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
    },
    titleConfig: {
      title: "Software Architecture Diagram",
      description:
        "Visual representation of system components with descriptive imagery",
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
This software architecture diagram demonstrates how image nodes can visualize technical systems:

- **Component Visualization**: Images represent different parts of the system
- **Technical Documentation**: Clear labeling of each component's purpose
- **Directional Flow**: Arrows show data flow between components
- **Professional Appearance**: Suitable for technical documentation and presentations

Ideal for system documentation, architecture reviews, and technical presentations.
        `,
      },
    },
  },
};

// Configuration examples showing different text positioning
const positioningData = {
  value: "Text Positioning",
  child: [
    {
      value: "Bottom Position",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      title: "Bottom Text",
      subtitle: "Text below image",
      child: [],
    },
    {
      value: "Right Position",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b9297b60?w=100&h=100&fit=crop&crop=face",
      title: "Right Text",
      subtitle: "Text to the right",
      child: [],
    },
    {
      value: "Left Position",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      title: "Left Text",
      subtitle: "Text to the left",
      child: [],
    },
  ],
};

export const TextPositioning: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Bottom Position</h4>
        <TreeChart
          data={{
            value: "Demo",
            imageUrl:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            title: "John Doe",
            subtitle: "Software Engineer",
            child: [],
          }}
          type="direct"
          nodeConfig={{
            type: "image",
            color: "#ffffff",
            width: 120,
            height: 140,
            borderRadius: 8,
            imageConfig: {
              imageWidth: 60,
              imageHeight: 60,
              imageBorderRadius: 30,
            },
            imageTitleConfig: { fontSize: 12, fontWeight: "bold" },
            imageSubtitleConfig: { fontSize: 10 },
            imageTextPositionConfig: {
              position: "bottom",
              padding: 8,
              spacing: 4,
            },
          }}
          width="200px"
          height="180px"
        />
      </div>

      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Right Position</h4>
        <TreeChart
          data={{
            value: "Demo",
            imageUrl:
              "https://images.unsplash.com/photo-1494790108755-2616b9297b60?w=100&h=100&fit=crop&crop=face",
            title: "Jane Smith",
            subtitle: "Product Manager",
            child: [],
          }}
          type="direct"
          nodeConfig={{
            type: "image",
            color: "#ffffff",
            width: 180,
            height: 80,
            borderRadius: 8,
            imageConfig: {
              imageWidth: 50,
              imageHeight: 50,
              imageBorderRadius: 25,
            },
            imageTitleConfig: {
              fontSize: 12,
              fontWeight: "bold",
              alignment: "left",
            },
            imageSubtitleConfig: { fontSize: 10, alignment: "left" },
            imageTextPositionConfig: {
              position: "right",
              padding: 8,
              spacing: 3,
            },
          }}
          width="220px"
          height="120px"
        />
      </div>

      <div>
        <h4 style={{ margin: "0 0 15px 0" }}>Left Position</h4>
        <TreeChart
          data={{
            value: "Demo",
            imageUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            title: "Mike Johnson",
            subtitle: "Designer",
            child: [],
          }}
          type="direct"
          nodeConfig={{
            type: "image",
            color: "#ffffff",
            width: 180,
            height: 80,
            borderRadius: 8,
            imageConfig: {
              imageWidth: 50,
              imageHeight: 50,
              imageBorderRadius: 25,
            },
            imageTitleConfig: {
              fontSize: 12,
              fontWeight: "bold",
              alignment: "right",
            },
            imageSubtitleConfig: { fontSize: 10, alignment: "right" },
            imageTextPositionConfig: {
              position: "left",
              padding: 8,
              spacing: 3,
            },
          }}
          width="220px"
          height="120px"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates the three text positioning options for image nodes:

1. **Bottom Position**: Text appears below the image (most common)
2. **Right Position**: Text appears to the right of the image (horizontal layout)
3. **Left Position**: Text appears to the left of the image (alternative horizontal layout)

Text positioning can be controlled via the \`imageTextPositionConfig.position\` property:
- \`bottom\`: Vertical layout with text below image
- \`right\`: Horizontal layout with text on the right
- \`left\`: Horizontal layout with text on the left

Each position automatically adjusts the node dimensions and spacing for optimal appearance.
        `,
      },
    },
  },
};
