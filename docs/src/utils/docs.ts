import { docsNavigation } from "@/data/docs";
import { DocSection, DocTopic, NavigationContext } from "@/types/docs";

export function getSection(sectionId: string): DocSection | undefined {
  return docsNavigation.sections.find((section) => section.id === sectionId);
}

export function getTopic(
  sectionId: string,
  topicId: string
): DocTopic | undefined {
  const section = getSection(sectionId);
  return section?.topics.find((topic) => topic.id === topicId);
}

export function getAllPaths(): string[] {
  const paths: string[] = [];

  docsNavigation.sections.forEach((section) => {
    // Add section path
    paths.push(`/docs/${section.id}`);

    // Add topic paths
    section.topics.forEach((topic) => {
      paths.push(topic.path);
    });
  });

  return paths;
}

export function getNavigationContext(currentPath: string): NavigationContext {
  let currentTopic: DocTopic | null = null;
  let currentSection: DocSection | null = null;
  let allTopics: DocTopic[] = [];

  // Normalize the current path by removing trailing slash
  const normalizedCurrentPath = currentPath.replace(/\/$/, "") || "/";

  // Collect all topics and find current topic
  docsNavigation.sections.forEach((section) => {
    section.topics.forEach((topic) => {
      allTopics.push(topic);
      if (topic.path === normalizedCurrentPath) {
        currentTopic = topic;
        currentSection = section;
      }
    });
  });

  // If no topic found, check if it's a section page with content
  if (!currentTopic) {
    docsNavigation.sections.forEach((section) => {
      if (
        `/docs/${section.id}` === normalizedCurrentPath &&
        section.content &&
        section.content.length > 0
      ) {
        // Create a virtual topic for the section content
        currentTopic = {
          id: section.id,
          title: section.title,
          description: section.description,
          path: `/docs/${section.id}`,
          content: section.content,
        };
        currentSection = section;
      }
    });
  }

  if (!currentTopic) {
    return {
      current: null,
      previous: null,
      next: null,
      section: null,
    };
  }

  // Create a combined list of all navigable items (topics + sections with content)
  let allNavigableItems: DocTopic[] = [];

  docsNavigation.sections.forEach((section) => {
    // Add section as navigable item if it has content
    if (section.content && section.content.length > 0) {
      allNavigableItems.push({
        id: section.id,
        title: section.title,
        description: section.description,
        path: `/docs/${section.id}`,
        content: section.content,
      });
    }

    // Add all topics
    section.topics.forEach((topic) => {
      allNavigableItems.push(topic);
    });
  });

  const currentIndex = allNavigableItems.findIndex(
    (item) => item.path === normalizedCurrentPath
  );
  const previous =
    currentIndex > 0 ? allNavigableItems[currentIndex - 1] : null;
  const next =
    currentIndex < allNavigableItems.length - 1
      ? allNavigableItems[currentIndex + 1]
      : null;

  return {
    current: currentTopic,
    previous,
    next,
    section: currentSection,
  };
}
