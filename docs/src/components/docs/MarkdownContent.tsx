"use client";

import { useEffect, useState } from "react";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Simple markdown-like rendering for demo
    // In production, you'd use a proper markdown parser like remark
    const processedContent = content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6">$1</h1>')
      .replace(
        /^## (.*$)/gim,
        '<h2 class="text-2xl font-semibold mb-4 mt-8">$1</h2>'
      )
      .replace(
        /^### (.*$)/gim,
        '<h3 class="text-xl font-medium mb-3 mt-6">$1</h3>'
      )
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-base-200 px-2 py-1 rounded text-sm">$1</code>'
      )
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        '<pre class="bg-base-200 p-4 rounded-lg overflow-x-auto mb-4"><code>$2</code></pre>'
      )
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(
        /(<li.*<\/li>)/g,
        '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>'
      )
      .replace(/\n/g, "<br>");

    setHtmlContent(processedContent);
  }, [content]);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
