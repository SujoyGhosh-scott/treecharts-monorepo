import { getTopic } from "@/utils/docs";
import { docsNavigation } from "@/data/docs";
import MarkdownContent from "@/components/docs/MarkdownContent";
import DocsNavigation from "@/components/docs/DocsNavigation";
import BasicUsageWithCodeDisplay from "@/components/docs/BasicUsageWithCodeDisplay";
import Breadcrumb from "@/components/docs/Breadcrumb";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  docsNavigation.sections.forEach((section) => {
    // Add section paths
    paths.push({ slug: [section.id] });

    // Add topic paths
    section.topics.forEach((topic) => {
      const pathParts = topic.path
        .split("/")
        .filter((part) => part !== "" && part !== "docs");
      paths.push({ slug: pathParts });
    });
  });

  return paths;
}

export default function DynamicDocsPage({ params }: PageProps) {
  const { slug } = params;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  // Handle section-only paths (e.g., /docs/getting-started)
  if (slug.length === 1) {
    const section = docsNavigation.sections.find((s) => s.id === slug[0]);
    if (!section) {
      return notFound();
    }

    return (
      <div className="prose prose-lg max-w-none">
        <Breadcrumb
          items={[{ label: "Docs", href: "/docs" }, { label: section.title }]}
        />

        <div className="not-prose mb-8">
          <h1 className="text-4xl font-bold mb-4 font-macondo">
            {section.title}
          </h1>
          <p className="text-xl text-base-content/70">{section.description}</p>
        </div>

        {/* Show section content if available */}
        {section.content && (
          <div className="mb-8">
            <MarkdownContent content={section.content} />
          </div>
        )}

        {/* Show topics only if section has any */}
        {section.topics && section.topics.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 font-macondo">Topics</h2>
            <div className="grid gap-4 md:grid-cols-2 mt-6">
              {section.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow"
                >
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="card-title flex-1">
                        <Link href={topic.path} className="hover:text-primary">
                          {topic.title}
                        </Link>
                      </h3>
                      <Link
                        href={topic.path}
                        className="btn btn-primary btn-xs rounded-full px-4 ml-3 flex-shrink-0"
                      >
                        Read
                      </Link>
                    </div>
                    <p className="text-base-content/70">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <DocsNavigation />
      </div>
    );
  }

  // Handle topic paths (e.g., /docs/getting-started/installation)
  if (slug.length === 2) {
    const [sectionId, topicId] = slug;
    const topic = getTopic(sectionId, topicId);
    const section = docsNavigation.sections.find((s) => s.id === sectionId);

    if (!topic || !section) {
      return notFound();
    }

    // Special handling for basic-usage page with CodeDisplay component
    if (sectionId === "core-concepts" && topicId === "basic-usage") {
      return (
        <div>
          <Breadcrumb
            items={[
              { label: "Docs", href: "/docs" },
              { label: section.title, href: `/docs/${section.id}` },
              { label: topic.title },
            ]}
          />
          <BasicUsageWithCodeDisplay />
          <DocsNavigation />
        </div>
      );
    }

    return (
      <div>
        <Breadcrumb
          items={[
            { label: "Docs", href: "/docs" },
            { label: section.title, href: `/docs/${section.id}` },
            { label: topic.title },
          ]}
        />
        <MarkdownContent content={topic.content} />
        <DocsNavigation />
      </div>
    );
  }

  return notFound();
}
