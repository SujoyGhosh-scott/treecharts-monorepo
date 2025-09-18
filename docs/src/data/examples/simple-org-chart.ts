import { Example } from "@/types/examples";

export const simpleOrgChartExample: Example = {
  title: "Simple Organizational Chart",
  description:
    "A clean and straightforward organizational chart using right-angle connections with green styling, perfect for small to medium companies.",
  slug: "simple-org-chart",
  tags: ["right-angle", "regular-nodes", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/regular-nodes",
    "/docs/download-feature",
  ],
  output: "/examples/simple-org-chart.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "SimpleOrgChart.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Organization chart data structure
const organizationData = {
  value: "CEO",
  child: [
    {
      value: "Engineering",
      child: [
        {
          value: "Developers Team",
          child: [
            { value: "Frontend Team", child: [] },
            { value: "Backend Team", child: [] },
          ],
        },
        { value: "DevOps Team", child: [] },
      ],
    },
    {
      value: "Marketing",
      child: [
        { value: "Content Team", child: [] },
        { value: "Design Team", child: [] },
      ],
    },
    {
      value: "Sales",
      child: [
        { value: "Enterprise Sales", child: [] },
        { value: "SMB Sales", child: [] },
      ],
    },
  ],
};

export default function SimpleOrgChart() {
  return (
    <div className="w-full">
      <TreeChart
        data={organizationData}
        type="right-angle"
        nodeConfig={{
          color: "#4CAF50",
          fontColor: "white",
          width: 140,
          height: 50,
          fontSize: 12,
          borderRadius: 8,
        }}
        edgeConfig={{
          color: "#333",
          width: 2,
        }}
        titleConfig={{
          title: "Company Organization Chart",
          description: "Hierarchical view of company structure",
          position: {
            horizontal: "center",
            vertical: "top",
          },
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import SimpleOrgChart from './SimpleOrgChart';

function App() {
  return (
    <div className="App">
      <SimpleOrgChart />
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
  <title>Simple Organizational Chart - TreeCharts</title>
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
      height: 400px;
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
          code: `// Organization chart data structure
const organizationData = {
  value: "CEO",
  child: [
    {
      value: "Engineering",
      child: [
        {
          value: "Developers Team",
          child: [
            { value: "Frontend Team", child: [] },
            { value: "Backend Team", child: [] },
          ],
        },
        { value: "DevOps Team", child: [] },
      ],
    },
    {
      value: "Marketing",
      child: [
        { value: "Content Team", child: [] },
        { value: "Design Team", child: [] },
      ],
    },
    {
      value: "Sales",
      child: [
        { value: "Enterprise Sales", child: [] },
        { value: "SMB Sales", child: [] },
      ],
    },
  ],
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  const chart = new TreeChart("chart-container", {
    type: "right-angle",
    nodeConfig: {
      color: "#4CAF50",
      fontColor: "white",
      width: 140,
      height: 50,
      fontSize: 12,
      borderRadius: 8,
    },
    edgeConfig: {
      color: "#333",
      width: 2,
    },
    titleConfig: {
      title: "Company Organization Chart",
      description: "Hierarchical view of company structure",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
  });

  // Render the organizational chart
  chart.render(organizationData);
});`,
        },
      ],
    },
  ],
};
