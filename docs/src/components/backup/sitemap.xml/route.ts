import { NextResponse } from "next/server";

const staticPaths = [
  "https://treecharts.netlify.app",
  "https://treecharts.netlify.app/docs",
  "https://treecharts.netlify.app/docs/getting-started",
  "https://treecharts.netlify.app/docs/core-concepts",
  "https://treecharts.netlify.app/docs/tree-options",
  "https://treecharts.netlify.app/docs/tree-options/direct",
  "https://treecharts.netlify.app/docs/tree-options/right-angle",
  "https://treecharts.netlify.app/docs/tree-options/curved",
  "https://treecharts.netlify.app/docs/tree-options/all-directional",
  "https://treecharts.netlify.app/docs/node-types",
  "https://treecharts.netlify.app/docs/node-types/regular-nodes",
  "https://treecharts.netlify.app/docs/node-types/node-with-description",
  "https://treecharts.netlify.app/docs/node-types/collapsible-node",
  "https://treecharts.netlify.app/docs/node-types/image-node",
  "https://treecharts.netlify.app/docs/node-types/custom-shape",
  "https://treecharts.netlify.app/docs/edge-customization",
  "https://treecharts.netlify.app/docs/tree-alignment",
  "https://treecharts.netlify.app/docs/download-feature",
  "https://treecharts.netlify.app/playground",
  "https://treecharts.netlify.app/examples",
  "https://treecharts.netlify.app/examples/simple-org-chart",
  "https://treecharts.netlify.app/examples/family-tree",
  "https://treecharts.netlify.app/examples/evolution-tree",
  "https://treecharts.netlify.app/examples/project-structure",
  "https://treecharts.netlify.app/examples/tournament-bracket",
  "https://treecharts.netlify.app/examples/train-station",
  "https://treecharts.netlify.app/examples/university-course",
  "https://treecharts.netlify.app/blog",
  "https://treecharts.netlify.app/changelog",
];

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${
      url === "https://treecharts.netlify.app" ? "1.0" : "0.8"
    }</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
