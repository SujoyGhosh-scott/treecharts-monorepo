import { Example } from "@/types/examples";

export const universityCourseExample: Example = {
  title: "University Course Structure",
  description:
    "An academic curriculum visualization using image nodes to display course progression from foundation to specialization tracks with instructor photos and course details.",
  slug: "university-course",
  tags: ["right-angle", "image-node", "download-feature"],
  versionUsed: "1.0.0",
  relatedDocs: [
    "/docs/tree-options/right-angle",
    "/docs/node-types/image-node",
    "/docs/download-feature",
  ],
  output: "/examples/university-course-structure.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "UniversityCourseExample.tsx",
          code: `import React from 'react';
import { TreeChart } from 'treecharts-react';

// University course structure data
const universityCourseData = {
  value: "Computer Science Degree",
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  title: "Computer Science Degree",
  subtitle: "4-year program structure",
  child: [
    {
      value: "Foundation Courses",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop&crop=face",
      title: "Foundation Courses",
      subtitle: "Year 1-2 Prerequisites",
      edgeText: "Core",
      child: [
        {
          value: "Programming I",
          imageUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
          title: "Programming I",
          subtitle: "CS 101 • Python basics",
          edgeText: "Prerequisite",
          child: [],
        },
        {
          value: "Mathematics",
          imageUrl:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=80&h=80&fit=crop&crop=face",
          title: "Mathematics",
          subtitle: "Calculus & Statistics",
          edgeText: "Foundation",
          child: [],
        },
      ],
    },
    {
      value: "Specialization Tracks",
      imageUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=80&h=80&fit=crop&crop=face",
      title: "Specialization Tracks",
      subtitle: "Year 3-4 Focus Areas",
      edgeText: "Advanced",
      child: [
        {
          value: "AI/Machine Learning",
          imageUrl:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop&crop=face",
          title: "AI/Machine Learning",
          subtitle: "Artificial Intelligence track",
          edgeText: "Elective",
          child: [],
        },
        {
          value: "Software Engineering",
          imageUrl:
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=80&h=80&fit=crop&crop=face",
          title: "Software Engineering",
          subtitle: "Enterprise development",
          edgeText: "Elective",
          child: [],
        },
      ],
    },
  ],
};

export default function UniversityCourseExample() {
  return (
    <div className="w-full">
      <TreeChart
        data={universityCourseData}
        type="right-angle"
        verticalAlign="center"
        horizontalGap={100}
        verticalGap={70}
        nodeConfig={{
          type: "image",
          width: 120,
          height: 80,
          color: "#F0F4FF",
          borderColor: "#E1E9FF",
          borderWidth: 1,
          borderRadius: 8,
          imageConfig: {
            imageWidth: 40,
            imageHeight: 40,
          },
          imageTextPositionConfig: {
            position: "right",
            padding: 8,
            spacing: 2,
          },
        }}
        edgeConfig={{
          color: "gray",
        }}
        titleConfig={{
          title: "Computer Science Curriculum",
          description: "Academic pathway from prerequisites to specializations",
        }}
      />
    </div>
  );
}`,
        },
        {
          name: "App.tsx",
          code: `import React from 'react';
import UniversityCourseExample from './UniversityCourseExample';

function App() {
  return (
    <div className="App">
      <UniversityCourseExample />
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
  <title>University Course Structure - TreeCharts</title>
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
          code: `// University course structure data
const universityCourseData = {
  value: "Computer Science Degree",
  imageUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  title: "Computer Science Degree",
  subtitle: "4-year program structure",
  child: [
    {
      value: "Foundation Courses",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&h=80&fit=crop&crop=face",
      title: "Foundation Courses",
      subtitle: "Year 1-2 Prerequisites",
      edgeText: "Core",
      child: [
        {
          value: "Programming I",
          imageUrl:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
          title: "Programming I",
          subtitle: "CS 101 • Python basics",
          edgeText: "Prerequisite",
          child: [],
        },
        {
          value: "Mathematics",
          imageUrl:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=80&h=80&fit=crop&crop=face",
          title: "Mathematics",
          subtitle: "Calculus & Statistics",
          edgeText: "Foundation",
          child: [],
        },
      ],
    },
    {
      value: "Specialization Tracks",
      imageUrl:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=80&h=80&fit=crop&crop=face",
      title: "Specialization Tracks",
      subtitle: "Year 3-4 Focus Areas",
      edgeText: "Advanced",
      child: [
        {
          value: "AI/Machine Learning",
          imageUrl:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=80&h=80&fit=crop&crop=face",
          title: "AI/Machine Learning",
          subtitle: "Artificial Intelligence track",
          edgeText: "Elective",
          child: [],
        },
        {
          value: "Software Engineering",
          imageUrl:
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=80&h=80&fit=crop&crop=face",
          title: "Software Engineering",
          subtitle: "Enterprise development",
          edgeText: "Elective",
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
    verticalAlign: "center",
    horizontalGap: 100,
    verticalGap: 70,
    nodeConfig: {
      type: "image",
      width: 120,
      height: 80,
      color: "#F0F4FF",
      borderColor: "#E1E9FF",
      borderWidth: 1,
      borderRadius: 8,
      imageConfig: {
        imageWidth: 40,
        imageHeight: 40,
      },
      imageTextPositionConfig: {
        position: "right",
        padding: 8,
        spacing: 2,
      },
    },
    edgeConfig: {
      color: "gray",
    },
    titleConfig: {
      title: "Computer Science Curriculum",
      description: "Academic pathway from prerequisites to specializations",
    },
  });

  // Render the course structure
  chart.render(universityCourseData);
});`,
        },
      ],
    },
  ],
};
