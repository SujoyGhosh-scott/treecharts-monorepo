export interface ContentBlock {
  type: "markdown" | "code";
  value?: string; // For markdown content
  codes?: {
    javascript?: string;
    react?: string;
    angular?: string;
    vue?: string;
  };
  title?: string; // For code blocks
  description?: string; // For code blocks
  id?: string; // For code blocks
  outputImage?: string; // Path to the expected output image
}

export interface DocSection {
  id: string;
  title: string;
  description: string;
  content?: ContentBlock[]; // Updated to array of content blocks
  topics: DocTopic[];
  tag?: "new" | "updated"; // Optional tag for highlighting
}

export interface DocTopic {
  id: string;
  title: string;
  description: string;
  content: ContentBlock[]; // Updated to array of content blocks
  path: string;
  tag?: "new" | "updated"; // Optional tag for highlighting
}

export interface Navigation {
  sections: DocSection[];
}

export interface NavigationContext {
  current: DocTopic | null;
  previous: DocTopic | null;
  next: DocTopic | null;
  section: DocSection | null;
}

export interface SidebarProps {
  isMobile?: boolean;
}
