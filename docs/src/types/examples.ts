export interface ExampleFile {
  name: string;
  code: string;
}

export interface ExampleCode {
  type: "react" | "javascript";
  files: ExampleFile[];
}

export interface Example {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  versionUsed: string;
  relatedDocs: string[];
  output: string; // Path to output image
  code: ExampleCode[];
}

export interface ExamplesData {
  examples: Example[];
}
