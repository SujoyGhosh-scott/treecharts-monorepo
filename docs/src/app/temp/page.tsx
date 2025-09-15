"use client";

import { TreeChart } from "treecharts-react";

export default function TempPage() {
  // Simple tree data structure
  const simpleTreeData = {
    value: "TreeCharts Library",
    child: [
      {
        value: "Core Library",
        child: [
          { value: "TreeChart Engine", child: [] },
          { value: "Node System", child: [] },
          { value: "Edge System", child: [] },
        ],
      },
      {
        value: "React Wrapper",
        child: [
          { value: "TreeChart Component", child: [] },
          { value: "React Integration", child: [] },
        ],
      },
      {
        value: "Future Wrappers",
        child: [
          { value: "Angular", child: [] },
          { value: "Vue.js", child: [] },
          { value: "Svelte", child: [] },
        ],
      },
    ],
  };

  // Organization chart example
  const orgData = {
    value: "CEO",
    child: [
      {
        value: "Engineering",
        child: [
          { value: "Frontend Team", child: [] },
          { value: "Backend Team", child: [] },
          { value: "DevOps Team", child: [] },
        ],
      },
      {
        value: "Marketing",
        child: [
          { value: "Content Team", child: [] },
          { value: "Design Team", child: [] },
        ],
      },
      {
        value: "Sales",
        child: [
          { value: "Enterprise Sales", child: [] },
          { value: "SMB Sales", child: [] },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          TreeCharts Testing Page
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Testing the published treecharts-react library
        </p>

        {/* Basic Tree Chart */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Basic Tree Chart</h2>
          <p className="text-gray-600 mb-6">
            A simple tree chart showing the TreeCharts library structure
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <TreeChart
              data={simpleTreeData}
              type="right-angle"
              nodeConfig={{
                color: "#10B981",
                fontColor: "white",
                width: 140,
                height: 50,
                fontSize: 12,
                borderRadius: 6,
                borderColor: "#047857",
                borderWidth: 2,
              }}
              edgeConfig={{
                color: "#6B7280",
                width: 2,
              }}
              titleConfig={{
                title: "TreeCharts Library Structure",
                description: "Overview of the library components",
              }}
              width="100%"
              height="400px"
            />
          </div>
        </section>

        {/* Organization Chart */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Organization Chart</h2>
          <p className="text-gray-600 mb-6">
            An example organization chart with different styling
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <TreeChart
              data={orgData}
              type="curved"
              nodeConfig={{
                color: "#3B82F6",
                fontColor: "white",
                width: 120,
                height: 45,
                fontSize: 11,
                borderRadius: 8,
                borderColor: "#1D4ED8",
                borderWidth: 1,
              }}
              edgeConfig={{
                color: "#94A3B8",
                width: 2,
              }}
              titleConfig={{
                title: "Company Organization",
                description: "Team structure and hierarchy",
              }}
              width="100%"
              height="350px"
            />
          </div>
        </section>

        {/* Different Connection Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Different Connection Types
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Direct Connection */}
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">Direct Connection</h3>
              <TreeChart
                data={{
                  value: "Root",
                  child: [
                    { value: "Child 1", child: [] },
                    { value: "Child 2", child: [] },
                  ],
                }}
                type="direct"
                nodeConfig={{
                  color: "#F59E0B",
                  fontColor: "white",
                  width: 100,
                  height: 40,
                  fontSize: 11,
                  borderRadius: 4,
                }}
                edgeConfig={{
                  color: "#D97706",
                  width: 2,
                }}
                width="100%"
                height="200px"
              />
            </div>

            {/* All Direction */}
            <div className="bg-white rounded-lg shadow-lg p-6 border">
              <h3 className="text-lg font-semibold mb-4">All Direction</h3>
              <TreeChart
                data={{
                  value: "Center",
                  child: [
                    { value: "Branch 1", child: [] },
                    { value: "Branch 2", child: [] },
                  ],
                }}
                type="all-direction"
                nodeConfig={{
                  color: "#EF4444",
                  fontColor: "white",
                  width: 100,
                  height: 40,
                  fontSize: 11,
                  borderRadius: 4,
                }}
                edgeConfig={{
                  color: "#DC2626",
                  width: 2,
                }}
                width="100%"
                height="200px"
              />
            </div>
          </div>
        </section>

        {/* Circle Nodes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Circle Nodes</h2>
          <p className="text-gray-600 mb-6">
            Testing different node shapes - circular nodes
          </p>
          <div className="bg-white rounded-lg shadow-lg p-6 border">
            <TreeChart
              data={{
                value: "Root",
                child: [
                  {
                    value: "Child 1",
                    child: [
                      { value: "Grandchild 1", child: [] },
                      { value: "Grandchild 2", child: [] },
                    ],
                  },
                  { value: "Child 2", child: [] },
                  { value: "Child 3", child: [] },
                ],
              }}
              type="right-angle"
              nodeConfig={{
                type: "circle",
                color: "#8B5CF6",
                fontColor: "white",
                width: 80,
                height: 80,
                fontSize: 10,
                borderColor: "#7C3AED",
                borderWidth: 2,
              }}
              edgeConfig={{
                color: "#A78BFA",
                width: 2,
              }}
              titleConfig={{
                title: "Circle Node Example",
                description: "Using circular nodes for a softer appearance",
              }}
              width="100%"
              height="350px"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
