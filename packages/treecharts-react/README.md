# TreeCharts React

A React wrapper for the TreeCharts visualization library, providing a declarative component interface for creating interactive tree diagrams.

## Installation

```bash
npm install treecharts-react
# or
yarn add treecharts-react
```

## Quick Start

```tsx
import React from "react";
import { TreeChart } from "treecharts-react";

const treeData = {
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

function MyComponent() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      nodeConfig={{
        color: "#4CAF50",
        fontColor: "white",
        width: 120,
        height: 50,
      }}
      edgeConfig={{
        color: "#666",
        width: 2,
      }}
      width="100%"
      height="400px"
    />
  );
}
```

## Features

### 🎨 **Multiple Visualization Types**

- **Direct**: Straight-line connections
- **Right Angle**: L-shaped organizational chart style
- **Curved**: Smooth, flowing connections
- **All Direction**: Radial/circular layout

### 📊 **Rich Node Types**

- **Regular Shapes**: Rectangle, circle, diamond, hexagon, triangle, star
- **Node with Description**: Enhanced nodes with detailed text
- **Collapsible Nodes**: Interactive expand/collapse functionality
- **Image Nodes**: Nodes with images, perfect for org charts

### 🔗 **Advanced Edge Customization**

- Colors, widths, and line styles
- Directional arrows
- Edge labels and text
- Dashed and dotted lines
- Curved connection radius control

### 🎯 **Professional Features**

- Chart titles and descriptions
- Download functionality (SVG export)
- Flexible alignment options
- Responsive sizing
- TypeScript support

## Component Props

### Core Props

| Prop        | Type                                                       | Description                    |
| ----------- | ---------------------------------------------------------- | ------------------------------ |
| `data`      | `TreeNode`                                                 | Tree data structure (required) |
| `type`      | `'direct' \| 'right-angle' \| 'curved' \| 'all-direction'` | Visualization type             |
| `className` | `string`                                                   | CSS class for container        |
| `style`     | `React.CSSProperties`                                      | Inline styles for container    |
| `width`     | `number \| string`                                         | Container width                |
| `height`    | `number \| string`                                         | Container height               |

### Configuration Props

| Prop              | Type                                 | Description                      |
| ----------------- | ------------------------------------ | -------------------------------- |
| `nodeConfig`      | `NodeConfig`                         | Node styling and behavior        |
| `edgeConfig`      | `EdgeConfig`                         | Edge/connection styling          |
| `titleConfig`     | `TitleConfig`                        | Chart title configuration        |
| `actionConfig`    | `ActionConfig`                       | Action buttons (download, etc.)  |
| `horizontalGap`   | `number`                             | Space between nodes horizontally |
| `verticalGap`     | `number`                             | Space between tree levels        |
| `verticalAlign`   | `'left' \| 'center' \| 'right'`      | Node alignment within levels     |
| `horizontalAlign` | `'top-to-bottom' \| 'bottom-to-top'` | Tree flow direction              |

### Event Props

| Prop       | Type                           | Description                   |
| ---------- | ------------------------------ | ----------------------------- |
| `onRender` | `(svg: SVGSVGElement) => void` | Called when chart is rendered |
| `onUpdate` | `(svg: SVGSVGElement) => void` | Called when chart is updated  |

## Data Structure

```typescript
interface TreeNode {
  value: string; // Display text
  child: TreeNode[]; // Child nodes
  description?: string; // For node-with-description type
  edgeText?: string; // Text on connecting edge
  nodeConfig?: Partial<NodeConfig>; // Node-specific styling

  // For collapsible nodes
  collapsibleState?: {
    expanded: boolean;
  };

  // For image nodes
  imageUrl?: string;
  title?: string;
  subtitle?: string;
}
```

## Examples

### Organizational Chart with Images

```tsx
const orgData = {
  value: "CEO",
  imageUrl: "https://example.com/ceo.jpg",
  title: "John Smith",
  subtitle: "Chief Executive Officer",
  child: [
    {
      value: "CTO",
      imageUrl: "https://example.com/cto.jpg",
      title: "Sarah Johnson",
      subtitle: "Chief Technology Officer",
      child: [],
    },
  ],
};

<TreeChart
  data={orgData}
  type="right-angle"
  nodeConfig={{
    type: "image",
    width: 140,
    height: 160,
    imageConfig: {
      imageWidth: 80,
      imageHeight: 80,
      imageBorderRadius: 40,
    },
  }}
/>;
```

### Interactive Collapsible Chart

```tsx
const projectData = {
  value: "Project Plan",
  description: "Complete project timeline with phases",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Phase 1",
      description: "Planning and research phase with detailed requirements",
      collapsibleState: { expanded: false },
      child: [],
    },
  ],
};

<TreeChart
  data={projectData}
  type="curved"
  nodeConfig={{
    type: "collapsible-node",
    width: 200,
    padding: 15,
  }}
/>;
```

### Decision Tree with Edge Labels

```tsx
const decisionData = {
  value: "Start Process",
  child: [
    {
      value: "Evaluate Condition",
      child: [
        {
          value: "Option A",
          edgeText: "Yes",
          child: [],
        },
        {
          value: "Option B",
          edgeText: "No",
          child: [],
        },
      ],
    },
  ],
};

<TreeChart
  data={decisionData}
  type="direct"
  nodeConfig={{
    type: "diamond",
    color: "#FF9800",
    fontColor: "white",
  }}
  edgeConfig={{
    showArrows: true,
    arrowDirection: "source-to-target",
    textColor: "#333",
    textBackgroundColor: "white",
  }}
/>;
```

### Professional Chart with Title and Download

```tsx
<TreeChart
  data={treeData}
  type="right-angle"
  titleConfig={{
    title: "Technology Stack Overview",
    description: "Current architecture and tool choices",
    position: {
      horizontal: "center",
      vertical: "top",
    },
  }}
  actionConfig={{
    download: {
      enabled: true,
      position: "top-right",
      filename: "tech-stack-chart",
    },
  }}
  nodeConfig={{
    color: "#2196F3",
    fontColor: "white",
    borderRadius: 8,
  }}
/>
```

## Advanced Usage

### Using Refs for Programmatic Control

```tsx
import { useRef } from "react";
import { TreeChart, TreeChartRef } from "treecharts-react";

function MyComponent() {
  const chartRef = useRef<TreeChartRef>(null);

  const handleUpdateData = (newData: TreeNode) => {
    chartRef.current?.update(newData);
  };

  const handleChangeType = () => {
    chartRef.current?.setType("curved");
  };

  const handleDownload = () => {
    const svg = chartRef.current?.getSvg();
    if (svg) {
      // Custom download logic
    }
  };

  return <TreeChart ref={chartRef} data={treeData} type="right-angle" />;
}
```

### Custom Styling with CSS Classes

```tsx
// Apply custom styles via className
<TreeChart
  data={treeData}
  className="my-custom-chart"
  style={{
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
  }}
/>
```

```css
.my-custom-chart {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Node Types Reference

### Regular Shapes

- `rectangle` (default) - Standard rectangular nodes
- `circle` - Circular nodes
- `diamond` - Diamond-shaped for decisions
- `hexagon` - Six-sided nodes
- `triangle` - Triangular nodes
- `pentagon` - Five-sided nodes
- `octagon` - Eight-sided nodes
- `star` - Star-shaped nodes

### Special Types

- `node-with-description` - Nodes with additional descriptive text
- `collapsible-node` - Interactive expand/collapse functionality
- `image` - Nodes with images, titles, and subtitles

## Connection Types

- **Direct**: Straight lines between nodes
- **Right Angle**: L-shaped connections (classic org chart)
- **Curved**: Smooth curved connections
- **All Direction**: Radial layout around center

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import {
  TreeChart,
  TreeChartProps,
  TreeChartRef,
  TreeNode,
  NodeConfig,
  EdgeConfig,
  TitleConfig,
  ActionConfig,
} from "treecharts-react";
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build the package
npm run build

# Watch mode for development
npm run dev
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT © [Sujoy Ghosh](https://github.com/SujoyGhosh-scott)

## Contributing

Contributions are welcome! Please read our contributing guide and submit pull requests to the main repository.

## Related Packages

- [`treecharts`](../treecharts) - Core TreeCharts library
- More framework wrappers coming soon (Vue, Angular, Svelte)
