const fs = require('fs');
const path = require('path');

// Search result interface (same as your Next.js version)
// interface SearchResult {
//   type: "page" | "doc" | "example";
//   title: string;
//   description: string;
//   path: string;
//   sectionTitle?: string; // For doc topics to show which section they belong to
// }

// Helper function to find the src/data directory
function findSrcDataPath() {
  const possiblePaths = [
    path.resolve(__dirname, '../../src/data'),
    path.resolve(process.cwd(), 'src/data'),
    path.resolve(__dirname, '../../../src/data'),
    path.resolve(__dirname, '../../../../src/data'),
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  throw new Error(`Could not find src/data directory. Tried paths: ${possiblePaths.join(', ')}`);
}

// Parse examples data from TypeScript files
function parseExamplesData(srcDataPath) {
  const examplesDir = path.resolve(srcDataPath, 'examples');
  const examples = [];
  
  // List of example files
  const exampleFiles = [
    'simple-org-chart.ts',
    'family-tree.ts', 
    'evolution-tree.ts',
    'project-structure.ts',
    'tournament-bracket.ts',
    'train-station.ts',
    'university-course.ts'
  ];
  
  exampleFiles.forEach(file => {
    try {
      const filePath = path.resolve(examplesDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const example = extractExampleFromContent(content);
        if (example) {
          examples.push(example);
        }
      }
    } catch (error) {
      console.error(`Error reading example file ${file}:`, error);
    }
  });
  
  return examples;
}

// Parse docs sections and topics
function parseDocsData(srcDataPath) {
  const sectionsDir = path.resolve(srcDataPath, 'sections');
  const sections = [];
  
  // List of section files
  const sectionFiles = [
    'getting-started.ts',
    'core-concepts.ts', 
    'tree-options.ts',
    'node-types.ts',
    'edge-customization.ts',
    'tree-alignment.ts',
    'download-feature.ts'
  ];
  
  sectionFiles.forEach(file => {
    try {
      const filePath = path.resolve(sectionsDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const section = extractSectionFromContent(content, srcDataPath);
        if (section) {
          sections.push(section);
        }
      }
    } catch (error) {
      console.error(`Error reading section file ${file}:`, error);
    }
  });
  
  return sections;
}

// Extract example metadata from TypeScript content
function extractExampleFromContent(content) {
  try {
    // Extract title
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract description - handle multiline descriptions
    const descMatch = content.match(/description:\s*["']([^"']+)["']/s) || 
                     content.match(/description:\s*`([^`]+)`/s);
    const description = descMatch ? descMatch[1] : '';
    
    // Extract slug
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const slug = slugMatch ? slugMatch[1] : '';
    
    // Extract tags array
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/s);
    let tags = [];
    if (tagsMatch) {
      const tagsContent = tagsMatch[1];
      tags = tagsContent.match(/["']([^"']+)["']/g)?.map(tag => tag.replace(/["']/g, '')) || [];
    }
    
    if (title && slug) {
      return { title, description, slug, tags };
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting example from content:', error);
    return null;
  }
}

// Extract section and topics data from TypeScript content
function extractSectionFromContent(content, srcDataPath) {
  try {
    // Extract section metadata
    const idMatch = content.match(/id:\s*["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : '';
    
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : '';
    
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    const description = descMatch ? descMatch[1] : '';
    
    if (!id || !title) return null;
    
    const section = { id, title, description, topics: [] };
    
    // Check if this section has topics in a subfolder
    const sectionSubDir = path.resolve(srcDataPath, 'sections', id);
    if (fs.existsSync(sectionSubDir)) {
      const topicFiles = fs.readdirSync(sectionSubDir).filter(file => file.endsWith('.ts'));
      
      topicFiles.forEach(topicFile => {
        try {
          const topicPath = path.resolve(sectionSubDir, topicFile);
          const topicContent = fs.readFileSync(topicPath, 'utf8');
          const topic = extractTopicFromContent(topicContent, id);
          if (topic) {
            section.topics.push(topic);
          }
        } catch (error) {
          console.error(`Error reading topic file ${topicFile}:`, error);
        }
      });
    }
    
    return section;
  } catch (error) {
    console.error('Error extracting section from content:', error);
    return null;
  }
}

// Extract topic data from TypeScript content
function extractTopicFromContent(content, sectionId) {
  try {
    // Extract topic metadata
    const idMatch = content.match(/id:\s*["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : '';
    
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    const title = titleMatch ? titleMatch[1] : '';
    
    const descMatch = content.match(/description:\s*["']([^"']+)["']/);
    const description = descMatch ? descMatch[1] : '';
    
    if (!id || !title) return null;
    
    return {
      id,
      title,
      description,
      path: `/docs/${sectionId}/${id}`,
      content: [] // We could extract content blocks here if needed for deeper search
    };
  } catch (error) {
    console.error('Error extracting topic from content:', error);
    return null;
  }
}

// Main search function (matches your Next.js implementation)
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
        description: section.description || '',
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
          description: topic.description || '',
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

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
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

    // Load data from TypeScript files
    const srcDataPath = findSrcDataPath();
    const data = {
      examples: parseExamplesData(srcDataPath),
      docs: parseDocsData(srcDataPath),
    };
    
    // Perform search
    const results = performSearch(normalizedQuery, data);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ results }),
    };

  } catch (error) {
    console.error('Error in search function:', error);
    
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      }),
    };
  }
};