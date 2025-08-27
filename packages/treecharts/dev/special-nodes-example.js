import { TreeChart } from "../src/index.js";

// Simple tree for Node with Description
const descriptionTree = {
  value: "Company",
  description: "Technology startup with innovative solutions",
  child: [
    {
      value: "Engineering",
      description: "Software development and technical teams",
      child: [],
    },
    {
      value: "Marketing",
      description: "Brand promotion and customer acquisition",
      child: [],
    },
    {
      value: "Sales",
      description: "Revenue generation and client relations",
      child: [],
    },
  ],
};

// Simple tree for Collapsible Nodes
const collapsibleTree = {
  value: "Organization",
  description: "Modern technology company with distributed teams",
  nodeConfig: { type: "collapsible-node" },
  child: [
    {
      value: "Development",
      description: "Software development and product creation teams",
      child: [],
    },
    {
      value: "Operations",
      description: "Infrastructure management and DevOps initiatives",
      child: [],
    },
    {
      value: "Business",
      description: "Strategic partnerships and business growth",
      collapsibleState: { expanded: true },
      child: [],
    },
  ],
};

// Simple tree for Image Nodes
const imageTree = {
  value: "Leadership",
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  title: "CEO",
  subtitle: "Chief Executive",
  child: [
    {
      value: "Engineering Lead",
      imageUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      title: "Sarah Chen",
      subtitle: "VP Engineering",
      child: [],
    },
    {
      value: "Product Lead",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      title: "Emma Thompson",
      subtitle: "VP Product",
      child: [],
    },
    {
      value: "Marketing Lead",
      imageUrl:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
      title: "Lisa Johnson",
      subtitle: "VP Marketing",
      child: [],
    },
  ],
};

// Node with Description Chart
const descriptionChart = new TreeChart("description-container", {
  type: "right-angle",
  nodeConfig: {
    type: "node-with-description",
    color: "#e8f4fd",
    width: 180,
    padding: 10,
  },
  edgeConfig: {
    color: "#7f8c8d",
    width: 1.5,
  },
  titleConfig: {
    title: "Node with Description Example",
    description: "Each node shows a title with additional descriptive text",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "node-with-description-example.svg",
    },
  },
});

// Collapsible Node Chart
const collapsibleChart = new TreeChart("collapsible-container", {
  type: "right-angle",
  nodeConfig: {
    type: "collapsible-node",
    width: 200,
    color: "#e8f4fd",
  },
  titleConfig: {
    title: "Collapsible Node Example",
    description: "Click the ▼ buttons to expand and view detailed descriptions",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "collapsible-node-example.svg",
    },
  },
});

// Image Node Chart
const imageChart = new TreeChart("image-container", {
  type: "right-angle",
  horizontalGap: 140,
  verticalGap: 120,
  nodeConfig: {
    type: "image",

    // Image configuration
    imageConfig: {
      imageWidth: 60,
      imageHeight: 60,
    },

    // Text positioning
    imageTextPositionConfig: {
      position: "right",
    },

    // Node container styling
    color: "#ffffff",
    // borderColor: "#e1e8ed",
  },
  titleConfig: {
    title: "Image Node Example",
    description: "Visual nodes with profile images, names, and roles",
  },
  actionConfig: {
    download: {
      enabled: true,
      position: "top-right",
      filename: "image-node-example.svg",
    },
  },
});

// Render all charts
try {
  descriptionChart.render(descriptionTree);
  collapsibleChart.render(collapsibleTree);
  imageChart.render(imageTree);

  console.log("All special node type charts initialized successfully!");
} catch (error) {
  console.error("Error initializing special node charts:", error);
}
