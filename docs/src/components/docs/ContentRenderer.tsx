import React from "react";
import { ContentBlock } from "@/types/docs";
import { CodeExample } from "@/types/code";
import MarkdownContent from "./MarkdownContent";
import CodeDisplay from "./CodeDisplay";

interface ContentRendererProps {
  content: ContentBlock[];
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-8">
      {content.map((block, index) => {
        if (block.type === "markdown") {
          return (
            <div key={index}>
              <MarkdownContent content={block.value || ""} />
            </div>
          );
        }

        if (block.type === "code") {
          const codeExample: CodeExample = {
            title: block.title || "",
            description: block.description || "",
            id: block.id || `code-${index}`,
            codes: block.codes || {},
            outputImage: block.outputImage,
          };

          return (
            <div key={index} className="not-prose">
              <CodeDisplay example={codeExample} />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
