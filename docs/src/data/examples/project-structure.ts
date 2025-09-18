import { Example } from "@/types/examples";

export const projectStructureExample: Example = {
  title: "Project Structure Visualization",
  description:
    "A visual representation of a React project's folder structure using custom-shaped nodes with file and folder icons, perfect for documenting project architecture.",
  slug: "project-structure",
  tags: ["right-angle", "custom-shape", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/custom-shape",
    "/docs/download-feature",
  ],
  output: "/examples/project-structure-tree.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "ProjectStructureExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Simple project folder structure
const projectStructureData = {
  value: "react-app",
  nodeConfig: {
    type: "custom" as const,
    customAttributes: {
      d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
    },
  },
  child: [
    {
      value: "public",
      nodeConfig: {
        type: "custom" as const,
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "index.html",
          nodeConfig: {
            type: "custom" as const,
            color: "#E34F26",
            borderColor: "#C1341A",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "src",
      nodeConfig: {
        type: "custom" as const,
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "components",
          nodeConfig: {
            type: "custom" as const,
            customAttributes: {
              d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
            },
          },
          child: [
            {
              value: "Header.jsx",
              nodeConfig: {
                type: "custom" as const,
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
            {
              value: "Button.jsx",
              nodeConfig: {
                type: "custom" as const,
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
          ],
        },
        {
          value: "pages",
          nodeConfig: {
            type: "custom" as const,
            customAttributes: {
              d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
            },
          },
          child: [
            {
              value: "Home.jsx",
              nodeConfig: {
                type: "custom" as const,
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
            {
              value: "About.jsx",
              nodeConfig: {
                type: "custom" as const,
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
          ],
        },
        {
          value: "App.jsx",
          nodeConfig: {
            type: "custom" as const,
            color: "#61DAFB",
            borderColor: "#21A5C4",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "package.json",
      nodeConfig: {
        type: "custom" as const,
        color: "#68A063",
        borderColor: "#5A8B56",
        customAttributes: {
          d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
        },
      },
      child: [],
    },
  ],
};

export default function ProjectStructureExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={projectStructureData}
        type="right-angle"
        verticalAlign="left"
        horizontalGap={120}
        verticalGap={60}
        nodeConfig={{
          type: "custom",
          width: 80,
          height: 60,
          color: "#3B82F6",
          fontColor: "white",
          borderColor: "#1E40AF",
          borderWidth: 2,
          fontSize: 11,
        }}
        edgeConfig={{
          color: "#6B7280",
          width: 2,
        }}
        titleConfig={{
          title: "React Project Structure",
          description: "Modern web application folder hierarchy",
        }}
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import ProjectStructureExample from './ProjectStructureExample';

function App() {
  return (
    <div className="App">
      <ProjectStructureExample />
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
  <title>Project Structure Visualization - TreeCharts</title>
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
          code: `// Simple project folder structure
const projectStructureData = {
  value: "react-app",
  nodeConfig: {
    type: "custom",
    customAttributes: {
      d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
    },
  },
  child: [
    {
      value: "public",
      nodeConfig: {
        type: "custom",
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "index.html",
          nodeConfig: {
            type: "custom",
            color: "#E34F26",
            borderColor: "#C1341A",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "src",
      nodeConfig: {
        type: "custom",
        customAttributes: {
          d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
        },
      },
      child: [
        {
          value: "components",
          nodeConfig: {
            type: "custom",
            customAttributes: {
              d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
            },
          },
          child: [
            {
              value: "Header.jsx",
              nodeConfig: {
                type: "custom",
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
            {
              value: "Button.jsx",
              nodeConfig: {
                type: "custom",
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
          ],
        },
        {
          value: "pages",
          nodeConfig: {
            type: "custom",
            customAttributes: {
              d: "M 10,15 L 10,50 L 70,50 L 70,25 L 60,15 L 10,15 Z M 10,15 L 50,15 L 60,25 L 10,25 Z",
            },
          },
          child: [
            {
              value: "Home.jsx",
              nodeConfig: {
                type: "custom",
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
            {
              value: "About.jsx",
              nodeConfig: {
                type: "custom",
                color: "#61DAFB",
                borderColor: "#21A5C4",
                customAttributes: {
                  d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
                },
              },
              child: [],
            },
          ],
        },
        {
          value: "App.jsx",
          nodeConfig: {
            type: "custom",
            color: "#61DAFB",
            borderColor: "#21A5C4",
            customAttributes: {
              d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
            },
          },
          child: [],
        },
      ],
    },
    {
      value: "package.json",
      nodeConfig: {
        type: "custom",
        color: "#68A063",
        borderColor: "#5A8B56",
        customAttributes: {
          d: "M 15,10 L 15,50 L 65,50 L 65,20 L 55,10 L 15,10 Z M 55,10 L 55,20 L 65,20",
        },
      },
      child: [],
    },
  ],
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  const chart = new TreeChart("chart-container", {
    type: "right-angle",
    verticalAlign: "left",
    horizontalGap: 120,
    verticalGap: 60,
    nodeConfig: {
      type: "custom",
      width: 80,
      height: 60,
      color: "#3B82F6",
      fontColor: "white",
      borderColor: "#1E40AF",
      borderWidth: 2,
      fontSize: 11,
    },
    edgeConfig: {
      color: "#6B7280",
      width: 2,
    },
    titleConfig: {
      title: "React Project Structure",
      description: "Modern web application folder hierarchy",
    },
  });

  // Render the project structure
  chart.render(projectStructureData);
});`,
        },
      ],
    },
  ],
};
