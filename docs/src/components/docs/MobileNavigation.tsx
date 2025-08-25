"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function MobileNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button - Mobile Only */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 btn btn-primary btn-circle w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Browse documentation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
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
          <div className="relative w-80 bg-base-100 border-r border-base-300 max-w-[85vw] h-full">
            <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-100">
              <h2 className="text-lg font-semibold">Browse Documentation</h2>
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
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
}
