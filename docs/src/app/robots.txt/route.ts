import { NextResponse } from "next/server";

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Host
Host: https://treecharts.dev

# Sitemaps
Sitemap: https://treecharts.dev/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
