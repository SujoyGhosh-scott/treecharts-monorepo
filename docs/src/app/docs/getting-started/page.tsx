import { getSection } from "@/data/docs";
import Link from "next/link";

export default function GettingStartedPage() {
  const section = getSection("getting-started");

  if (!section) {
    return <div>Section not found</div>;
  }

  return (
    <div className="prose prose-lg max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold mb-4">{section.title}</h1>
        <p className="text-xl text-base-content/70">{section.description}</p>
      </div>

      <div className="not-prose">
        <div className="grid gap-6">
          {section.topics.map((topic) => (
            <div
              key={topic.id}
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title text-xl">
                  <Link href={topic.path} className="hover:text-primary">
                    {topic.title}
                  </Link>
                </h2>
                <p className="text-base-content/70">{topic.description}</p>
                <div className="card-actions justify-end">
                  <Link href={topic.path} className="btn btn-primary btn-sm">
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
