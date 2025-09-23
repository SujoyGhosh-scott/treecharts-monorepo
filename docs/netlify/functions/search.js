const fs = require("fs");
const path = require("path");

// Embedded data - generated from TypeScript files
const SEARCH_DATA = {
  "examples": [
    {
      "title": "Simple Organizational Chart",
      "description": "A clean and straightforward organizational chart using right-angle connections with green styling, perfect for small to medium companies.",
      "slug": "simple-org-chart",
      "tags": [
        "right-angle",
        "regular-nodes"
      ]
    },
    {
      "title": "Family Tree Visualization",
      "description": "A genealogical family tree using nodes with descriptions to display family relationships across multiple generations with detailed information.",
      "slug": "family-tree",
      "tags": [
        "right-angle",
        "node-with-description"
      ]
    },
    {
      "title": "Human Evolution Tree",
      "description": "An interactive evolutionary tree showing human ancestry with collapsible nodes to explore different branches of human evolution and related species.",
      "slug": "evolution-tree",
      "tags": [
        "right-angle",
        "collapsible-node"
      ]
    },
    {
      "title": "Project Structure Visualization",
      "description": "A visual representation of a React project",
      "slug": "project-structure",
      "tags": [
        "right-angle",
        "custom-shape"
      ]
    },
    {
      "title": "Tournament Bracket Visualization",
      "description": "A sports tournament bracket showing semi-finals and final matches with scores, using nodes with descriptions and edge text to display match results.",
      "slug": "tournament-bracket",
      "tags": [
        "right-angle",
        "node-with-description",
        "edge-customization"
      ]
    },
    {
      "title": "Metro Network Hub",
      "description": "A metro transit network visualization using all-directional tree layout with travel times on connections, perfect for transportation systems and network diagrams.",
      "slug": "train-station",
      "tags": [
        "all-directional",
        "edge-customization"
      ]
    },
    {
      "title": "University Course Structure",
      "description": "An academic curriculum visualization using image nodes to display course progression from foundation to specialization tracks with instructor photos and course details.",
      "slug": "university-course",
      "tags": [
        "right-angle",
        "image-node"
      ]
    }
  ],
  "docs": [
    {
      "id": "getting-started",
      "title": "Getting Started",
      "description": "Learn how to install and use TreeCharts in your project",
      "topics": []
    },
    {
      "id": "core-concepts",
      "title": "Core Concepts",
      "description": "Understanding the fundamentals of TreeCharts",
      "topics": []
    },
    {
      "id": "tree-options",
      "title": "Tree Options",
      "description": "Different tree layout and connection types",
      "topics": [
        {
          "id": "all-directional",
          "title": "All Directional",
          "description": "Multi-directional tree layouts",
          "path": "/docs/tree-options/all-directional",
          "content": []
        },
        {
          "id": "curved",
          "title": "Curved Connection",
          "description": "Smooth curved connections for organic tree layouts",
          "path": "/docs/tree-options/curved",
          "content": []
        },
        {
          "id": "direct",
          "title": "Direct Connection",
          "description": "Simple straight-line connections between nodes",
          "path": "/docs/tree-options/direct",
          "content": []
        },
        {
          "id": "right-angle",
          "title": "Right Angle",
          "description": "90-degree angle connections for structured layouts",
          "path": "/docs/tree-options/right-angle",
          "content": []
        }
      ]
    },
    {
      "id": "node-types",
      "title": "Node Types",
      "description": "Different node styles and configurations",
      "topics": [
        {
          "id": "collapsible-node",
          "title": "Collapsible Node",
          "description": "Interactive nodes with expandable/collapsible descriptions",
          "path": "/docs/node-types/collapsible-node",
          "content": []
        },
        {
          "id": "custom-shape",
          "title": "Custom Shape",
          "description": "Geometric shapes and SVG paths for visual distinction",
          "path": "/docs/node-types/custom-shape",
          "content": []
        },
        {
          "id": "image-node",
          "title": "Image Node",
          "description": "Visual nodes with images, titles, and subtitles",
          "path": "/docs/node-types/image-node",
          "content": []
        },
        {
          "id": "node-with-description",
          "title": "Node with Description",
          "description": "Enhanced nodes with additional descriptive text content",
          "path": "/docs/node-types/node-with-description",
          "content": []
        },
        {
          "id": "regular-nodes",
          "title": "Regular Nodes (style and configuration)",
          "description": "Standard geometric shapes for displaying text content",
          "path": "/docs/node-types/regular-nodes",
          "content": []
        }
      ]
    },
    {
      "id": "edge-customization",
      "title": "Edge Customization",
      "description": "Comprehensive styling and configuration options for connections between nodes",
      "topics": []
    },
    {
      "id": "tree-alignment",
      "title": "Tree Alignment",
      "description": "Control the positioning and flow direction of your tree layouts",
      "topics": []
    },
    {
      "id": "download-feature",
      "title": "Download Feature",
      "description": "Export your tree visualizations as SVG files with customizable download options",
      "topics": []
    }
  ]
};

// Main search function
function performSearch(query, data) {
  const results = [];

  // Search through documentation sections and topics
  data.docs.forEach((section) => {
    // Search section title and description
    if (
      section.title.toLowerCase().includes(query) ||
      (section.description && section.description.toLowerCase().includes(query))
    ) {
      results.push({
        type: "doc",
        title: section.title,
        description: section.description || "",
        path: `/docs/${section.id}`,
      });
    }

    // Search through topics within each section
    section.topics.forEach((topic) => {
      const searchableText = [
        topic.title,
        topic.description,
        topic.id,
        // Search through content blocks if available
        ...topic.content
          .map((block) => {
            if (block.type === "markdown" && block.value) {
              return block.value;
            }
            if (block.title) {
              return block.title;
            }
            if (block.description) {
              return block.description;
            }
            return "";
          })
          .filter(Boolean),
      ]
        .join(" ")
        .toLowerCase();

      if (searchableText.includes(query)) {
        results.push({
          type: "doc",
          title: topic.title,
          description: topic.description || "",
          path: topic.path,
          sectionTitle: section.title,
        });
      }
    });
  });

  // Search through examples
  data.examples.forEach((example) => {
    if (
      example.title.toLowerCase().includes(query) ||
      example.description.toLowerCase().includes(query) ||
      example.slug.toLowerCase().includes(query) ||
      example.tags.some((tag) => tag.toLowerCase().includes(query))
    ) {
      results.push({
        type: "example",
        title: example.title,
        description: example.description,
        path: `/examples/${example.slug}`,
      });
    }
  });

  // Search through main pages
  const mainPages = [
    {
      title: "Documentation",
      description: "Comprehensive guide to using TreeCharts",
      path: "/docs",
    },
    {
      title: "Examples",
      description: "Interactive examples and code samples",
      path: "/examples",
    },
    {
      title: "Playground",
      description: "Interactive playground to test TreeCharts",
      path: "/playground",
    },
    {
      title: "Changelog",
      description: "Latest updates and changes",
      path: "/changelog",
    },
  ];

  mainPages.forEach((page) => {
    if (
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query)
    ) {
      results.push({
        type: "page",
        title: page.title,
        description: page.description,
        path: page.path,
      });
    }
  });

  // Sort results by relevance (exact matches first, then partial matches)
  const sortedResults = results.sort((a, b) => {
    const aExactMatch = a.title.toLowerCase() === query;
    const bExactMatch = b.title.toLowerCase() === query;

    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    const aStartsWithQuery = a.title.toLowerCase().startsWith(query);
    const bStartsWithQuery = b.title.toLowerCase().startsWith(query);

    if (aStartsWithQuery && !bStartsWithQuery) return -1;
    if (!aStartsWithQuery && bStartsWithQuery) return 1;

    return a.title.localeCompare(b.title);
  });

  // Limit results to avoid overwhelming the UI
  return sortedResults.slice(0, 10);
}

// Netlify function handler
exports.handler = async (event, context) => {
  try {
    // Handle CORS
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    // Get search query
    const query = event.queryStringParameters?.q || event.queryStringParameters?.query;

    if (!query || query.length < 2) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ results: [] }),
      };
    }

    const normalizedQuery = query.toLowerCase().trim();

    // Perform search using embedded data
    const results = performSearch(normalizedQuery, SEARCH_DATA);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ results }),
    };
  } catch (error) {
    console.error("Error in search function:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
    };
  }
};