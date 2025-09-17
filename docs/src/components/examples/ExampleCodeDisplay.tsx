"use client";

import { useState, useEffect } from "react";
import { Example } from "@/types/examples";
import ImageModal from "./ImageModal";

interface ExampleCodeDisplayProps {
  example: Example;
  showOutput?: boolean;
}

export default function ExampleCodeDisplay({
  example,
  showOutput = true,
}: ExampleCodeDisplayProps) {
  const [activeLibrary, setActiveLibrary] = useState<string>(
    example.code[0]?.type || "react"
  );
  const [activeFile, setActiveFile] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get current library's code data
  const currentLibraryData = example.code.find(
    (code) => code.type === activeLibrary
  );

  // Set default file when library changes
  useEffect(() => {
    if (currentLibraryData && currentLibraryData.files.length > 0) {
      setActiveFile(currentLibraryData.files[0].name);
    }
  }, [activeLibrary, currentLibraryData]);

  // Get current file's code
  const currentFile = currentLibraryData?.files.find(
    (file) => file.name === activeFile
  );

  const handleCopy = async () => {
    if (currentFile?.code) {
      await navigator.clipboard.writeText(currentFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Set initial file when component mounts or library changes
  if (
    currentLibraryData &&
    activeFile === "" &&
    currentLibraryData.files.length > 0
  ) {
    setActiveFile(currentLibraryData.files[0].name);
  }

  return (
    <div className="my-8 w-full max-w-full overflow-hidden">
      <div
        className={`grid gap-4 sm:gap-6 w-full max-w-full ${
          showOutput ? "lg:grid-cols-2" : "lg:grid-cols-1"
        }`}
      >
        {/* Code Section */}
        <div className="order-2 lg:order-1 w-full max-w-full min-w-0">
          {/* Library Tab Navigation (First Level) */}
          <div className="flex flex-wrap gap-1 mb-4 overflow-x-auto">
            {example.code.map((codeData) => (
              <button
                key={codeData.type}
                onClick={() => {
                  setActiveLibrary(codeData.type);
                  setActiveFile(codeData.files[0]?.name || "");
                }}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors capitalize ${
                  activeLibrary === codeData.type
                    ? "bg-black text-primary border-b-2 border-primary"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200/50"
                }`}
              >
                {codeData.type}
              </button>
            ))}
          </div>

          {/* File Tab Navigation (Second Level) */}
          {currentLibraryData && (
            <div className="flex items-center justify-between mb-0 overflow-x-auto">
              <div className="flex gap-0">
                {currentLibraryData.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`px-3 py-2 text-xs font-medium transition-colors border-r border-base-300 ${
                      activeFile === file.name
                        ? "bg-secondary text-white"
                        : "text-base-content/60 hover:text-base-content bg-base-200"
                    }`}
                  >
                    {file.name}
                  </button>
                ))}
              </div>
              <button
                onClick={handleCopy}
                className="px-3 py-2 hover:bg-base-200 transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <svg
                    className="w-3 h-3"
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
                    className="w-3 h-3"
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
          )}

          {/* Code Block */}
          <div className="relative w-full max-w-full">
            <div className="bg-base-200 rounded-b-lg border border-base-300 border-t-0 w-full max-w-full overflow-hidden">
              {/* Code Content */}
              <div className="p-4 font-mono text-sm bg-secondary text-white overflow-x-auto max-w-full">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap break-words max-w-full">
                  <code>{currentFile?.code || "No code available"}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className="order-1 lg:order-2 w-full max-w-full min-w-0">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-primary">
                  Expected Output
                </h4>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors group"
                  title="View full screen"
                >
                  <svg
                    className="w-5 h-5 text-base-content/60 group-hover:text-base-content transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="rounded-lg border border-base-300 p-6 min-h-[300px] flex items-center justify-center w-full max-w-full overflow-hidden cursor-pointer group"
                style={{ backgroundColor: "#eee" }}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={example.output}
                  alt={`Output for ${example.title}`}
                  className="max-w-full h-auto rounded group-hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        src={example.output}
        alt={`${example.title} - Full Screen View`}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
