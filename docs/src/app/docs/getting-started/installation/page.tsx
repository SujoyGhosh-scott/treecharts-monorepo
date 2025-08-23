import { getTopic } from "@/data/docs";
import MarkdownContent from "@/components/docs/MarkdownContent";

export default function InstallationPage() {
  const topic = getTopic("getting-started", "installation");

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{topic.title}</h1>
        <p className="text-xl text-base-content/70">{topic.description}</p>
      </div>

      <MarkdownContent content={topic.content} />
    </div>
  );
}
