import Link from "next/link";
import { DocLink } from "@/utils/docs-filter";
import { Example } from "@/types/examples";

interface ExampleSidebarProps {
  relatedDocs: DocLink[];
  relatedExamples: Example[];
}

export default function ExampleSidebar({
  relatedDocs,
  relatedExamples,
}: ExampleSidebarProps) {
  return (
    <div className="p-6">
      <h3 className="text-xs font-semibold text-base-content/60 mb-4 uppercase tracking-wide">
        Related Docs
      </h3>

      {relatedDocs.length > 0 ? (
        <div className="space-y-6 mb-6">
          {relatedDocs.map((doc) => (
            <Link
              key={doc.id}
              href={doc.slug}
              className="block hover:text-primary transition-colors group"
            >
              <h4 className="font-semibold text-base-content group-hover:text-primary transition-colors mb-1 font-br-hendrix">
                {doc.title}
              </h4>
              <p className="text-xs text-base-content/60">{doc.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-base-content/50 mb-8">
          No related documentation found.
        </p>
      )}

      <div className="pt-6 border-t border-base-300">
        <h4 className="text-xs font-semibold text-base-content/60 mb-3 uppercase tracking-wide">
          Related Examples
        </h4>

        {relatedExamples.length > 0 ? (
          <div className="space-y-6">
            {relatedExamples.map((example) => (
              <Link
                key={example.slug}
                href={`/examples/${example.slug}`}
                className="block hover:text-primary transition-colors group"
              >
                <h4 className="font-semibold text-base-content group-hover:text-primary transition-colors mb-1 font-br-hendrix">
                  {example.title}
                </h4>
                <p className="text-xs text-base-content/60 line-clamp-2">
                  {example.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-base-content/50">
            No related examples found.
          </p>
        )}
      </div>
    </div>
  );
}
