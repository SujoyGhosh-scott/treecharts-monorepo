import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "7. Container Fitting/Auto-Scaling",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Auto-Scaling Container Fitting

TreeCharts React automatically scales to fit any container size using SVG viewBox scaling. 
This ensures that your tree visualizations never overflow their containers and remain responsive across different screen sizes.

## How It Works

The TreeChart component automatically:
1. Calculates the optimal size for your tree content
2. Sets an SVG viewBox to preserve the original layout
3. Scales the entire visualization to fit the available container space
4. Maintains the aspect ratio to prevent distortion

## Key Benefits

- **No Overflow**: Trees automatically fit their containers
- **Responsive**: Works on all screen sizes
- **Aspect Ratio Preserved**: Content never gets distorted
- **Zero Configuration**: Works automatically without any props
- **Performance**: Uses native SVG scaling (no JavaScript calculations)

This feature is enabled by default and requires no additional configuration.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// Large tree data to demonstrate scaling
const largeTreeData = {
  value: "Root Organization",
  child: [
    {
      value: "Engineering Division",
      child: [
        {
          value: "Frontend Teams",
          child: [
            { value: "React Team", child: [] },
            { value: "Vue Team", child: [] },
            { value: "Angular Team", child: [] },
          ],
        },
        {
          value: "Backend Teams",
          child: [
            { value: "Node.js Team", child: [] },
            { value: "Python Team", child: [] },
            { value: "Java Team", child: [] },
          ],
        },
        {
          value: "DevOps Teams",
          child: [
            { value: "AWS Team", child: [] },
            { value: "Docker Team", child: [] },
            { value: "CI/CD Team", child: [] },
          ],
        },
      ],
    },
    {
      value: "Product Division",
      child: [
        {
          value: "Design Teams",
          child: [
            { value: "UX Research", child: [] },
            { value: "UI Design", child: [] },
            { value: "Product Design", child: [] },
          ],
        },
        {
          value: "Management Teams",
          child: [
            { value: "Product Managers", child: [] },
            { value: "Project Managers", child: [] },
            { value: "Scrum Masters", child: [] },
          ],
        },
      ],
    },
    {
      value: "Business Division",
      child: [
        {
          value: "Sales Teams",
          child: [
            { value: "Enterprise Sales", child: [] },
            { value: "SMB Sales", child: [] },
            { value: "Inside Sales", child: [] },
          ],
        },
        {
          value: "Marketing Teams",
          child: [
            { value: "Content Marketing", child: [] },
            { value: "Digital Marketing", child: [] },
            { value: "Brand Marketing", child: [] },
          ],
        },
      ],
    },
  ],
};

export const SmallContainer: Story = {
  args: {
    data: largeTreeData,
    type: "right-angle",
    nodeConfig: {
      color: "#3B82F6",
      fontColor: "white",
      width: 120,
      height: 45,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#64748B",
      width: 2,
    },
    titleConfig: {
      title: "Auto-Scaling Demo - Small Container",
      description:
        "This large tree automatically scales to fit a 300x200px container",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "300px",
          height: "200px",
          border: "2px dashed #e2e8f0",
          backgroundColor: "#f8fafc",
          padding: "8px",
          margin: "20px auto",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates auto-scaling in a very small container (300x200px). 
Notice how the entire tree, which would normally be much larger, scales down to fit perfectly within the constrained space.

The container has a dashed border to clearly show the boundaries.
        `,
      },
    },
  },
};

export const MediumContainer: Story = {
  args: {
    data: largeTreeData,
    type: "right-angle",
    nodeConfig: {
      color: "#10B981",
      fontColor: "white",
      width: 120,
      height: 45,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#64748B",
      width: 2,
    },
    titleConfig: {
      title: "Auto-Scaling Demo - Medium Container",
      description: "The same tree in a 600x400px container shows more detail",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          height: "400px",
          border: "2px dashed #e2e8f0",
          backgroundColor: "#f8fafc",
          padding: "8px",
          margin: "20px auto",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
The same tree data in a medium-sized container (600x400px). 
The tree automatically uses the available space more effectively, showing more detail while still fitting perfectly.
        `,
      },
    },
  },
};

export const LargeContainer: Story = {
  args: {
    data: largeTreeData,
    type: "right-angle",
    nodeConfig: {
      color: "#8B5CF6",
      fontColor: "white",
      width: 120,
      height: 45,
      fontSize: 11,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#64748B",
      width: 2,
    },
    titleConfig: {
      title: "Auto-Scaling Demo - Large Container",
      description:
        "In a large 800x600px container, the tree is clearly readable",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "800px",
          height: "600px",
          border: "2px dashed #e2e8f0",
          backgroundColor: "#f8fafc",
          padding: "8px",
          margin: "20px auto",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
In a large container (800x600px), the tree has plenty of space and remains highly readable.
The auto-scaling ensures optimal use of available space while maintaining the tree's proportions.
        `,
      },
    },
  },
};

export const ResponsiveWidth: Story = {
  args: {
    data: {
      value: "Responsive Demo",
      child: [
        {
          value: "Auto-Scaling",
          child: [
            { value: "Small Screens", child: [] },
            { value: "Large Screens", child: [] },
          ],
        },
        {
          value: "Always Fits",
          child: [
            { value: "Mobile", child: [] },
            { value: "Desktop", child: [] },
          ],
        },
      ],
    },
    type: "curved",
    nodeConfig: {
      color: "#EF4444",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 12,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#94A3B8",
      width: 2,
    },
    titleConfig: {
      title: "Responsive Width Demo",
      description: "Resize your browser to see the tree adapt automatically",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "300px",
          minWidth: "200px",
          border: "2px dashed #e2e8f0",
          backgroundColor: "#f8fafc",
          padding: "8px",
          resize: "horizontal",
          overflow: "auto",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
This container is set to 100% width and is resizable. Try dragging the bottom-right corner of the container 
to see how the tree automatically adapts to different widths while maintaining its aspect ratio.

This demonstrates how TreeCharts work responsively in real web layouts.
        `,
      },
    },
  },
};

export const NaturalSize: Story = {
  args: {
    data: {
      value: "Natural Size",
      child: [
        { value: "Child 1", child: [] },
        { value: "Child 2", child: [] },
      ],
    },
    type: "right-angle",
    nodeConfig: {
      color: "#6366F1",
      fontColor: "white",
      width: 100,
      height: 40,
      fontSize: 12,
      borderRadius: 6,
    },
    edgeConfig: {
      color: "#64748B",
      width: 2,
    },
    titleConfig: {
      title: "Natural Size - No Upscaling",
      description: "Small tree stays at original size even in large container",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "1000px",
          height: "600px",
          border: "2px dashed #e2e8f0",
          backgroundColor: "#f8fafc",
          padding: "8px",
          margin: "20px auto",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
When the container is much larger than the tree content, the tree now stays at its **original size** instead of scaling up. 
This preserves the intended font sizes, node dimensions, and overall visual design.

The tree is automatically centered in the available space, maintaining optimal readability without becoming unnecessarily large.

**Key behavior:**
- ✅ **Scale down** when container is smaller than content
- ❌ **Never scale up** when container is larger than content
- 🎯 **Always preserve** original design intentions
        `,
      },
    },
  },
};

export const ScaleDownOnly: Story = {
  args: {
    data: {
      value: "Scale Down Demo",
      child: [
        {
          value: "Large Node Content Here",
          child: [
            { value: "Child with longer text", child: [] },
            { value: "Another child node", child: [] },
            { value: "Third child element", child: [] },
          ],
        },
        {
          value: "Second Branch",
          child: [
            { value: "Nested content here", child: [] },
            { value: "More nested items", child: [] },
          ],
        },
      ],
    },
    type: "right-angle",
    nodeConfig: {
      color: "#F59E0B",
      fontColor: "white",
      width: 150,
      height: 50,
      fontSize: 13,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#64748B",
      width: 2,
    },
    titleConfig: {
      title: "Scale Down Only Behavior",
      description:
        "This tree will scale down but never up from its natural size",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        {/* Small container */}
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
            Small Container (scales down)
          </h4>
          <div
            style={{
              width: "250px",
              height: "150px",
              border: "2px solid #ef4444",
              backgroundColor: "#fef2f2",
              padding: "8px",
              margin: "0 auto",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Story />
            </div>
          </div>
        </div>

        {/* Large container */}
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
            Large Container (natural size)
          </h4>
          <div
            style={{
              width: "600px",
              height: "400px",
              border: "2px solid #10b981",
              backgroundColor: "#f0fdf4",
              padding: "8px",
              margin: "0 auto",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Story />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: `
This side-by-side comparison shows the "scale down only" behavior:

**Left (Red Container)**: Tree is larger than container, so it scales down to fit while maintaining aspect ratio.

**Right (Green Container)**: Tree is smaller than container, so it displays at its natural size and is centered.

This ensures that:
- Font sizes remain readable and intentional
- Node dimensions stay as designed  
- Trees don't become unnecessarily large in big containers
- Small containers still show the full tree (scaled down)
        `,
      },
    },
  },
};
