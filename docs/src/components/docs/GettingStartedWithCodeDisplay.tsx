import CodeDisplay from "./CodeDisplay";

const installationExample = {
  title: "Installation Commands",
  description: "Install TreeCharts for your preferred framework",
  id: "installation-commands",
  codes: {
    react: `# Install for React
npm install treecharts-react
# or
yarn add treecharts-react`,

    javascript: `# Install Core Library
npm install treecharts
# or
yarn add treecharts

# CDN Alternative
<script src="https://cdn.jsdelivr.net/npm/treecharts@latest/dist/treecharts.min.js"></script>`,
  },
};

const quickStartExample = {
  title: "Quick Start Example",
  description: "Create your first tree chart with minimal setup",
  id: "quick-start-example",
  codes: {
    javascript: `// Define your tree data structure
const treeData = {
  value: "Root Node",
  child: [
    { value: "Child 1", child: [] },
    { value: "Child 2", child: [] }
  ]
};

// Create the tree chart
const chart = new TreeChart("tree-container", {
  type: "direct",
  nodeConfig: {
    type: "circle",
    color: "#87CEEB"
  }
});

// Render the tree
chart.render(treeData);`,

    react: `import { TreeChart } from 'treecharts-react';

function MyFirstTree() {
  const treeData = {
    value: "Root Node",
    child: [
      { value: "Child 1", child: [] },
      { value: "Child 2", child: [] }
    ]
  };

  return (
    <TreeChart 
      data={treeData}
      type="direct"
      nodeConfig={{
        type: "circle",
        color: "#87CEEB"
      }}
      width={600}
      height={400}
    />
  );
}

export default MyFirstTree;`,
  },
};

export default function GettingStartedWithCodeDisplay() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-macondo">
          Getting Started
        </h1>
        <p className="text-lg text-base-content/70">
          Learn how to install and use TreeCharts in your project
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg mb-8">
          TreeCharts is a powerful, flexible library for creating interactive
          tree visualizations. It supports all major frontend frameworks and
          vanilla JavaScript.
        </p>

        <h2 className="font-macondo">Installation</h2>
        <p className="mb-6">Choose the package that matches your framework:</p>

        <CodeDisplay
          example={installationExample}
          defaultTab="react"
          showOutput={false}
        />

        <h2 className="font-macondo">Quick Start</h2>
        <p className="mb-6">
          Once installed, you can create your first tree chart in just a few
          lines:
        </p>

        <CodeDisplay example={quickStartExample} defaultTab="react" />

        <h2 className="font-macondo">TypeScript Support</h2>
        <p>
          All packages include TypeScript definitions out of the box, providing
          excellent IntelliSense and type safety for your development
          experience.
        </p>

        <h2 className="font-macondo">What's Next?</h2>
        <p>
          Now that you have TreeCharts installed, explore these topics to build
          more advanced visualizations:
        </p>
        <ul>
          <li>
            <a href="/docs/core-concepts/basic-usage" className="text-primary">
              Basic Usage
            </a>{" "}
            - Learn the fundamentals with detailed examples
          </li>
          <li>
            <a href="/docs/tree-options" className="text-primary">
              Tree Options
            </a>{" "}
            - Explore different layouts and connection types
          </li>
          <li>
            <a href="/docs/node-types" className="text-primary">
              Node Types
            </a>{" "}
            - Customize how nodes are displayed
          </li>
          <li>
            <a href="/docs/edges-customization" className="text-primary">
              Edges Customization
            </a>{" "}
            - Style the connections between nodes
          </li>
        </ul>
      </div>
    </div>
  );
}
