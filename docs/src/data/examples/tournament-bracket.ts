import { Example } from "@/types/examples";

export const tournamentBracketExample: Example = {
  title: "Tournament Bracket Visualization",
  description:
    "A sports tournament bracket showing semi-finals and final matches with scores, using nodes with descriptions and edge text to display match results.",
  slug: "tournament-bracket",
  tags: ["right-angle", "node-with-description", "edge-customization"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/node-with-description",
    "/docs/edge-customization",
  ],
  output: "/examples/tournament-bracket.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "TournamentBracketExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// Tournament bracket data structure
const tournamentBracketData = {
  value: "Final",
  description: "Brazil vs France",
  nodeConfig: {
    type: "node-with-description" as const,
    color: "#FFD700",
    fontColor: "#333",
    borderColor: "#FFA500",
    borderWidth: 2,
    width: 120,
  },
  child: [
    {
      value: "Semi-Final 1",
      description: "Brazil vs Germany",
      edgeText: "Brazil Wins 2-1",
      nodeConfig: {
        type: "node-with-description" as const,
        color: "#4CAF50",
        fontColor: "white",
        borderColor: "#2E7D32",
        borderWidth: 2,
        width: 130,
      },
      child: [
        {
          value: "Brazil",
          description: "Advances",
          edgeText: "2-1",
          nodeConfig: {
            type: "node-with-description" as const,
            color: "#4CAF50",
            fontColor: "white",
            borderColor: "#2E7D32",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
        {
          value: "Germany",
          description: "Eliminated",
          edgeText: "1-2",
          nodeConfig: {
            type: "node-with-description" as const,
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
      ],
    },
    {
      value: "Semi-Final 2",
      description: "France vs Spain",
      edgeText: "France Wins 3-1",
      nodeConfig: {
        type: "node-with-description" as const,
        color: "#9E9E9E",
        fontColor: "white",
        borderColor: "#616161",
        borderWidth: 2,
        width: 130,
      },
      child: [
        {
          value: "France",
          description: "Advances",
          edgeText: "3-1",
          nodeConfig: {
            type: "node-with-description" as const,
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
        {
          value: "Spain",
          description: "Eliminated",
          edgeText: "1-3",
          nodeConfig: {
            type: "node-with-description" as const,
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
      ],
    },
  ],
};

export default function TournamentBracketExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={tournamentBracketData}
        type="right-angle"
        edgeConfig={{
          color: "#666",
          width: 2,
          textColor: "#333",
        }}
        titleConfig={{
          title: "Tournament Semi-Finals & Final",
          description: "4-team tournament bracket with semi-finals and final",
        }}
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import TournamentBracketExample from './TournamentBracketExample';

function App() {
  return (
    <div className="App">
      <TournamentBracketExample />
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
  <title>Tournament Bracket Visualization - TreeCharts</title>
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
          code: `// Tournament bracket data structure
const tournamentBracketData = {
  value: "Final",
  description: "Brazil vs France",
  nodeConfig: {
    type: "node-with-description",
    color: "#FFD700",
    fontColor: "#333",
    borderColor: "#FFA500",
    borderWidth: 2,
    width: 120,
  },
  child: [
    {
      value: "Semi-Final 1",
      description: "Brazil vs Germany",
      edgeText: "Brazil Wins 2-1",
      nodeConfig: {
        type: "node-with-description",
        color: "#4CAF50",
        fontColor: "white",
        borderColor: "#2E7D32",
        borderWidth: 2,
        width: 130,
      },
      child: [
        {
          value: "Brazil",
          description: "Advances",
          edgeText: "2-1",
          nodeConfig: {
            type: "node-with-description",
            color: "#4CAF50",
            fontColor: "white",
            borderColor: "#2E7D32",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
        {
          value: "Germany",
          description: "Eliminated",
          edgeText: "1-2",
          nodeConfig: {
            type: "node-with-description",
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
      ],
    },
    {
      value: "Semi-Final 2",
      description: "France vs Spain",
      edgeText: "France Wins 3-1",
      nodeConfig: {
        type: "node-with-description",
        color: "#9E9E9E",
        fontColor: "white",
        borderColor: "#616161",
        borderWidth: 2,
        width: 130,
      },
      child: [
        {
          value: "France",
          description: "Advances",
          edgeText: "3-1",
          nodeConfig: {
            type: "node-with-description",
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
          },
          child: [],
        },
        {
          value: "Spain",
          description: "Eliminated",
          edgeText: "1-3",
          nodeConfig: {
            type: "node-with-description",
            color: "#9E9E9E",
            fontColor: "white",
            borderColor: "#616161",
            borderWidth: 2,
            width: 100,
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
    type: "right-angle",
    edgeConfig: {
      color: "#666",
      width: 2,
      textColor: "#333",
    },
    titleConfig: {
      title: "Tournament Semi-Finals & Final",
      description: "4-team tournament bracket with semi-finals and final",
    },
  });

  // Render the tournament bracket
  chart.render(tournamentBracketData);
});`,
        },
      ],
    },
  ],
};
