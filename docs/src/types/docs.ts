export interface DocSection {
  id: string;
  title: string;
  description: string;
  topics: DocTopic[];
}

export interface DocTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  path: string;
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
