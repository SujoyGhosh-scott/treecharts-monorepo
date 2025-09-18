import { Example } from "@/types/examples";

export const familyTreeExample: Example = {
  title: "Family Tree Visualization",
  description:
    "A genealogical family tree using nodes with descriptions to display family relationships across multiple generations with detailed information.",
  slug: "family-tree",
  tags: ["right-angle", "node-with-description", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/node-with-description",
    "/docs/download-feature",
  ],
  output: "/examples/simple-family-tree.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "FamilyTreeExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Simple family tree data structure
const familyTreeData = {
  value: "Robert Johnson",
  description: "Born: 1945",
  child: [
    {
      value: "Michael Johnson",
      description: "Born: 1970 | Software Engineer",
      child: [
        {
          value: "Emma Johnson",
          description: "Born: 2000 | Student",
          child: [],
        },
        {
          value: "James Johnson",
          description: "Born: 2003 | High School",
          child: [],
        },
      ],
    },
    {
      value: "Sarah Johnson-Smith",
      description: "Born: 1972 | Doctor",
      child: [
        {
          value: "Oliver Smith",
          description: "Born: 1998 | College Graduate",
          child: [],
        },
        {
          value: "Sophia Smith",
          description: "Born: 2001 | University Student",
          child: [],
        },
      ],
    },
    {
      value: "David Johnson",
      description: "Born: 1975 | Teacher",
      child: [
        {
          value: "Lucas Johnson",
          description: "Born: 2005 | Middle School",
          child: [],
        },
      ],
    },
  ],
};

export default function FamilyTreeExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={familyTreeData}
        type="right-angle"
        nodeConfig={{
          type: "node-with-description",
          color: "#f8f9fa",
          fontColor: "#333",
          width: 140,
          height: 70,
        }}
        edgeConfig={{
          color: "#8B4513",
          width: 2,
        }}
        titleConfig={{
          title: "Johnson Family Tree",
          description: "Three generations of the Johnson family",
        }}
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import FamilyTreeExample from './FamilyTreeExample';

function App() {
  return (
    <div className="App">
      <FamilyTreeExample />
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
  <title>Family Tree Visualization - TreeCharts</title>
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
      height: 500px;
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
          code: `// Simple family tree data structure
const familyTreeData = {
  value: "Robert Johnson",
  description: "Born: 1945",
  child: [
    {
      value: "Michael Johnson",
      description: "Born: 1970 | Software Engineer",
      child: [
        {
          value: "Emma Johnson",
          description: "Born: 2000 | Student",
          child: [],
        },
        {
          value: "James Johnson",
          description: "Born: 2003 | High School",
          child: [],
        },
      ],
    },
    {
      value: "Sarah Johnson-Smith",
      description: "Born: 1972 | Doctor",
      child: [
        {
          value: "Oliver Smith",
          description: "Born: 1998 | College Graduate",
          child: [],
        },
        {
          value: "Sophia Smith",
          description: "Born: 2001 | University Student",
          child: [],
        },
      ],
    },
    {
      value: "David Johnson",
      description: "Born: 1975 | Teacher",
      child: [
        {
          value: "Lucas Johnson",
          description: "Born: 2005 | Middle School",
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
      type: "node-with-description",
      color: "#f8f9fa",
      fontColor: "#333",
      width: 140,
      height: 70,
    },
    edgeConfig: {
      color: "#8B4513",
      width: 2,
    },
    titleConfig: {
      title: "Johnson Family Tree",
      description: "Three generations of the Johnson family",
    },
  });

  // Render the family tree
  chart.render(familyTreeData);
});`,
        },
      ],
    },
  ],
};
