"use client";

import { TreeChart } from "treecharts-react";

// Interactive collapsible organization chart data
const orgChartData = {
  value: "Company Overview",
  description:
    "Global technology corporation specializing in software development and innovation",
  child: [
    {
      value: "Engineering",
      description:
        "Software development and R&D teams responsible for building and maintaining our core products",
      child: [
        {
          value: "Frontend",
          description:
            "User interface development using modern frameworks like React and Vue",
          child: [],
        },
        {
          value: "Backend",
          description:
            "Server-side logic, APIs, databases, and cloud infrastructure management",
          child: [],
        },
      ],
    },
  ],
};

export default function InteractiveOrgChart() {
  return (
    <div className="w-full">
      <TreeChart
        data={orgChartData}
        type="right-angle"
        nodeConfig={{
          type: "collapsible-node",
          color: "#4CAF50",
          padding: 12,
          width: 180,
        }}
        titleConfig={{
          title: "Interactive Organization Chart",
          description: "Click the ▼ buttons to expand descriptions",
        }}
        actionConfig={{
          download: {
            enabled: true,
            position: "top-right",
            filename: "interactive-org-chart.svg",
          },
        }}
        width="100%"
        height="500px"
      />
    </div>
  );
}
