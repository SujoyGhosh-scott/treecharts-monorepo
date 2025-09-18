import { Example } from "@/types/examples";

export const trainStationExample: Example = {
  title: "Metro Network Hub",
  description:
    "A metro transit network visualization using all-directional tree layout with travel times on connections, perfect for transportation systems and network diagrams.",
  slug: "train-station",
  tags: ["all-directional", "edge-customization", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/all-directional",
    "/docs/edge-customization",
    "/docs/download-feature",
  ],
  output: "/examples/train-station-network.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "TrainStationExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Train station network - all-direction metro system
const trainStationData = {
  value: "Central Station",
  child: [
    {
      value: "East Junction",
      edgeText: "5 min",
      child: [
        {
          value: "Shopping Mall",
          edgeText: "3 min",
          child: [
            {
              value: "Science Park",
              edgeText: "4 min",
              child: [],
            },
          ],
        },
      ],
    },
    {
      value: "South Terminal",
      edgeText: "4 min",
      nodeConfig: {
        color: "orange",
        fontColor: "white",
        fontSize: 10,
      },
      child: [
        {
          value: "B District",
          edgeText: "3 min",
          nodeConfig: {
            color: "orange",
            fontColor: "white",
            fontSize: 10,
          },
          child: [],
        },
      ],
    },
    {
      value: "West Junction",
      edgeText: "6 min",
      child: [
        {
          value: "Airport Express",
          edgeText: "8 min",
          child: [
            {
              value: "Financial Plaza",
              edgeText: "2 min",
              child: [],
            },
          ],
        },
      ],
    },
    {
      value: "North Terminal",
      edgeText: "3 min",
      nodeConfig: {
        color: "green",
        fontColor: "white",
        fontSize: 10,
      },
      child: [
        {
          value: "University District",
          edgeText: "2 min",
          nodeConfig: {
            color: "green",
            fontColor: "white",
            fontSize: 10,
          },
          child: [],
        },
      ],
    },
  ],
};

export default function TrainStationExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={trainStationData}
        type="all-direction"
        nodeConfig={{
          height: 30,
          color: "blue",
          fontColor: "white",
          fontSize: 10,
        }}
        edgeConfig={{
          color: "blue",
          width: 6,
        }}
        titleConfig={{
          title: "Metro Network Hub",
        }}
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import TrainStationExample from './TrainStationExample';

function App() {
  return (
    <div className="App">
      <TrainStationExample />
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
  <title>Metro Network Hub - TreeCharts</title>
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
          code: `// Train station network - all-direction metro system
const trainStationData = {
  value: "Central Station",
  child: [
    {
      value: "East Junction",
      edgeText: "5 min",
      child: [
        {
          value: "Shopping Mall",
          edgeText: "3 min",
          child: [
            {
              value: "Science Park",
              edgeText: "4 min",
              child: [],
            },
          ],
        },
      ],
    },
    {
      value: "South Terminal",
      edgeText: "4 min",
      nodeConfig: {
        color: "orange",
        fontColor: "white",
        fontSize: 10,
      },
      child: [
        {
          value: "B District",
          edgeText: "3 min",
          nodeConfig: {
            color: "orange",
            fontColor: "white",
            fontSize: 10,
          },
          child: [],
        },
      ],
    },
    {
      value: "West Junction",
      edgeText: "6 min",
      child: [
        {
          value: "Airport Express",
          edgeText: "8 min",
          child: [
            {
              value: "Financial Plaza",
              edgeText: "2 min",
              child: [],
            },
          ],
        },
      ],
    },
    {
      value: "North Terminal",
      edgeText: "3 min",
      nodeConfig: {
        color: "green",
        fontColor: "white",
        fontSize: 10,
      },
      child: [
        {
          value: "University District",
          edgeText: "2 min",
          nodeConfig: {
            color: "green",
            fontColor: "white",
            fontSize: 10,
          },
          child: [],
        },
      ],
    },
  ],
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', function() {
  const chart = new TreeChart("chart-container", {
    type: "all-direction",
    nodeConfig: {
      height: 30,
      color: "blue",
      fontColor: "white",
      fontSize: 10,
    },
    edgeConfig: {
      color: "blue",
      width: 6,
    },
    titleConfig: {
      title: "Metro Network Hub",
    },
  });

  // Render the metro network
  chart.render(trainStationData);
});`,
        },
      ],
    },
  ],
};
