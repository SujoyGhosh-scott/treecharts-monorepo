import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "3. Node Types/Custom Shape Nodes",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Custom Shape Nodes

Custom shape nodes provide extensive visual variety through built-in geometric shapes and unlimited custom SVG paths. 
These nodes enable you to create visually distinctive tree structures where different shapes can represent different 
categories, types, or hierarchical levels.

## Features

- **9 Built-in Shapes** - Complete geometric shape library for immediate use (circle, diamond, triangle, pentagon, hexagon, octagon, star, ellipse)
- **Custom SVG Paths** - Create any shape using standard SVG path syntax
- **Visual Categorization** - Use shapes to represent different data types or categories
- **Consistent Styling** - All shapes support the same styling options (colors, borders, gradients)
- **Flexible Positioning** - Shapes automatically position and scale within node dimensions
- **Professional Appearance** - Clean, precise geometric shapes for polished visualizations

## Built-in Shape Types

TreeCharts provides 9 geometric shapes out of the box:

- **Rectangle**: Standard rectangular nodes (default)
- **Circle**: Perfect circular nodes
- **Ellipse**: Oval-shaped nodes
- **Diamond**: Diamond/rhombus shaped nodes
- **Triangle**: Triangular nodes
- **Pentagon**: Five-sided polygon nodes
- **Hexagon**: Six-sided polygon nodes
- **Octagon**: Eight-sided polygon nodes
- **Star**: Star-shaped nodes (10-point star)

## Custom SVG Paths

For unlimited shape possibilities, use the \`"custom"\` type with SVG path data. Paths use standard SVG path commands 
and are positioned relative to the node's coordinate system.

## Common Use Cases

- **Process Flow Diagrams**: Different shapes for different process types
- **Organizational Charts**: Shape hierarchy for different organizational levels
- **System Architecture**: Technical diagrams with specific component shapes
- **Decision Trees**: Diamonds for decisions, circles for outcomes
- **Network Diagrams**: Custom shapes for different network components
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Built-in geometric shapes showcase
const geometricShapesData = {
  value: "Geometric Shapes",
  nodeConfig: {
    type: "hexagon" as const,
    color: "#e8f4fd",
    borderWidth: 2,
    borderColor: "#2980b9",
  },
  child: [
    {
      value: "Circle",
      nodeConfig: {
        type: "circle" as const,
        color: "#98FB98",
        borderWidth: 2,
        borderColor: "#27ae60",
      },
      child: [
        {
          value: "Pentagon",
          nodeConfig: {
            type: "pentagon" as const,
            color: "#87CEEB",
            borderWidth: 2,
            borderColor: "#2980b9",
          },
          child: [],
        },
      ],
    },
    {
      value: "Diamond",
      nodeConfig: {
        type: "diamond" as const,
        color: "#FFD700",
        borderWidth: 2,
        borderColor: "#f39c12",
      },
      child: [
        {
          value: "Octagon",
          nodeConfig: {
            type: "octagon" as const,
            color: "#DDA0DD",
            borderWidth: 2,
            borderColor: "#8e44ad",
          },
          child: [],
        },
      ],
    },
    {
      value: "Triangle",
      nodeConfig: {
        type: "triangle" as const,
        color: "#FFB6C1",
        borderWidth: 2,
        borderColor: "#e91e63",
      },
      child: [
        {
          value: "Star",
          nodeConfig: {
            type: "star" as const,
            color: "#F0E68C",
            borderWidth: 2,
            borderColor: "#f39c12",
          },
          child: [],
        },
      ],
    },
    {
      value: "Ellipse",
      nodeConfig: {
        type: "ellipse" as const,
        color: "#FFA07A",
        borderWidth: 2,
        borderColor: "#e67e22",
      },
      child: [],
    },
  ],
};

export const GeometricShapes: Story = {
  args: {
    data: geometricShapesData,
    type: "right-angle",
    horizontalGap: 100,
    verticalGap: 80,
    nodeConfig: {
      width: 80,
      height: 60,
      fontSize: 11,
      fontColor: "#333333",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Showcase of all built-in geometric shapes:
- Hexagon root node with blue styling
- Circle, diamond, and triangle as main branches
- Pentagon, octagon, star, and ellipse as child nodes
- Each shape uses distinct colors and consistent border styling
- Perfect for understanding the variety of available shapes
        `,
      },
    },
  },
};

// Custom heart shape example
const heartShapeData = {
  value: "Love Tree",
  nodeConfig: {
    type: "custom" as const,
    color: "#e91e63",
    borderWidth: 3,
    borderColor: "#ad1457",
    customAttributes: {
      d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
    },
  },
  child: [
    {
      value: "Family",
      nodeConfig: {
        type: "custom" as const,
        color: "#ff4081",
        borderWidth: 2,
        borderColor: "#c2185b",
        customAttributes: {
          d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
        },
      },
      child: [
        {
          value: "Parents",
          nodeConfig: {
            type: "custom" as const,
            color: "#f8bbd9",
            borderWidth: 2,
            borderColor: "#e91e63",
            customAttributes: {
              d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
            },
          },
          child: [],
        },
        {
          value: "Siblings",
          nodeConfig: {
            type: "custom" as const,
            color: "#f8bbd9",
            borderWidth: 2,
            borderColor: "#e91e63",
            customAttributes: {
              d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "Friends",
      nodeConfig: {
        type: "custom" as const,
        color: "#ff4081",
        borderWidth: 2,
        borderColor: "#c2185b",
        customAttributes: {
          d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
        },
      },
      child: [
        {
          value: "Close Friends",
          nodeConfig: {
            type: "custom" as const,
            color: "#f8bbd9",
            borderWidth: 2,
            borderColor: "#e91e63",
            customAttributes: {
              d: "M 40,20 C 40,15 35,10 25,10 C 15,10 10,15 10,25 C 10,35 40,55 40,55 C 40,55 70,35 70,25 C 70,15 65,10 55,10 C 45,10 40,15 40,20 Z",
            },
          },
          child: [],
        },
      ],
    },
  ],
};

export const HeartShapeTree: Story = {
  args: {
    data: heartShapeData,
    type: "right-angle",
    horizontalGap: 120,
    verticalGap: 90,
    nodeConfig: {
      width: 80,
      height: 60,
      fontSize: 10,
      fontColor: "#ffffff",
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Beautiful heart-shaped tree using custom SVG paths:
- All nodes use the same heart shape with custom SVG path
- Gradient color scheme from dark pink to light pink
- Perfect for family trees, relationship maps, or love-themed content
- Demonstrates how custom shapes can create thematic visualizations
- White text on colored backgrounds for optimal contrast

The heart path uses cubic Bézier curves to create smooth, romantic heart shapes.
        `,
      },
    },
  },
};

// Arrow flow example
const arrowFlowData = {
  value: "Process Flow",
  nodeConfig: {
    type: "custom" as const,
    color: "#4caf50",
    borderWidth: 2,
    borderColor: "#2e7d32",
    customAttributes: {
      d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z",
    },
  },
  child: [
    {
      value: "Input",
      nodeConfig: {
        type: "custom" as const,
        color: "#2196f3",
        borderWidth: 2,
        borderColor: "#1565c0",
        customAttributes: {
          d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z",
        },
      },
      child: [
        {
          value: "Validate",
          nodeConfig: {
            type: "custom" as const,
            color: "#ff9800",
            borderWidth: 2,
            borderColor: "#ef6c00",
            customAttributes: {
              d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "Process",
      nodeConfig: {
        type: "custom" as const,
        color: "#9c27b0",
        borderWidth: 2,
        borderColor: "#6a1b9a",
        customAttributes: {
          d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z",
        },
      },
      child: [
        {
          value: "Output",
          nodeConfig: {
            type: "custom" as const,
            color: "#f44336",
            borderWidth: 2,
            borderColor: "#c62828",
            customAttributes: {
              d: "M 10,20 L 50,20 L 50,10 L 70,30 L 50,50 L 50,40 L 10,40 Z",
            },
          },
          child: [],
        },
      ],
    },
  ],
};

export const ArrowFlowChart: Story = {
  args: {
    data: arrowFlowData,
    type: "right-angle",
    horizontalGap: 110,
    verticalGap: 80,
    nodeConfig: {
      width: 80,
      height: 60,
      fontSize: 10,
      fontColor: "#ffffff",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Process flow diagram using custom arrow shapes:
- All nodes use directional arrow shapes pointing right
- Different colors for each process stage
- Perfect for workflow diagrams, process maps, or step-by-step guides
- Arrow shape suggests forward progress and direction
- Bright colors help distinguish different process stages

The arrow path creates a classic right-pointing arrow with rectangular body and triangular head.
        `,
      },
    },
  },
};

// Mixed shapes for organization chart
const orgChartData = {
  value: "Company",
  nodeConfig: {
    type: "hexagon" as const,
    color: "#2c3e50",
    borderWidth: 3,
    borderColor: "#1a252f",
  },
  child: [
    {
      value: "Executive Team",
      nodeConfig: {
        type: "diamond" as const,
        color: "#e74c3c",
        borderWidth: 2,
        borderColor: "#c0392b",
      },
      child: [
        {
          value: "CEO",
          nodeConfig: {
            type: "star" as const,
            color: "#f39c12",
            borderWidth: 2,
            borderColor: "#d68910",
          },
          child: [],
        },
        {
          value: "CTO",
          nodeConfig: {
            type: "star" as const,
            color: "#f39c12",
            borderWidth: 2,
            borderColor: "#d68910",
          },
          child: [],
        },
      ],
    },
    {
      value: "Departments",
      nodeConfig: {
        type: "pentagon" as const,
        color: "#3498db",
        borderWidth: 2,
        borderColor: "#2980b9",
      },
      child: [
        {
          value: "Engineering",
          nodeConfig: {
            type: "circle" as const,
            color: "#27ae60",
            borderWidth: 2,
            borderColor: "#229954",
          },
          child: [],
        },
        {
          value: "Marketing",
          nodeConfig: {
            type: "triangle" as const,
            color: "#9b59b6",
            borderWidth: 2,
            borderColor: "#8e44ad",
          },
          child: [],
        },
      ],
    },
  ],
};

export const OrganizationalChart: Story = {
  args: {
    data: orgChartData,
    type: "right-angle",
    horizontalGap: 120,
    verticalGap: 90,
    nodeConfig: {
      width: 90,
      height: 70,
      fontSize: 11,
      fontColor: "#ffffff",
    },
    width: "100%",
    height: "450px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Organizational chart using different shapes for hierarchy:
- **Hexagon**: Company (top level)
- **Diamond**: Executive divisions
- **Star**: C-level executives (highest importance)
- **Pentagon**: Department divisions
- **Circle**: Engineering department (collaborative)
- **Triangle**: Marketing department (dynamic/growth)

Each shape represents a different organizational level and role type, creating visual hierarchy through geometry.
        `,
      },
    },
  },
};

// Custom cloud shape for network diagram
const networkDiagramData = {
  value: "Cloud Infrastructure",
  nodeConfig: {
    type: "custom" as const,
    color: "#ecf0f1",
    borderWidth: 2,
    borderColor: "#bdc3c7",
    customAttributes: {
      d: "M 25,35 C 15,35 10,25 15,20 C 15,15 20,10 25,10 C 30,8 35,8 40,10 C 45,8 50,8 55,10 C 60,10 65,15 65,20 C 70,25 65,35 55,35 Z",
    },
  },
  child: [
    {
      value: "Web Servers",
      nodeConfig: {
        type: "rectangle" as const,
        color: "#3498db",
        borderWidth: 2,
        borderColor: "#2980b9",
      },
      child: [
        {
          value: "Load Balancer",
          nodeConfig: {
            type: "diamond" as const,
            color: "#e67e22",
            borderWidth: 2,
            borderColor: "#d35400",
          },
          child: [],
        },
      ],
    },
    {
      value: "Database Cluster",
      nodeConfig: {
        type: "circle" as const,
        color: "#27ae60",
        borderWidth: 2,
        borderColor: "#229954",
      },
      child: [
        {
          value: "Cache Layer",
          nodeConfig: {
            type: "ellipse" as const,
            color: "#9b59b6",
            borderWidth: 2,
            borderColor: "#8e44ad",
          },
          child: [],
        },
      ],
    },
  ],
};

export const NetworkDiagram: Story = {
  args: {
    data: networkDiagramData,
    type: "right-angle",
    horizontalGap: 130,
    verticalGap: 90,
    nodeConfig: {
      width: 100,
      height: 70,
      fontSize: 10,
      fontColor: "#2c3e50",
    },
    width: "100%",
    height: "400px",
  },
  parameters: {
    docs: {
      description: {
        story: `
Network infrastructure diagram with custom cloud shape:
- **Custom Cloud**: Main infrastructure using custom SVG path
- **Rectangle**: Web servers (standard components)
- **Diamond**: Load balancer (decision/routing point)
- **Circle**: Database cluster (data storage)
- **Ellipse**: Cache layer (memory/speed optimization)

Demonstrates mixing custom shapes with built-in shapes for technical diagrams.
        `,
      },
    },
  },
};

// File system structure with custom folder and file shapes
const fileSystemData = {
  value: "Project Root",
  nodeConfig: {
    type: "custom" as const,
    color: "#f39c12",
    borderWidth: 2,
    borderColor: "#d68910",
    customAttributes: {
      d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
    },
  },
  child: [
    {
      value: "src",
      nodeConfig: {
        type: "custom" as const,
        color: "#f39c12",
        borderWidth: 2,
        borderColor: "#d68910",
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "index.js",
          nodeConfig: {
            type: "custom" as const,
            color: "#ecf0f1",
            borderWidth: 2,
            borderColor: "#bdc3c7",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
        {
          value: "utils.js",
          nodeConfig: {
            type: "custom" as const,
            color: "#ecf0f1",
            borderWidth: 2,
            borderColor: "#bdc3c7",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "assets",
      nodeConfig: {
        type: "custom" as const,
        color: "#f39c12",
        borderWidth: 2,
        borderColor: "#d68910",
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "logo.png",
          nodeConfig: {
            type: "custom" as const,
            color: "#ecf0f1",
            borderWidth: 2,
            borderColor: "#bdc3c7",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
        {
          value: "styles.css",
          nodeConfig: {
            type: "custom" as const,
            color: "#ecf0f1",
            borderWidth: 2,
            borderColor: "#bdc3c7",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "README.md",
      nodeConfig: {
        type: "custom" as const,
        color: "#ecf0f1",
        borderWidth: 2,
        borderColor: "#bdc3c7",
        customAttributes: {
          d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
        },
      },
      child: [],
    },
    {
      value: "package.json",
      nodeConfig: {
        type: "custom" as const,
        color: "#ecf0f1",
        borderWidth: 2,
        borderColor: "#bdc3c7",
        customAttributes: {
          d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
        },
      },
      child: [],
    },
  ],
};

export const FileSystemStructure: Story = {
  args: {
    data: fileSystemData,
    type: "right-angle",
    horizontalGap: 120,
    verticalGap: 80,
    nodeConfig: {
      width: 80,
      height: 60,
      fontSize: 9,
      fontColor: "#2c3e50",
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
File system structure using custom folder and file shapes:
- **Yellow Folders**: Custom folder shape with tab and 3D effect
- **White Files**: Custom file shape with folded corner detail
- **Realistic Structure**: Represents actual project folder hierarchy
- **Visual Distinction**: Easy to distinguish between folders and files
- **Practical Example**: Perfect for documentation, tutorials, or system diagrams

The folder shape uses a path that creates a realistic folder with a tab, while the file shape includes a folded corner detail that's common in file icons.
        `,
      },
    },
  },
};
