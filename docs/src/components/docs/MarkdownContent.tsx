import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // You can choose different themes

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-table:table-auto prose-table:border-collapse prose-th:border prose-th:border-gray-600 prose-th:bg-gray-800 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-td:border prose-td:border-gray-600 prose-td:px-4 prose-td:py-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom styling for tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-6">
              <table
                className="min-w-full border border-gray-600 rounded-lg"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gray-800" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-gray-600 px-4 py-3 text-left font-semibold text-white"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-gray-600 px-4 py-2 text-gray-200"
              {...props}
            >
              {children}
            </td>
          ),
          // Custom styling for headings
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 text-white" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-2xl font-semibold mb-4 mt-8 text-white"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-medium mb-3 mt-6 text-white" {...props}>
              {children}
            </h3>
          ),
          // Custom styling for code blocks
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match;
            return isInline ? (
              <code
                className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-200"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-600"
              {...props}
            >
              {children}
            </pre>
          ),
          // Custom styling for lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-1" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="mb-1 text-gray-200" {...props}>
              {children}
            </li>
          ),
          // Custom styling for paragraphs
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-200" {...props}>
              {children}
            </p>
          ),
          // Custom styling for strong and emphasis
          strong: ({ children, ...props }) => (
            <strong className="font-semibold text-white" {...props}>
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-gray-300" {...props}>
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
