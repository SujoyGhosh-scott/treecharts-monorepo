import { NextResponse } from "next/server";

export async function GET() {
  const robots = `User-agent: *
Allow: /

# Host
Host: https://treecharts.netlify.app

# Sitemaps
Sitemap: https://treecharts.netlify.app/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
