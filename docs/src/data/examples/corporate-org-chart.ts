import { Example } from "@/types/examples";

export const rightAngleExample: Example = {
  title: "Corporate Organizational Chart",
  description:
    "A professional organizational chart using right-angle connections, perfect for displaying corporate hierarchies with clean, structured layouts.",
  slug: "corporate-org-chart",
  tags: ["organizational-chart", "corporate", "right-angle", "professional"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/regular-nodes",
  ],
  output: "/docs/core-concepts-example.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "OrgChart.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Corporate organizational data
const orgData = {
  value: "CEO",
  child: [
    {
      value: "CTO",
      child: [
        { 
          value: "Frontend Lead", 
          child: [
            { value: "Senior Dev", child: [] },
            { value: "Junior Dev", child: [] }
          ]
        },
        { 
          value: "Backend Lead", 
          child: [
            { value: "DevOps Engineer", child: [] },
            { value: "API Developer", child: [] }
          ]
        }
      ]
    },
    {
      value: "CFO",
      child: [
        { value: "Accountant", child: [] },
        { value: "Financial Analyst", child: [] }
      ]
    },
    {
      value: "CMO",
      child: [
        { value: "Marketing Manager", child: [] },
        { value: "Content Creator", child: [] }
      ]
    }
  ]
};

export default function CorporateOrgChart() {
  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <TreeChart
        data={orgData}
        type="right-angle"
        nodeConfig={{
          color: "#2563eb",
          textColor: "#ffffff",
          borderColor: "#1e40af",
          borderWidth: 2,
          fontSize: 14,
          padding: { x: 16, y: 8 }
        }}
        edgeConfig={{
          color: "#64748b",
          width: 2
        }}
        width={900}
        height={600}
        direction="top-to-bottom"
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import CorporateOrgChart from './OrgChart';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center py-6">Corporate Organizational Chart</h1>
      <CorporateOrgChart />
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
  <title>Corporate Organizational Chart - TreeCharts</title>
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
    h1 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 30px;
    }
    #chart-container {
      width: 900px;
      height: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Corporate Organizational Chart</h1>
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
          code: `// Corporate organizational data
const orgData = {
  value: "CEO",
  child: [
    {
      value: "CTO",
      child: [
        { 
          value: "Frontend Lead", 
          child: [
            { value: "Senior Dev", child: [] },
            { value: "Junior Dev", child: [] }
          ]
        },
        { 
          value: "Backend Lead", 
          child: [
            { value: "DevOps Engineer", child: [] },
            { value: "API Developer", child: [] }
          ]
        }
      ]
    },
    {
      value: "CFO",
      child: [
        { value: "Accountant", child: [] },
        { value: "Financial Analyst", child: [] }
      ]
    },
    {
      value: "CMO",
      child: [
        { value: "Marketing Manager", child: [] },
        { value: "Content Creator", child: [] }
      ]
    }
  ]
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  const chart = new TreeChart("chart-container", {
    type: "right-angle",
    nodeConfig: {
      color: "#2563eb",
      textColor: "#ffffff",
      borderColor: "#1e40af",
      borderWidth: 2,
      fontSize: 14,
      padding: { x: 16, y: 8 }
    },
    edgeConfig: {
      color: "#64748b",
      width: 2
    },
    direction: "top-to-bottom"
  });

  // Render the organizational chart
  chart.render(orgData);
});`,
        },
      ],
    },
  ],
};
