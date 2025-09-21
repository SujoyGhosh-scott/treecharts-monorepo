import { DocTopic } from "@/types/docs";

export const imageNodeTopic: DocTopic = {
  id: "image-node",
  title: "Image Node",
  description: "Visual nodes with images, titles, and subtitles",
  path: "/docs/node-types/image-node",
  content: [
    {
      type: "markdown",
      value: `# Image Node

Image nodes combine visual elements with text content to create rich, engaging tree visualizations. These nodes display images alongside titles and subtitles, making them perfect for organizational charts with photos, product hierarchies, family trees, or any visualization where visual representation enhances understanding.

Image nodes support flexible text positioning and comprehensive styling options for both image and text elements.`,
    },
    {
      type: "code",
      title: "Image Node Example",
      description:
        "Create visual nodes with profile images, names, and roles for enhanced tree presentations",
      id: "image-node-example",
      outputImage: "/docs/node/other/image-node-example.svg",
      codes: {
        react: `import { TreeChart } from 'treecharts-react';

// Tree data with image nodes
const treeData = {
  value: "Leadership",
  imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  title: "CEO",
  subtitle: "Chief Executive",
  child: [
    {
      value: "Engineering Lead",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      title: "Sarah Chen",
      subtitle: "VP Engineering",
      child: [],
    },
    {
      value: "Product Lead",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      title: "Emma Thompson",
      subtitle: "VP Product",
      child: [],
    },
    {
      value: "Marketing Lead",
      imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      title: "Lisa Johnson",
      subtitle: "VP Marketing",
      child: [],
    },
  ],
};

function ImageNodeTree() {
  return (
    <TreeChart
      data={treeData}
      type="right-angle"
      horizontalGap={140}
      verticalGap={120}
      nodeConfig={{
        type: "image",
        imageConfig: {
          imageWidth: 60,
          imageHeight: 60,
        },
        imageTextPositionConfig: {
          position: "right",
        },
        color: "#ffffff",
      }}
      width={800}
      height={400}
    />
  );
}

export default ImageNodeTree;`,
        javascript: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TreeCharts Image Node Example</title>
</head>
<body>
  <!-- Container for the tree chart -->
  <div id="container-id" style="width: 800px; height: 400px; margin: 20px auto;"></div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script>
    // Tree data with image nodes
    const treeData = {
      value: "Leadership",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      title: "CEO",
      subtitle: "Chief Executive",
      child: [
        {
          value: "Engineering Lead",
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
          title: "Sarah Chen",
          subtitle: "VP Engineering",
          child: [],
        },
        {
          value: "Product Lead",
          imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
          title: "Emma Thompson",
          subtitle: "VP Product",
          child: [],
        },
        {
          value: "Marketing Lead",
          imageUrl: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
          title: "Lisa Johnson",
          subtitle: "VP Marketing",
          child: [],
        },
      ],
    };

    // Create chart with image nodes
    const chart = new TreeChart("container-id", {
      type: "right-angle",
      horizontalGap: 140,
      verticalGap: 120,
      nodeConfig: {
        type: "image",
        imageConfig: {
          imageWidth: 60,
          imageHeight: 60,
        },
        imageTextPositionConfig: {
          position: "right",
        },
        color: "#ffffff",
      },
    });

    // Render the tree
    chart.render(treeData);
  </script>
</body>
</html>`,
      },
    },
    {
      type: "markdown",
      value: `## Features

- **Visual Impact** - Include images for better recognition and engagement
- **Flexible Text Positioning** - Position text below, left, or right of images
- **Rich Styling Options** - Control image borders, opacity, and layout
- **Dynamic Sizing** - Nodes automatically resize based on content and text position
- **Professional Layouts** - Perfect alignment and spacing for polished presentations

## Data Structure

Image nodes require specific properties for images and text content:

\`\`\`javascript
const nodeData = {
  value: "Node Value",           // Fallback text (optional)
  imageUrl: "path/to/image.jpg", // Image source URL (required)
  title: "Primary Text",         // Main text content (optional)
  subtitle: "Secondary Text",    // Additional text content (optional)
  child: [...]                  // Child nodes
};
\`\`\`

## Configuration Options

Image nodes have specialized configuration organized into logical groups:

### Image Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`type\` | \`string\` | \`"image"\` | Must be set to enable image functionality |
| \`imageConfig.imageWidth\` | \`number\` | \`60\` | Image width in pixels |
| \`imageConfig.imageHeight\` | \`number\` | \`60\` | Image height in pixels |
| \`imageConfig.imageBorderRadius\` | \`number\` | \`4\` | Image corner roundness |
| \`imageConfig.imageBorderColor\` | \`string\` | \`"#333333"\` | Image border color |
| \`imageConfig.imageBorderWidth\` | \`number\` | \`1\` | Image border thickness |
| \`imageConfig.imageOpacity\` | \`number\` | \`1\` | Image transparency (0-1) |
| \`imageConfig.backgroundColor\` | \`string\` | \`"transparent"\` | Background color behind image |

### Text Positioning

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageTextPositionConfig.position\` | \`"bottom" \\| "left" \\| "right"\` | \`"bottom"\` | Text position relative to image |
| \`imageTextPositionConfig.padding\` | \`number\` | \`8\` | Space between image and text |
| \`imageTextPositionConfig.spacing\` | \`number\` | \`4\` | Space between title and subtitle |

### Title Styling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageTitleConfig.fontSize\` | \`number\` | \`12\` | Title text size |
| \`imageTitleConfig.fontColor\` | \`string\` | \`"#000000"\` | Title text color |
| \`imageTitleConfig.fontWeight\` | \`string\` | \`"bold"\` | Title font weight |
| \`imageTitleConfig.alignment\` | \`"left" \\| "center" \\| "right"\` | \`"center"\` | Title text alignment |

### Subtitle Styling

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageSubtitleConfig.fontSize\` | \`number\` | \`10\` | Subtitle text size |
| \`imageSubtitleConfig.fontColor\` | \`string\` | \`"#666666"\` | Subtitle text color |
| \`imageSubtitleConfig.fontWeight\` | \`string\` | \`"normal"\` | Subtitle font weight |
| \`imageSubtitleConfig.alignment\` | \`"left" \\| "center" \\| "right"\` | \`"center"\` | Subtitle text alignment |

### Node Container

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageMargin\` | \`number\` | \`8\` | Internal margin around all content |
| \`color\` | \`string\` | \`"#ffffff"\` | Background color of node container |
| \`borderColor\` | \`string\` | \`"#e1e8ed"\` | Border color of node container |
| \`borderWidth\` | \`number\` | \`1\` | Border thickness of node container |

### Advanced Configuration Example

\`\`\`javascript
const chart = new TreeChart("container", {
  type: "right-angle",
  horizontalGap: 150,
  verticalGap: 120,
  nodeConfig: {
    type: "image",
    
    // Image styling
    imageConfig: {
      imageWidth: 80,
      imageHeight: 80,
      imageBorderRadius: 12,
      imageBorderColor: "#2c3e50",
      imageBorderWidth: 2,
      imageOpacity: 1,
      backgroundColor: "#f8f9fa"
    },
    
    // Text positioning
    imageTextPositionConfig: {
      position: "bottom",
      padding: 12,
      spacing: 6
    },
    
    // Title styling
    imageTitleConfig: {
      fontSize: 14,
      fontColor: "#2c3e50",
      fontWeight: "bold",
      alignment: "center"
    },
    
    // Subtitle styling
    imageSubtitleConfig: {
      fontSize: 11,
      fontColor: "#7f8c8d",
      fontWeight: "normal",
      alignment: "center"
    },
    
    // Node container
    color: "#ffffff",
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 8,
    imageMargin: 12
  }
});
\`\`\``,
    },
    {
      type: "markdown",
      value: `## Common Use Cases

### Organizational Charts
Team hierarchies with employee photos, names, and job titles.

### Family Trees
Genealogy charts with family member photos and relationships.

### Product Catalogs
Product hierarchies with images, names, and specifications.

### Contact Management
Directory structures with profile pictures and contact information.

### Project Teams
Team structures with member photos, roles, and responsibilities.`,
    },
  ],
};
