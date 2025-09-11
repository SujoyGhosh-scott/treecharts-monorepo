import { TreeChart } from "../src/index";

// Same tree data for both charts
const sampleTree = {
  value: "Global Technology Company Global Technology Company",
  description: "Global technology corporation",
  collapsibleState: { expanded: true },
  child: [
    {
      value: "Engineering Department",
      description: "Software development teams",
      collapsibleState: { expanded: false },
      child: [
        {
          value: "Frontend Development Team",
          description: "UI development",
          collapsibleState: { expanded: false },
          child: [],
        },
        {
          value: "Backend Infrastructure Team",
          description: "Server infrastructure",
          collapsibleState: { expanded: false },
          child: [],
        },
      ],
    },
    {
      value: "Marketing and Sales Division",
      description: "Brand promotion",
      collapsibleState: { expanded: false },
      child: [],
    },
  ],
};

// Create charts
const nodeDescChart = new TreeChart("node-desc-container", {
  type: "right-angle",
  nodeConfig: {
    type: "node-with-description",
    width: 180,
  },
});

const collapsibleChart = new TreeChart("collapsible-container", {
  type: "right-angle",
  nodeConfig: {
    type: "collapsible-node",
    width: 180,
  },
});

// Render on load
nodeDescChart.render(sampleTree);
collapsibleChart.render(sampleTree);
