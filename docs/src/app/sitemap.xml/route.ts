import { NextResponse } from "next/server";

const staticPaths = [
  "https://treecharts.dev",
  "https://treecharts.dev/docs",
  "https://treecharts.dev/docs/getting-started",
  "https://treecharts.dev/docs/core-concepts",
  "https://treecharts.dev/docs/tree-options",
  "https://treecharts.dev/docs/node-types",
  "https://treecharts.dev/docs/edge-customization",
  "https://treecharts.dev/docs/tree-alignment",
  "https://treecharts.dev/docs/download-feature",
  "https://treecharts.dev/playground",
  "https://treecharts.dev/examples",
  "https://treecharts.dev/blog",
  "https://treecharts.dev/changelog",
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
    <priority>${url === "https://treecharts.dev" ? "1.0" : "0.8"}</priority>
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
