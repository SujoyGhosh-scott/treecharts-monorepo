import { examplesData } from "@/data/examples";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/docs/Breadcrumb";
import ExampleCodeDisplay from "@/components/examples/ExampleCodeDisplay";
import ExampleMobileNavigation from "@/components/examples/ExampleMobileNavigation";

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
    <div className="min-h-screen bg-base-100">
      <div className="flex h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block w-80 border-r border-base-300 bg-base-50 overflow-hidden">
          {/* Empty sidebar space for now */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-base-content/70 mb-4">
              Related Content
            </h3>
            <p className="text-sm text-base-content/50">
              Sidebar content coming soon...
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-base-200">
          {/* Mobile Navigation Component */}
          <ExampleMobileNavigation />

          <div className="max-w-4xl mx-auto">
            <main className="px-6 py-8">
              <div>
                <Breadcrumb
                  items={[
                    { label: "Examples", href: "/examples" },
                    { label: example.title },
                  ]}
                />

                {/* Example Header */}
                <div className="not-prose mb-8">
                  <h1 className="text-4xl font-bold mb-4 font-macondo">
                    {example.title}
                  </h1>
                  <p className="text-xl text-base-content/70 leading-relaxed">
                    {example.description}
                  </p>
                </div>

                {/* Code Implementation */}
                <ExampleCodeDisplay example={example} showOutput={true} />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge badge-primary badge-outline"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
