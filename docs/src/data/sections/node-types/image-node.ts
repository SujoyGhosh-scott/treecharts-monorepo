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
        javascript: `import { TreeChart } from '@treecharts/core';

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
    
    // Image configuration
    imageConfig: {
      imageWidth: 60,
      imageHeight: 60,
    },
    
    // Text positioning
    imageTextPositionConfig: {
      position: "right",
    },
    
    // Node container styling
    color: "#ffffff",
  },
});

// Render the tree
chart.render(treeData);`,
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

## Default Configuration

Image nodes have specialized defaults optimized for visual content:

| Property | Default Value | Description |
|----------|---------------|-------------|
| \`type\` | \`"image"\` | Node type identifier |
| \`imageConfig.imageWidth\` | \`60\` | Image width in pixels |
| \`imageConfig.imageHeight\` | \`60\` | Image height in pixels |
| \`imageConfig.imageBorderRadius\` | \`4\` | Image corner roundness |
| \`imageConfig.imageBorderWidth\` | \`1\` | Image border thickness |
| \`imageConfig.imageBorderColor\` | \`"#333333"\` | Image border color |
| \`imageConfig.imageOpacity\` | \`1\` | Image transparency |
| \`imageTextPositionConfig.position\` | \`"bottom"\` | Text position relative to image |
| \`imageTextPositionConfig.padding\` | \`8\` | Spacing between image and text |
| \`imageTextPositionConfig.spacing\` | \`4\` | Spacing between title and subtitle |`,
    },
    {
      type: "markdown",
      value: `## Configuration Options

### Image Configuration

Configure the image appearance and dimensions:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageConfig.imageWidth\` | \`number\` | \`60\` | Image width in pixels |
| \`imageConfig.imageHeight\` | \`number\` | \`60\` | Image height in pixels |
| \`imageConfig.imageBorderRadius\` | \`number\` | \`4\` | Corner roundness for images |
| \`imageConfig.imageBorderColor\` | \`string\` | \`"#333333"\` | Border color around image |
| \`imageConfig.imageBorderWidth\` | \`number\` | \`1\` | Border thickness in pixels |
| \`imageConfig.imageOpacity\` | \`number\` | \`1\` | Image transparency (0-1) |
| \`imageConfig.backgroundColor\` | \`string\` | \`"transparent"\` | Background color behind image |

### Text Positioning

Control where text appears relative to the image:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageTextPositionConfig.position\` | \`"bottom" \\| "left" \\| "right"\` | \`"bottom"\` | Text position relative to image |
| \`imageTextPositionConfig.padding\` | \`number\` | \`8\` | Space between image and text |
| \`imageTextPositionConfig.spacing\` | \`number\` | \`4\` | Space between title and subtitle |

### Title Styling

Configure the main title text appearance:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageTitleConfig.fontSize\` | \`number\` | \`12\` | Title text size |
| \`imageTitleConfig.fontColor\` | \`string\` | \`"#000000"\` | Title text color |
| \`imageTitleConfig.fontWeight\` | \`string\` | \`"bold"\` | Title font weight |
| \`imageTitleConfig.alignment\` | \`"left" \\| "center" \\| "right"\` | \`"center"\` | Title text alignment |

### Subtitle Styling

Configure the subtitle text appearance:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageSubtitleConfig.fontSize\` | \`number\` | \`10\` | Subtitle text size |
| \`imageSubtitleConfig.fontColor\` | \`string\` | \`"#666666"\` | Subtitle text color |
| \`imageSubtitleConfig.fontWeight\` | \`string\` | \`"normal"\` | Subtitle font weight |
| \`imageSubtitleConfig.alignment\` | \`"left" \\| "center" \\| "right"\` | \`"center"\` | Subtitle text alignment |

### Node Container

Basic node styling options:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| \`imageMargin\` | \`number\` | \`8\` | Internal margin around all content |
| \`color\` | \`string\` | \`"#ffffff"\` | Background color of node container |
| \`borderColor\` | \`string\` | \`"#e1e8ed"\` | Border color of node container |
| \`borderWidth\` | \`number\` | \`1\` | Border thickness of node container |`,
    },
    {
      type: "markdown",
      value: `## Advanced Configuration

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
      value: `## Text Positioning Options

### Bottom Position (Default)
- **Image**: Top of the node
- **Text**: Below the image
- **Best for**: Profile cards, product displays
- **Layout**: Compact vertical arrangement

### Left Position
- **Image**: Left side of the node
- **Text**: Right side of the image
- **Best for**: Business cards, contact lists
- **Layout**: Horizontal arrangement

### Right Position
- **Image**: Right side of the node
- **Text**: Left side of the image
- **Best for**: Alternative layouts, RTL content
- **Layout**: Horizontal arrangement with image on right

## Layout Considerations

### Automatic Sizing

- **Minimum Dimensions**: 120×60px (MIN_IMAGE_NODE_WIDTH × MIN_IMAGE_NODE_HEIGHT)
- **Dynamic Width**: Calculated based on image size, text width, and position
- **Dynamic Height**: Calculated based on image size, text height, and position
- **Content Alignment**: All content is automatically centered within the node

### Spacing and Margins

- **Image Margin**: 8px default internal margin around all content
- **Text Padding**: 8px default spacing between image and text
- **Text Spacing**: 4px default spacing between title and subtitle
- **Border Radius**: Independent control for image and container corners

### Performance

- **Image Loading**: Images are loaded asynchronously without blocking rendering
- **Text Measurement**: Dynamic text width calculation for optimal layout
- **Memory Efficient**: Only required styling attributes are applied

## Common Use Cases

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
