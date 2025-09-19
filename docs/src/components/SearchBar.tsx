"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, FileText, BookOpen, ExternalLink, Dot } from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: "page" | "doc" | "example";
  title: string;
  description: string;
  path: string;
  sectionTitle?: string;
}

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom hook for debounced value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounce the search query to avoid excessive API calls
  const debouncedQuery = useDebounce(query, 300);

  // Search function
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedQuery, performSearch]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : -1
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > -1 ? prev - 1 : results.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            // Navigate to the selected result
            window.location.href = results[selectedIndex].path;
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case "doc":
        return BookOpen;
      case "example":
        return FileText;
      case "page":
        return ExternalLink;
      default:
        return Search;
    }
  };

  const getIconBackgroundColor = (type: string) => {
    switch (type) {
      case "doc":
        return "bg-info bg-opacity-20";
      case "example":
        return "bg-success bg-opacity-20";
      case "page":
        return "bg-secondary bg-opacity-20";
      default:
        return "bg-neutral bg-opacity-20";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center pt-[10vh]">
      <div
        ref={resultsRef}
        className="bg-base-100 rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] flex flex-col border border-base-300"
      >
        {/* Search Input */}
        <div className="p-4 border-b border-base-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-60 w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentation, examples, and pages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 input input-bordered focus:input-primary bg-base-100"
            />
            <button
              onClick={onClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-60 hover:opacity-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="p-4 text-center text-base-content opacity-70">
              <div className="loading loading-spinner loading-md" />
              <span className="ml-2">Searching...</span>
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="p-4 text-center text-base-content opacity-70">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!isLoading && query.length > 0 && query.length < 2 && (
            <div className="p-4 text-center text-base-content opacity-70">
              Type at least 2 characters to search
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => {
                const Icon = getResultIcon(result.type);
                const isSelected = index === selectedIndex;

                return (
                  <Link
                    key={`${result.type}-${result.path}`}
                    href={result.path}
                    onClick={onClose}
                    className={`block px-4 py-3 hover:bg-base-200 transition-colors ${
                      isSelected
                        ? "bg-primary bg-opacity-10 border-r-2 border-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${getIconBackgroundColor(
                          result.type
                        )} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-base-content opacity-80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 font-br-hendrix">
                          <h3 className="text-base-content text-xs truncate font-br-hendrix">
                            {result.title}
                          </h3>
                          {result.sectionTitle && (
                            <>
                              <Dot className="w-6 h-6 text-base-content opacity-50 flex-shrink-0" />
                              <span className="text-xs text-base-content opacity-60 truncate">
                                in {result.sectionTitle}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-base-content opacity-70 line-clamp-2 font-mono font-thin">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-base-300 text-xs text-base-content opacity-60 flex justify-between">
          <span>↑↓ navigate • ↵ select • esc close</span>
          <span>{results.length > 0 ? `${results.length} results` : ""}</span>
        </div>
      </div>
    </div>
  );
}
