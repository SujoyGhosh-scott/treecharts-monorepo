import DocsNavigation from "@/components/docs/DocsNavigation";
import ContentRenderer from "@/components/docs/ContentRenderer";
import Breadcrumb from "@/components/docs/Breadcrumb";
import { gettingStartedSection } from "@/data/sections/getting-started";

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
