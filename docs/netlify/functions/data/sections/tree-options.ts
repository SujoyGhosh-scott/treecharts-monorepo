import { DocSection } from "@/types/docs";
import { directConnectionTopic } from "./tree-options/direct";
import { rightAngleTopic } from "./tree-options/right-angle";
import { curvedTopic } from "./tree-options/curved";
import { allDirectionalTopic } from "./tree-options/all-directional";

export const treeOptionsSection: DocSection = {
  id: "tree-options",
  title: "Tree Options",
  description: "Different tree layout and connection types",
  content: [
    {
      type: "markdown",
      value: `
TreeCharts offers four distinct connection types to suit different visualization needs. Each renderer creates a unique visual style and is optimized for specific use cases. Each renderer supports the same core configuration options while providing its own unique visual characteristics.`,
    },
  ],
  topics: [
    directConnectionTopic,
    rightAngleTopic,
    curvedTopic,
    allDirectionalTopic,
  ],
};
