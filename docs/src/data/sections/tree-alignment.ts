import { DocSection } from "@/types/docs";

export const treeAlignmentSection: DocSection = {
  id: "tree-alignment",
  title: "Tree Alignment",
  description:
    "Control the positioning and flow direction of your tree layouts",
  topics: [],
  content: [
    {
      type: "markdown",
      value: `TreeCharts provides powerful alignment options to control both the horizontal positioning of nodes within each level and the vertical flow direction of your entire tree structure.

## Alignment Options

TreeCharts offers two alignment properties that work together to control your tree layout:

| Property | Values | Default | Description |
|----------|--------|---------|-------------|
| \`verticalAlign\` | \`left\`, \`center\`, \`right\` | \`center\` | Controls horizontal positioning of nodes within each level |
| \`horizontalAlign\` | \`top-to-bottom\`, \`bottom-to-top\` | \`top-to-bottom\` | Controls vertical flow direction of the tree |

**Note:** The property names might seem counterintuitive - \`verticalAlign\` controls horizontal positioning because it aligns nodes along the vertical axis, and \`horizontalAlign\` controls vertical flow direction.`,
    },
    {
      type: "code",
      title: "Alignment Examples",
      description: "Examples demonstrating different alignment combinations",
      outputImage: "/docs/alignment-examples.svg",
      codes: {
        javascript: `const chart = new TreeChart("alignment-container", {
  type: "direct",
  verticalAlign: "right",
  horizontalAlign: "bottom-to-top",
});

const sampleData = {
  value: "Root",
  child: [
    {
      value: "A",
      child: [
        { value: "A1", child: [] },
        { value: "A2", child: [] },
      ],
    },
    {
      value: "B",
      child: [{ value: "B1", child: [] }],
    },
    {
      value: "C",
      child: [],
    },
  ],
};

chart.render(sampleData);`,
      },
    },
  ],
};
