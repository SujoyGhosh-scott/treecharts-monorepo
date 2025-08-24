import { docsNavigation } from "@/data/docs";
import MarkdownContent from "@/components/docs/MarkdownContent";
import DocsNavigation from "@/components/docs/DocsNavigation";

export default function DocsPage() {
  // Get the installation content from getting-started section
  const installationTopic = docsNavigation.sections
    .find((section) => section.id === "getting-started")
    ?.topics.find((topic) => topic.id === "installation");

  if (!installationTopic) {
    return (
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">TreeCharts Documentation</h1>
        <p className="text-xl text-base-content/70">
          Welcome to TreeCharts documentation. Get started by exploring the
          sections below.
        </p>
      </div>
    );
  }

  return (
    <div>
      <MarkdownContent content={installationTopic.content} />
      <DocsNavigation />
    </div>
  );
}
