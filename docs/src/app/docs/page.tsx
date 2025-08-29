import DocsNavigation from "@/components/docs/DocsNavigation";
import ContentRenderer from "@/components/docs/ContentRenderer";
import Breadcrumb from "@/components/docs/Breadcrumb";
import { gettingStartedSection } from "@/data/sections/getting-started";

export const metadata = {
  title: "Documentation - TreeCharts",
  description:
    "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations, org charts, family trees, and hierarchical diagrams with React and JavaScript.",
  keywords: [
    "treecharts documentation",
    "tree visualization tutorial",
    "react tree component guide",
    "javascript tree library docs",
    "org chart documentation",
    "family tree tutorial",
    "tree diagram guide",
    "hierarchical data tutorial",
    "tree visualization examples",
    "tree chart API reference",
    "getting started treecharts",
    "tree visualization getting started",
  ],
  authors: [{ name: "Sujoy Ghosh" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TreeCharts Documentation - Complete Guide",
    description:
      "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations, org charts, family trees, and hierarchical diagrams with React and JavaScript.",
    url: "https://treecharts.netlify.app/docs",
    siteName: "TreeCharts",
    images: [
      {
        url: "https://treecharts.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TreeCharts Documentation - Complete Guide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts Documentation - Complete Guide",
    description:
      "Complete documentation for TreeCharts library. Learn how to create beautiful tree visualizations with React and JavaScript.",
    images: ["https://treecharts.netlify.app/og-image.jpg"],
  },
};

export default function DocsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <Breadcrumb items={[{ label: "Docs" }]} />

      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold mb-4 font-macondo">
          {gettingStartedSection.title}
        </h1>
        <p className="text-xl text-base-content/70">
          {gettingStartedSection.description}
        </p>
      </div>

      {gettingStartedSection.content && (
        <div className="mb-8">
          <ContentRenderer content={gettingStartedSection.content} />
        </div>
      )}

      <DocsNavigation />
    </div>
  );
}
