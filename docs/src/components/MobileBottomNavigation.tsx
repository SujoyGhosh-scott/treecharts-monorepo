"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FileText, Play } from "lucide-react";

export default function MobileBottomNavigation() {
  const pathname = usePathname();

  const navigation = [
    { name: "Docs", href: "/docs", icon: BookOpen },
    { name: "Examples", href: "/examples", icon: FileText },
    { name: "Playground", href: "/playground", icon: Play },
  ];

  const isActive = (href: string) => {
    if (href === "/docs") {
      return pathname === "/docs" || pathname.startsWith("/docs/");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-base-100 border-t border-base-300 backdrop-blur-sm bg-opacity-95">
      <div className="flex justify-around items-center py-3 px-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors min-w-0 flex-1 ${
                active
                  ? "text-primary bg-primary/10"
                  : "text-base-content/60 hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
