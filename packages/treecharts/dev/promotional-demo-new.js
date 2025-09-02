import { TreeChart } from "../src/index";

// Chart 1: Even/Odd Flowchart - Algorithm Decision Tree
const flowchartData = {
  value: "Start",
  nodeConfig: {
    type: "rectangle",
    borderRadius: 25,
  },
  child: [
    {
      value: "Input N",
      nodeConfig: {
        type: "rectangle",
        borderRadius: 15,
      },
      child: [
        {
          value: "N % 2 = 0?",
          child: [
            {
              value: "Even",
              nodeConfig: {
                type: "rectangle",
                borderRadius: 0,
              },
              child: [],
            },
            {
              value: "Odd",
              nodeConfig: {
                type: "rectangle",
                borderRadius: 0,
              },
              child: [],
            },
          ],
        },
      ],
    },
  ],
};

const flowchartChart = new TreeChart("flowchart-chart", {
  type: "direct",
  nodeConfig: {
    type: "diamond",
    width: 70,
    height: 35,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 10,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
    showArrows: true,
    arrowSize: 3,
    arrowColor: "#ffffff",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "even-odd-flowchart.svg",
    },
  },
});

// Chart 2: Corporate Groups with Image Nodes - Tech Companies
const corporateData = {
  value: "Tech Group",
  nodeConfig: {
    type: "image",
    imageUrl: "https://picsum.photos/60/40?random=1",
  },
  child: [
    {
      value: "AI",
      nodeConfig: {
        type: "image",
        imageUrl: "https://picsum.photos/50/30?random=2",
      },
      child: [],
    },
    {
      value: "Cloud",
      nodeConfig: {
        type: "image",
        imageUrl: "https://picsum.photos/50/30?random=3",
      },
      child: [],
    },
  ],
};

const corporateChart = new TreeChart("corporate-chart", {
  type: "right-angle",
  nodeConfig: {
    type: "image",
    width: 100,
    height: 70,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    imageTitleConfig: {
      fontSize: 10,
      fontColor: "#ffffff",
    },
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "corporate-groups-image-nodes.svg",
    },
  },
});

// Chart 3: Interactive Team Structure with Collapsible Nodes
const collapsibleData = {
  value: "CEO",
  description: "Chief Executive Officer - Strategic leadership and vision",
  collapsibleState: { expanded: true },
  nodeConfig: { type: "collapsible-node" },
  child: [
    {
      value: "CTO",
      description: "Chief Technology Officer - Technical strategy",
      collapsibleState: { expanded: false },
      nodeConfig: { type: "collapsible-node" },
      child: [],
    },
    {
      value: "CFO",
      description: "Chief Financial Officer - Financial planning",
      collapsibleState: { expanded: false },
      nodeConfig: { type: "collapsible-node" },
      child: [],
    },
  ],
};

const collapsibleChart = new TreeChart("collapsible-chart", {
  type: "right-angle",
  nodeConfig: {
    type: "collapsible-node",
    width: 80,
    height: 40,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 10,
    fontColor: "#ffffff",
    padding: 8,
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "interactive-collapsible-team.svg",
    },
  },
});

// Chart 4: All-Direction Mind Map - Creative Thinking
const mindmapData = {
  value: "Ideas",
  child: [
    { value: "Tech", child: [] },
    { value: "Art", child: [] },
    { value: "Music", child: [] },
    { value: "Sports", child: [] },
    { value: "Food", child: [] },
    { value: "Travel", child: [] },
  ],
};

const mindmapChart = new TreeChart("mindmap-chart", {
  type: "all-direction",
  nodeConfig: {
    type: "circle",
    width: 60,
    height: 60,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 10,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "all-direction-mindmap.svg",
    },
  },
});

// Chart 5: Node with Description - Product Features
const descriptionData = {
  value: "Features",
  description: "Core product capabilities and benefits",
  nodeConfig: { type: "node-with-description" },
  child: [
    {
      value: "Security",
      description: "Advanced encryption and data protection",
      nodeConfig: { type: "node-with-description" },
      child: [],
    },
    {
      value: "Speed",
      description: "Lightning-fast performance optimization",
      nodeConfig: { type: "node-with-description" },
      child: [],
    },
  ],
};

const descriptionChart = new TreeChart("description-chart", {
  type: "direct",
  nodeConfig: {
    type: "node-with-description",
    width: 140,
    height: 65,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
    descriptionFontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "node-with-description.svg",
    },
  },
});

// Chart 6: Gaming Achievement Tree
const gamingData = {
  value: "Hero",
  child: [
    {
      value: "Warrior",
      child: [{ value: "Tank", child: [] }],
    },
    {
      value: "Mage",
      child: [{ value: "Healer", child: [] }],
    },
  ],
};

const gamingChart = new TreeChart("gaming-chart", {
  type: "curved",
  nodeConfig: {
    type: "star",
    width: 60,
    height: 30,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
    curveRadius: 15,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "gaming-achievement-tree.svg",
    },
  },
});

// Chart 7: File System Structure
const filesystemData = {
  value: "Root",
  child: [
    {
      value: "src",
      child: [{ value: "index.js", child: [] }],
    },
    {
      value: "docs",
      child: [{ value: "README.md", child: [] }],
    },
  ],
};

const filesystemChart = new TreeChart("filesystem-chart", {
  type: "right-angle",
  nodeConfig: {
    type: "octagon",
    width: 70,
    height: 30,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "file-system-structure.svg",
    },
  },
});

// Chart 8: Social Network Flow - Viral Spread
const socialData = {
  value: "Post",
  child: [
    {
      value: "Share",
      child: [
        { value: "Like", child: [] },
        { value: "Comment", child: [] },
      ],
    },
  ],
};

const socialChart = new TreeChart("social-chart", {
  type: "curved",
  nodeConfig: {
    type: "circle",
    width: 60,
    height: 60,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
    curveRadius: 25,
    showArrows: true,
    arrowSize: 8,
    arrowColor: "#ffffff",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "social-network-flow.svg",
    },
  },
});

// Chart 9: Sports Tournament Bracket
const tournamentData = {
  value: "Champion",
  child: [
    {
      value: "Finals",
      child: [
        {
          value: "Semi A",
          child: [
            { value: "Team 1", child: [] },
            { value: "Team 2", child: [] },
          ],
        },
        {
          value: "Semi B",
          child: [{ value: "Team 3", child: [] }],
        },
      ],
    },
  ],
};

const tournamentChart = new TreeChart("tournament-chart", {
  type: "direct",
  horizontalAlign: "top-to-bottom",
  nodeConfig: {
    type: "rectangle",
    width: 60,
    height: 30,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
    borderRadius: 5,
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
    showArrows: true,
    arrowSize: 2,
    arrowColor: "#ffffff",
    arrowDirection: "source-to-target",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "sports-tournament-bracket.svg",
    },
  },
});

// Chart 10: Recipe Steps
const recipeData = {
  value: "Pasta",
  child: [
    {
      value: "Boil",
      child: [{ value: "Add Salt", child: [] }],
    },
    {
      value: "Sauce",
      child: [{ value: "Heat Oil", child: [] }],
    },
  ],
};

const recipeChart = new TreeChart("recipe-chart", {
  type: "right-angle",
  nodeConfig: {
    type: "hexagon",
    width: 70,
    height: 30,
    color: "#000000",
    borderColor: "#ffffff",
    borderWidth: 2,
    fontSize: 9,
    fontColor: "#ffffff",
  },
  edgeConfig: {
    color: "#ffffff",
    width: 2,
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "recipe-cooking-steps.svg",
    },
  },
});

// Render all charts
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    flowchartChart.render(flowchartData);
    corporateChart.render(corporateData);
    collapsibleChart.render(collapsibleData);
    mindmapChart.render(mindmapData);
    descriptionChart.render(descriptionData);
    gamingChart.render(gamingData);
    filesystemChart.render(filesystemData);
    socialChart.render(socialData);
    tournamentChart.render(tournamentData);
    recipeChart.render(recipeData);
  }, 100);
});
