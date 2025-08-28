import { DocSection } from "@/types/docs";

export const downloadFeatureSection: DocSection = {
  id: "download-feature",
  title: "Download Feature",
  description:
    "Export your tree visualizations as SVG files with customizable download options",
  topics: [],
  content: [
    {
      type: "markdown",
      value: `TreeCharts includes a built-in download feature that allows users to export tree visualizations as high-quality SVG files. This feature is configurable through the \`actionConfig\` property and provides options for button positioning and custom filenames.

The download feature adds a download button to your tree chart that, when clicked, downloads the current visualization as an SVG file. SVG format ensures scalable quality, small file sizes, editability in vector graphics software, and web compatibility.`,
    },
    {
      type: "code",
      title: "Download Feature Example",
      description:
        "Basic implementation of the download feature with different configurations",
      outputImage: "/docs/download-feature-example.png",
      id: "download-feature-demo",
      codes: {
        javascript: `import { TreeChart } from "treecharts";

// Simple tree data for download demonstration
const downloadDemoTree = {
  value: "Root",
  child: [
    {
      value: "Child A",
      child: [
        {
          value: "A1",
          child: [],
        },
      ],
    },
    {
      value: "Child B",
      child: [
        {
          value: "B1",
          child: [],
        },
      ],
    },
  ],
};

// Chart with download button
const chart = new TreeChart("container", {
  type: "curved",
  
  nodeConfig: {
    color: "#fff3cd",
    borderColor: "#ffcc02",
    borderWidth: 2,
  },
  
  titleConfig: {
    title: "Chart with download button",
    description: "Top left download button",
  },
  
  // Enable download feature
  actionConfig: {
    download: {
      enabled: true,
      position: "top-left",
      filename: "curved-tree.svg",
    },
  },
});

chart.render(downloadDemoTree);`,
      },
    },
    {
      type: "markdown",
      value: `## Configuration Options

### Download Properties

| Property | Type | Default | Description | Options |
|----------|------|---------|-------------|---------|
| \`enabled\` | boolean | \`false\` | Enable/disable the download feature | \`true\`, \`false\` |
| \`position\` | string | \`"top-right"\` | Download button position | \`"top-left"\`, \`"top-right"\`, \`"bottom-left"\`, \`"bottom-right"\` |
| \`filename\` | string | \`"treechart.svg"\` | Downloaded file name | Any valid filename ending in \`.svg\` |`,
    },
  ],
};
