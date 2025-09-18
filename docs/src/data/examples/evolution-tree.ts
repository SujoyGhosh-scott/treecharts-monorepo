import { Example } from "@/types/examples";

export const evolutionTreeExample: Example = {
  title: "Human Evolution Tree",
  description:
    "An interactive evolutionary tree showing human ancestry with collapsible nodes to explore different branches of human evolution and related species.",
  slug: "evolution-tree",
  tags: ["right-angle", "collapsible-node", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/collapsible-node",
    "/docs/download-feature",
  ],
  output: "/examples/evolution-tree.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "EvolutionTreeExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Human evolution tree data structure
const humanEvolutionData = {
  value: "Common Ancestor",
  description:
    "Shared ancestor of humans and other great apes, lived approximately 6-7 million years ago in Africa",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Australopithecus",
      description:
        "Early hominins who lived 4-2 million years ago, known for bipedalism while retaining ape-like features. Famous example: Lucy (A. afarensis)",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Homo habilis",
          description:
            "First species in genus Homo (2.8-1.5 million years ago), known as 'handy man' for their tool use and larger brain size",
          collapsibleState: { expanded: false },
          child: [
            {
              value: "Homo erectus",
              description:
                "First hominin to leave Africa (1.9 million-300,000 years ago), developed more sophisticated tools and controlled fire",
              collapsibleState: { expanded: false },
              child: [
                {
                  value: "Homo neanderthalensis",
                  description:
                    "Lived in Europe and Asia (400,000-40,000 years ago), had large brains, complex tools, and buried their dead",
                  collapsibleState: { expanded: false },
                  child: [],
                },
                {
                  value: "Homo sapiens",
                  description:
                    "Modern humans that emerged ~300,000 years ago in Africa, developed language, art, and complex societies",
                  collapsibleState: { expanded: false },
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: "Other Great Apes",
      description:
        "Modern great apes that diverged from the human lineage, including chimpanzees, bonobos, gorillas, and orangutans",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Gorillas",
          description:
            "Largest living primates, primarily terrestrial, with complex social structures and demonstrated intelligence",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Orangutans",
          description:
            "Highly intelligent arboreal apes from Southeast Asia, known for tool use and problem-solving abilities",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
  ],
};

export default function EvolutionTreeExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={humanEvolutionData}
        type="right-angle"
        nodeConfig={{
          type: "collapsible-node",
          color: "#f8f9fa",
          fontColor: "#333",
          width: 220,
          borderColor: "#8B4513",
          borderWidth: 2,
          borderRadius: 8,
        }}
        edgeConfig={{
          color: "#8B4513",
          width: 2,
        }}
        titleConfig={{
          title: "Human Evolution Tree",
          description:
            "Click the ▼ buttons to explore our evolutionary journey",
        }}
        width="100%"
        height="600px"
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import EvolutionTreeExample from './EvolutionTreeExample';

function App() {
  return (
    <div className="App">
      <EvolutionTreeExample />
    </div>
  );
}

export default App;`,
        },
      ],
    },
    {
      type: "javascript",
      files: [
        {
          name: "index.html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Human Evolution Tree - TreeCharts</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background-color: #f8fafc;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    #chart-container {
      width: 100%;
      height: 600px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="chart-container"></div>
  </div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script src="script.js"></script>
</body>
</html>`,
        },
        {
          name: "script.js",
          code: `// Human evolution tree data structure
const humanEvolutionData = {
  value: "Common Ancestor",
  description:
    "Shared ancestor of humans and other great apes, lived approximately 6-7 million years ago in Africa",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Australopithecus",
      description:
        "Early hominins who lived 4-2 million years ago, known for bipedalism while retaining ape-like features. Famous example: Lucy (A. afarensis)",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Homo habilis",
          description:
            "First species in genus Homo (2.8-1.5 million years ago), known as 'handy man' for their tool use and larger brain size",
          collapsibleState: { expanded: false },
          child: [
            {
              value: "Homo erectus",
              description:
                "First hominin to leave Africa (1.9 million-300,000 years ago), developed more sophisticated tools and controlled fire",
              collapsibleState: { expanded: false },
              child: [
                {
                  value: "Homo neanderthalensis",
                  description:
                    "Lived in Europe and Asia (400,000-40,000 years ago), had large brains, complex tools, and buried their dead",
                  collapsibleState: { expanded: false },
                  child: [],
                },
                {
                  value: "Homo sapiens",
                  description:
                    "Modern humans that emerged ~300,000 years ago in Africa, developed language, art, and complex societies",
                  collapsibleState: { expanded: false },
                  child: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: "Other Great Apes",
      description:
        "Modern great apes that diverged from the human lineage, including chimpanzees, bonobos, gorillas, and orangutans",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Gorillas",
          description:
            "Largest living primates, primarily terrestrial, with complex social structures and demonstrated intelligence",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Orangutans",
          description:
            "Highly intelligent arboreal apes from Southeast Asia, known for tool use and problem-solving abilities",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
  ],
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  const chart = new TreeChart("chart-container", {
    type: "right-angle",
    nodeConfig: {
      type: "collapsible-node",
      color: "#f8f9fa",
      fontColor: "#333",
      width: 220,
      borderColor: "#8B4513",
      borderWidth: 2,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#8B4513",
      width: 2,
    },
    titleConfig: {
      title: "Human Evolution Tree",
      description:
        "Click the ▼ buttons to explore our evolutionary journey",
    },
  });

  // Render the evolution tree
  chart.render(humanEvolutionData);
});`,
        },
      ],
    },
  ],
};
