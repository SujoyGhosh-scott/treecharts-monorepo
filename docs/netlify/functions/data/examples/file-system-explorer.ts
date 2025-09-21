import { Example } from "@/types/examples";

export const fileSystemExample: Example = {
  title: "Interactive File System Explorer",
  description:
    "A dynamic file system visualization using curved connections, showcasing collapsible nodes and custom styling for different file types.",
  slug: "file-system-explorer",
  tags: ["core-concepts", "collapsible-node", "curved"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/curved",
    "/docs/node-types/collapsible-node",
  ],
  output: "/docs/getting-started-example.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "FileSystemExplorer.tsx",
          code: `import React, { useState } from 'react';
import { TreeChart } from 'treecharts-react';

// File system data structure
const fileSystemData = {
  value: "📁 root",
  collapsed: false,
  child: [
    {
      value: "📁 src",
      collapsed: false,
      child: [
        {
          value: "📁 components",
          collapsed: false,
          child: [
            { value: "📄 Header.tsx", child: [] },
            { value: "📄 Footer.tsx", child: [] },
            { value: "📄 Sidebar.tsx", child: [] }
          ]
        },
        {
          value: "📁 utils",
          collapsed: false,
          child: [
            { value: "📄 helpers.ts", child: [] },
            { value: "📄 constants.ts", child: [] }
          ]
        },
        { value: "📄 App.tsx", child: [] },
        { value: "📄 index.tsx", child: [] }
      ]
    },
    {
      value: "📁 public",
      collapsed: false,
      child: [
        { value: "📄 index.html", child: [] },
        { value: "🖼️ favicon.ico", child: [] },
        { value: "📄 manifest.json", child: [] }
      ]
    },
    {
      value: "📁 docs",
      collapsed: true,
      child: [
        { value: "📄 README.md", child: [] },
        { value: "📄 CHANGELOG.md", child: [] }
      ]
    },
    { value: "📄 package.json", child: [] },
    { value: "📄 tsconfig.json", child: [] }
  ]
};

export default function FileSystemExplorer() {
  const [treeData, setTreeData] = useState(fileSystemData);

  const handleNodeClick = (node: any) => {
    if (node.child && node.child.length > 0) {
      // Toggle collapsed state
      const newData = JSON.parse(JSON.stringify(treeData));
      toggleNodeCollapsed(newData, node.value);
      setTreeData(newData);
    }
  };

  const toggleNodeCollapsed = (data: any, targetValue: string) => {
    if (data.value === targetValue) {
      data.collapsed = !data.collapsed;
      return true;
    }
    if (data.child) {
      for (let child of data.child) {
        if (toggleNodeCollapsed(child, targetValue)) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">File System Explorer</h2>
        <TreeChart
          data={treeData}
          type="curved"
          nodeConfig={{
            color: "#f8fafc",
            textColor: "#1e293b",
            borderColor: "#e2e8f0",
            borderWidth: 1,
            fontSize: 13,
            padding: { x: 12, y: 6 }
          }}
          edgeConfig={{
            color: "#94a3b8",
            width: 1.5
          }}
          width={800}
          height={500}
          direction="left-to-right"
          onNodeClick={handleNodeClick}
        />
        <p className="text-sm text-gray-600 mt-4 text-center">
          Click on folder nodes to expand/collapse them
        </p>
      </div>
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import FileSystemExplorer from './FileSystemExplorer';

function App() {
  return (
    <div className="App">
      <FileSystemExplorer />
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
  <title>File System Explorer - TreeCharts</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      padding: 30px;
      max-width: 900px;
    }
    h1 {
      text-align: center;
      color: #1e293b;
      margin-bottom: 20px;
      font-size: 2rem;
    }
    #chart-container {
      width: 800px;
      height: 500px;
      margin: 0 auto;
    }
    .instructions {
      text-align: center;
      color: #64748b;
      font-size: 14px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>File System Explorer</h1>
    <div id="chart-container"></div>
    <p class="instructions">Click on folder nodes to expand/collapse them</p>
  </div>

  <!-- Include TreeCharts library from CDN -->
  <script src="https://unpkg.com/treecharts@latest/dist/index.global.js"></script>
  
  <script src="script.js"></script>
</body>
</html>`,
        },
        {
          name: "script.js",
          code: `// File system data structure
let fileSystemData = {
  value: "📁 root",
  collapsed: false,
  child: [
    {
      value: "📁 src",
      collapsed: false,
      child: [
        {
          value: "📁 components",
          collapsed: false,
          child: [
            { value: "📄 Header.tsx", child: [] },
            { value: "📄 Footer.tsx", child: [] },
            { value: "📄 Sidebar.tsx", child: [] }
          ]
        },
        {
          value: "📁 utils",
          collapsed: false,
          child: [
            { value: "📄 helpers.ts", child: [] },
            { value: "📄 constants.ts", child: [] }
          ]
        },
        { value: "📄 App.tsx", child: [] },
        { value: "📄 index.tsx", child: [] }
      ]
    },
    {
      value: "📁 public",
      collapsed: false,
      child: [
        { value: "📄 index.html", child: [] },
        { value: "🖼️ favicon.ico", child: [] },
        { value: "📄 manifest.json", child: [] }
      ]
    },
    {
      value: "📁 docs",
      collapsed: true,
      child: [
        { value: "📄 README.md", child: [] },
        { value: "📄 CHANGELOG.md", child: [] }
      ]
    },
    { value: "📄 package.json", child: [] },
    { value: "📄 tsconfig.json", child: [] }
  ]
};

let chart;

function toggleNodeCollapsed(data, targetValue) {
  if (data.value === targetValue) {
    data.collapsed = !data.collapsed;
    return true;
  }
  if (data.child) {
    for (let child of data.child) {
      if (toggleNodeCollapsed(child, targetValue)) {
        return true;
      }
    }
  }
  return false;
}

function handleNodeClick(node) {
  if (node.child && node.child.length > 0) {
    // Toggle collapsed state
    const newData = JSON.parse(JSON.stringify(fileSystemData));
    toggleNodeCollapsed(newData, node.value);
    fileSystemData = newData;
    
    // Re-render the chart
    chart.render(fileSystemData);
  }
}

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  chart = new TreeChart("chart-container", {
    type: "curved",
    nodeConfig: {
      color: "#f8fafc",
      textColor: "#1e293b",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      fontSize: 13,
      padding: { x: 12, y: 6 }
    },
    edgeConfig: {
      color: "#94a3b8",
      width: 1.5
    },
    direction: "left-to-right",
    onNodeClick: handleNodeClick
  });

  // Render the file system
  chart.render(fileSystemData);
});`,
        },
      ],
    },
  ],
};
