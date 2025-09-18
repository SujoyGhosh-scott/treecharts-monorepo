"use client";

import { useState } from "react";
import { DocLink } from "@/utils/docs-filter";
import { Example } from "@/types/examples";
import ExampleSidebar from "./ExampleSidebar";

interface ExampleMobileNavigationProps {
  relatedDocs: DocLink[];
  relatedExamples: Example[];
}

export default function ExampleMobileNavigation({
  relatedDocs,
  relatedExamples,
}: ExampleMobileNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - Mobile Only */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden flex fixed bottom-20 right-6 z-40 btn btn-primary shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Browse examples"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        <span className="mt-1">Examples</span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-80 bg-base-100 border-r border-base-300 max-w-[85vw] h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100 flex-shrink-0">
              <h2 className="text-lg font-semibold">Browse Examples</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto bg-base-50">
              <ExampleSidebar
                relatedDocs={relatedDocs}
                relatedExamples={relatedExamples}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
