export interface ImageGridItem {
  src: string;
  alt: string;
  description?: string;
}

export interface ContentBlock {
  type: "markdown" | "code" | "image-grid";
  value?: string; // For markdown content
  codes?: {
    javascript?: string;
    react?: string;
    angular?: string;
    vue?: string;
  };
  title?: string; // For code blocks and image grids
  description?: string; // For code blocks and image grids
  id?: string; // For code blocks
  outputImage?: string; // Path to the expected output image

  // For image grid
  images?: ImageGridItem[];
  gridConfig?: {
    desktop: number; // Number of columns on desktop
    mobile: number; // Number of columns on mobile
    gap?: string; // Gap between items (default: "20px")
    maxWidth?: string; // Max width per item (default: "300px")
  };
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
