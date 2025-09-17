import { examplesData } from "@/data/examples";
import { notFound } from "next/navigation";

interface ExamplePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return examplesData.examples.map((example) => ({
    slug: example.slug,
  }));
}

export function generateMetadata({ params }: ExamplePageProps) {
  const example = examplesData.examples.find(
    (example) => example.slug === params.slug
  );

  if (!example) {
    return {
      title: "Example Not Found - TreeCharts",
    };
  }

  return {
    title: `${example.title} - TreeCharts Examples`,
    description: example.description,
    keywords: [...example.tags, "treecharts", "tree visualization", "example"],
    openGraph: {
      title: `${example.title} - TreeCharts Examples`,
      description: example.description,
      url: `https://treecharts.netlify.app/examples/${example.slug}`,
      siteName: "TreeCharts",
      images: [
        {
          url: `https://treecharts.netlify.app${example.output}`,
          width: 1200,
          height: 630,
          alt: example.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function ExamplePage({ params }: ExamplePageProps) {
  const example = examplesData.examples.find(
    (example) => example.slug === params.slug
  );

  if (!example) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <a
              href="/examples"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Examples
            </a>
          </div>

          {/* Example Header */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {example.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6">{example.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {example.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span>Version: {example.versionUsed}</span>
              <span>Code: {example.code.map((c) => c.type).join(", ")}</span>
              {example.relatedDocs.length > 0 && (
                <span>Related Docs: {example.relatedDocs.length} topics</span>
              )}
            </div>
          </div>

          {/* Placeholder for future implementation */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Example Details Coming Soon
            </h2>
            <p className="text-gray-300 mb-6">
              This page will show the complete code implementation, live
              preview, and detailed explanation.
            </p>
            <div className="bg-gray-800/50 rounded-lg p-4 text-left">
              <code className="text-green-400 text-sm">
                Slug: {params.slug}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
