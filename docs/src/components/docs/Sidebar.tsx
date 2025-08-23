"use client";

import { docsNavigation } from "@/data/docs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMobile?: boolean;
}

export default function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`h-full ${
        isMobile
          ? "p-4"
          : "sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6"
      }`}
    >
      <div className="space-y-8">
        {docsNavigation.sections.map((section) => (
          <div key={section.id}>
            <div className="mb-4">
              <Link
                href={`/docs/${section.id}`}
                className={`block font-semibold text-lg hover:text-primary transition-colors ${
                  pathname === `/docs/${section.id}`
                    ? "text-primary"
                    : "text-base-content"
                }`}
              >
                {section.title}
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
                    {topic.title}
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
