export interface DocSection {
  id: string;
  title: string;
  description: string;
  content?: string; // Optional content for sections that don't need subsections
  topics: DocTopic[];
  tag?: "new" | "updated"; // Optional tag for highlighting
}

export interface DocTopic {
  id: string;
  title: string;
  description: string;
  content: string;
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
