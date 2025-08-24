import { getTopic } from "@/utils/docs";
import { docsNavigation } from "@/data/docs";
import MarkdownContent from "@/components/docs/MarkdownContent";
import DocsNavigation from "@/components/docs/DocsNavigation";
import { notFound } from "next/navigation";

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
        <div className="not-prose mb-8">
          <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
          <p className="text-xl text-base-content/70">{section.description}</p>
        </div>

        <div className="grid gap-4 mt-8">
          {section.topics.map((topic) => (
            <div
              key={topic.id}
              className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">
                  <a href={topic.path} className="hover:text-primary">
                    {topic.title}
                  </a>
                </h2>
                <p className="text-base-content/70">{topic.description}</p>
              </div>
            </div>
          ))}
        </div>
        <DocsNavigation />
      </div>
    );
  }

  // Handle topic paths (e.g., /docs/getting-started/installation)
  if (slug.length === 2) {
    const [sectionId, topicId] = slug;
    const topic = getTopic(sectionId, topicId);

    if (!topic) {
      return notFound();
    }

    return (
      <div>
        <MarkdownContent content={topic.content} />
        <DocsNavigation />
      </div>
    );
  }

  return notFound();
}
