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
  topics: [
    regularNodesTopic,
    nodeWithDescriptionTopic,
    collapsibleNodeTopic,
    imageNodeTopic,
    customShapeTopic,
  ],
};
