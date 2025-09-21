"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Add keyboard shortcut for search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="btn btn-ghost btn-sm flex items-center gap-2"
        aria-label="Search"
        title="Search (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-xs opacity-60 mt-1">Ctrl+K</span>
      </button>

      {/* Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
