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

  if (!currentTopic) {
    return {
      current: null,
      previous: null,
      next: null,
      section: null,
    };
  }

  const currentIndex = allTopics.findIndex(
    (topic) => topic.path === normalizedCurrentPath
  );
  const previous = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const next =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return {
    current: currentTopic,
    previous,
    next,
    section: currentSection,
  };
}
