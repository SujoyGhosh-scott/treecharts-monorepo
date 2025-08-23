import { docsNavigation } from "@/data/docs";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="prose prose-lg max-w-none">
      <div className="not-prose mb-8">
        <h1 className="text-4xl font-bold mb-4">TreeCharts Documentation</h1>
        <p className="text-xl text-base-content/70">
          Learn how to create beautiful tree visualizations with TreeCharts.
          This documentation covers everything from basic installation to
          advanced customization.
        </p>
      </div>

      <div className="grid gap-6 mt-12">
        {docsNavigation.sections.map((section) => (
          <div
            key={section.id}
            className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl mb-2">
                <Link
                  href={`/docs/${section.id}`}
                  className="hover:text-primary"
                >
                  {section.title}
                </Link>
              </h2>

              <p className="text-base-content/70 mb-4">{section.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={topic.path}
                    className="block p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors"
                  >
                    <h3 className="font-medium mb-1">{topic.title}</h3>
                    <p className="text-sm text-base-content/60">
                      {topic.description}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/docs/${section.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Start Reading →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <p className="mb-4">
          New to TreeCharts? Start with our Getting Started guide to install and
          create your first tree visualization.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/getting-started/installation"
            className="btn btn-primary"
          >
            Installation Guide
          </Link>
          <Link
            href="/docs/getting-started/quick-start"
            className="btn btn-outline"
          >
            Quick Start Tutorial
          </Link>
          <Link href="/playground" className="btn btn-secondary">
            Try Playground
          </Link>
        </div>
      </div>
    </div>
  );
}
