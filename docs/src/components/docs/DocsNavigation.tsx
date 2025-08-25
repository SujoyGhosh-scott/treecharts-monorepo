"use client";

import { getNavigationContext } from "@/utils/docs";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DocsNavigation() {
  const pathname = usePathname();
  const navigation = getNavigationContext(pathname);

  if (!navigation.current) {
    return null;
  }

  return (
    <div className="border-t border-base-300 mt-16 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Previous Topic */}
        {navigation.previous && (
          <Link
            href={navigation.previous.path}
            className="btn btn-outline btn-block justify-start h-auto p-4"
          >
            <div className="text-left">
              <div className="text-xs text-base-content/60 mb-1">Previous</div>
              <div className="font-medium">{navigation.previous.title}</div>
            </div>
          </Link>
        )}

        {/* Spacer */}
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>

        {/* Next Topic */}
        {navigation.next && (
          <Link
            href={navigation.next.path}
            className="btn btn-outline btn-block justify-end h-auto p-4"
          >
            <div className="text-right">
              <div className="text-xs text-base-content/60 mb-1">Next</div>
              <div className="font-medium">{navigation.next.title}</div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
