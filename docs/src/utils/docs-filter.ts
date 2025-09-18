import { docsNavigation } from "@/data/docs";

export interface DocLink {
  id: string;
  title: string;
  description: string;
  slug: string;
}

/**
 * Get documentation links for the given tag IDs
 * This function filters the docs data to only return relevant sections
 * for use in example sidebars, avoiding loading all content on the client
 */
export function getDocsLinksByTags(tags: string[]): DocLink[] {
  const docLinks: DocLink[] = [];

  for (const tag of tags) {
    // First, check if it's a section ID
    const section = docsNavigation.sections.find(
      (section) => section.id === tag
    );

    if (section) {
      docLinks.push({
        id: section.id,
        title: section.title,
        description: section.description,
        slug: `/docs/${section.id}`,
      });
    } else {
      // If not found in sections, search in topics within all sections
      for (const section of docsNavigation.sections) {
        if (section.topics) {
          const topic = section.topics.find((topic) => topic.id === tag);
          if (topic) {
            docLinks.push({
              id: topic.id,
              title: topic.title,
              description: topic.description,
              slug: topic.path, // Topics have their own path
            });
            break; // Found the topic, no need to continue searching
          }
        }
      }
    }
  }

  return docLinks;
}

/**
 * Get all available doc links for general navigation
 */
export function getAllDocsLinks(): DocLink[] {
  return docsNavigation.sections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    slug: `/docs/${section.id}`,
  }));
}

/**
 * Get all available topic IDs for reference (useful for debugging/development)
 */
export function getAllTopicIds(): string[] {
  const topicIds: string[] = [];

  for (const section of docsNavigation.sections) {
    if (section.topics) {
      for (const topic of section.topics) {
        topicIds.push(topic.id);
      }
    }
  }

  return topicIds;
}
