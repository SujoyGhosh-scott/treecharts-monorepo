// Import your data - adjust paths as needed
const docsNavigation = require("../../docs/src/data/docs").docsNavigation;
const examplesData = require("../../docs/src/data/examples").examplesData;

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Get query parameter
  const query = event.queryStringParameters?.q?.toLowerCase().trim();

  if (!query || query.length < 2) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ results: [] }),
    };
  }

  const results = [];

  // Search through documentation sections and topics
  docsNavigation.sections.forEach((section) => {
    // Search section title and description
    if (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query)
    ) {
      results.push({
        type: "doc",
        title: section.title,
        description: section.description,
        path: `/docs/${section.id}`,
      });
    }

    // Search through topics within each section
    section.topics.forEach((topic) => {
      const searchableText = [
        topic.title,
        topic.description,
        topic.id,
        // Search through content blocks
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
          description: topic.description,
          path: topic.path,
          sectionTitle: section.title,
        });
      }
    });
  });

  // Search through examples
  examplesData.examples.forEach((example) => {
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

  // Sort results by relevance
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

  // Limit results to 10
  const limitedResults = sortedResults.slice(0, 10);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ results: limitedResults }),
  };
};
