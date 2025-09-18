import Link from "next/link";
import { DocLink } from "@/utils/docs-filter";

interface ExampleSidebarProps {
  relatedDocs: DocLink[];
}

export default function ExampleSidebar({ relatedDocs }: ExampleSidebarProps) {
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
        <Link
          href="/examples"
          className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <span>View all examples</span>
          <svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
