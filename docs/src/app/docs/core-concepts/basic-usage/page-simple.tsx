export default function BasicUsagePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-macondo">Basic Usage</h1>
        <p className="text-lg text-base-content/70">
          Learn how to create your first tree chart
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="font-macondo">Simple Family Tree Example</h2>
        <p>
          This example shows how to create a basic family tree with just a few
          lines of code. The tree will display a simple hierarchical structure
          with parent-child relationships.
        </p>

        <div className="mockup-code">
          <pre data-prefix="1">
            <code>const data = {"{"}</code>
          </pre>
          <pre data-prefix="2">
            <code> name: "John Smith",</code>
          </pre>
          <pre data-prefix="3">
            <code> children: [</code>
          </pre>
          <pre data-prefix="4">
            <code>
              {" "}
              {"{"} name: "Jane Smith" {"}"},
            </code>
          </pre>
          <pre data-prefix="5">
            <code>
              {" "}
              {"{"} name: "Mike Smith" {"}"}
            </code>
          </pre>
          <pre data-prefix="6">
            <code> ]</code>
          </pre>
          <pre data-prefix="7">
            <code>{"}"}</code>
          </pre>
        </div>

        <h2 className="font-macondo">Key Concepts</h2>
        <ul>
          <li>
            <strong>Data Structure:</strong> TreeCharts expects a nested object
            with optional <code>children</code> arrays
          </li>
          <li>
            <strong>Node Renderer:</strong> Determines how each node is visually
            displayed (circle, rectangle, etc.)
          </li>
          <li>
            <strong>Direction:</strong> Controls the flow of the tree (down, up,
            left, right)
          </li>
          <li>
            <strong>Container:</strong> The DOM element or component where the
            tree will be rendered
          </li>
        </ul>
      </div>
    </div>
  );
}
