"use client";

import { docsNavigation } from "@/data/docs";
import { SidebarProps } from "@/types/docs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`h-full ${
        isMobile ? "p-4" : "h-full overflow-y-auto custom-scrollbar p-6"
      }`}
    >
      <div className="space-y-8">
        {docsNavigation.sections.map((section) => (
          <div key={section.id}>
            <div className="mb-4">
              <Link
                href={
                  section.id === "getting-started"
                    ? "/docs"
                    : `/docs/${section.id}`
                }
                className={`block font-semibold text-lg hover:text-primary transition-colors ${
                  (section.id === "getting-started" && pathname === "/docs") ||
                  pathname === `/docs/${section.id}`
                    ? "text-primary"
                    : "text-base-content"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{section.title}</span>
                  {section.tag && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-normal ${
                        section.tag === "new"
                          ? "bg-primary/20 text-primary"
                          : "bg-warning/20 text-warning"
                      }`}
                    >
                      {section.tag}
                    </span>
                  )}
                </div>
              </Link>
              <p className="text-sm text-base-content/60 mt-1">
                {section.description}
              </p>
            </div>

            <ul className="space-y-2 ml-4 border-l border-base-300">
              {section.topics.map((topic) => (
                <li key={topic.id}>
                  <Link
                    href={topic.path}
                    className={`block py-2 px-4 text-sm hover:text-primary hover:bg-primary/5 rounded-r transition-colors border-l-2 ${
                      pathname === topic.path
                        ? "text-primary bg-primary/10 border-primary"
                        : "text-base-content/70 border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{topic.title}</span>
                      {topic.tag && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            topic.tag === "new"
                              ? "bg-primary/20 text-primary"
                              : "bg-warning/20 text-warning"
                          }`}
                        >
                          {topic.tag}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
