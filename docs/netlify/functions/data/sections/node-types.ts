import { DocSection } from "@/types/docs";
import { regularNodesTopic } from "./node-types/regular-nodes";
import { nodeWithDescriptionTopic } from "./node-types/node-with-description";
import { collapsibleNodeTopic } from "./node-types/collapsible-node";
import { imageNodeTopic } from "./node-types/image-node";
import { customShapeTopic } from "./node-types/custom-shape";

export const nodeTypesSection: DocSection = {
  id: "node-types",
  title: "Node Types",
  description: "Different node styles and configurations",
  content: [
    {
      type: "markdown",
      value: `
TreeCharts supports a variety of node styles to fit different visualization needs. In this section, you'll learn about regular nodes, custom shapes, nodes with descriptions, collapsible nodes, and image nodes. Each type offers unique customization options for displaying your data.`,
    },
  ],
  topics: [
    regularNodesTopic,
    nodeWithDescriptionTopic,
    collapsibleNodeTopic,
    imageNodeTopic,
    customShapeTopic,
  ],
};
