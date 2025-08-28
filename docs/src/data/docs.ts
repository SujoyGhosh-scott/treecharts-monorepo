import { Navigation } from "@/types/docs";
import { gettingStartedSection } from "./sections/getting-started";
import { coreConceptsSection } from "./sections/core-concepts";
import { treeOptionsSection } from "./sections/tree-options";
import { nodeTypesSection } from "./sections/node-types";
import { edgeCustomizationSection } from "./sections/edge-customization";
import { downloadFeatureSection } from "./sections/download-feature";

export const docsNavigation: Navigation = {
  sections: [
    gettingStartedSection,
    coreConceptsSection,
    treeOptionsSection,
    nodeTypesSection,
    edgeCustomizationSection,
    downloadFeatureSection,
  ],
};
