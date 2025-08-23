export default function sitemap() {
  const baseUrl = "https://treecharts.dev";

  // Static pages
  const staticPages = [
    "",
    "/docs",
    "/docs/getting-started",
    "/docs/getting-started/installation",
    "/docs/getting-started/quick-start",
    "/docs/core-concepts",
    "/docs/core-concepts/data-structure",
    "/docs/core-concepts/rendering-pipeline",
    "/docs/tree-types",
    "/docs/tree-types/direct-connection",
    "/docs/tree-types/right-angle",
    "/docs/tree-types/curved-edges",
    "/docs/tree-types/all-direction",
    "/docs/node-types",
    "/docs/node-types/regular-nodes",
    "/docs/node-types/custom-nodes",
    "/docs/customization",
    "/docs/customization/tree-title",
    "/docs/customization/action-buttons",
    "/playground",
    "/examples",
    "/blog",
    "/changelog",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/docs") ? 0.8 : 0.6,
  }));
}
