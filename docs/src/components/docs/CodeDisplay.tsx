"use client";

import { useState } from "react";
import { CodeDisplayProps } from "@/types/code";

export default function CodeDisplay({
  example,
  showOutput = true,
  defaultTab = "javascript",
}: CodeDisplayProps) {
  const [activeTab, setActiveTab] =
    useState<keyof typeof example.codes>(defaultTab);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const availableTabs = Object.keys(example.codes).filter(
    (key) => example.codes[key as keyof typeof example.codes]
  ) as (keyof typeof example.codes)[];

  const handleCopy = async () => {
    const code = example.codes[activeTab];
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${example.id}`;
    await navigator.clipboard.writeText(url);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const getLanguageForTab = (tab: string) => {
    switch (tab) {
      case "javascript":
        return "javascript";
      case "react":
        return "jsx";
      case "angular":
        return "typescript";
      case "vue":
        return "vue";
      default:
        return "javascript";
    }
  };

  const renderHighlightedCode = (code: string, highlightLines?: number[]) => {
    if (!highlightLines || highlightLines.length === 0) {
      return (
        <pre className="text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      );
    }

    const lines = code.split("\n");
    return (
      <pre className="text-sm overflow-x-auto">
        <code>
          {lines.map((line, index) => {
            const lineNumber = index + 1;
            const isHighlighted = highlightLines.includes(lineNumber);
            return (
              <div
                key={index}
                className={`${
                  isHighlighted
                    ? "bg-primary/20 border-l-4 border-primary pl-2 -ml-2"
                    : ""
                }`}
              >
                {line}
                {index < lines.length - 1 && "\n"}
              </div>
            );
          })}
        </code>
      </pre>
    );
  };

  return (
    <div className="my-8" id={example.id}>
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-3 scroll-mt-20 group flex items-center gap-2">
          <a
            href={`#${example.id}`}
            className="hover:text-primary transition-colors"
          >
            {example.title}
          </a>
          <button
            onClick={handleCopyLink}
            className="transition-opacity p-1 hover:bg-base-200 rounded"
            title={linkCopied ? "Link copied!" : "Copy link to section"}
          >
            {linkCopied ? (
              <svg
                className="w-4 h-4 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-base-content/50 hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            )}
          </button>
        </h3>
        {example.description && (
          <p className="text-base-content/70 text-lg leading-relaxed">
            {example.description}
          </p>
        )}
      </div>

      <div
        className={`grid gap-6 ${
          showOutput ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        {/* Code Section */}
        <div className="order-2 lg:order-1">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-1 mb-4">
            {availableTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as keyof typeof example.codes)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-black text-primary border-b-2 border-primary"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Code Block */}
          <div className="relative">
            <div className="bg-base-200 rounded-lg border border-base-300">
              {/* Code Header with Copy Button */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-base-300">
                <span className="text-sm text-base-content/60 font-mono">
                  {getLanguageForTab(activeTab)}
                </span>
                <button
                  onClick={handleCopy}
                  className="btn btn-ghost btn-xs"
                  title="Copy code"
                >
                  {copied ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div className="p-4 font-mono text-sm bg-secondary text-white rounded-b-lg overflow-x-auto">
                {renderHighlightedCode(
                  example.codes[activeTab] || "",
                  example.highlightLines?.[activeTab]
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className="order-1 lg:order-2">
            <div className="sticky top-20">
              <h4 className="text-lg font-medium mb-3 text-primary">
                Expected Output
              </h4>
              <div
                className="rounded-lg border border-base-300 p-6 min-h-[300px] flex items-center justify-center"
                style={{ backgroundColor: "#eee" }}
              >
                {example.outputImage ? (
                  <img
                    src={example.outputImage}
                    alt={`Output for ${example.title}`}
                    className="max-w-full h-auto rounded"
                  />
                ) : (
                  <div className="text-center text-base-content/50">
                    <svg
                      className="w-16 h-16 mx-auto mb-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">Output preview coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
