import { Example } from "@/types/examples";

/**
 * Find related examples based on shared tags
 * @param currentExample - The current example to find related examples for
 * @param allExamples - Array of all available examples
 * @param maxResults - Maximum number of related examples to return (default: 5)
 * @returns Array of related examples, sorted by relevance (most shared tags first)
 */
export function getRelatedExamples(
  currentExample: Example,
  allExamples: Example[],
  maxResults: number = 5
): Example[] {
  if (!currentExample.tags || currentExample.tags.length === 0) {
    return [];
  }

  const currentTags = new Set(currentExample.tags);

  // Calculate relevance score for each example
  const scoredExamples = allExamples
    .filter(
      (example) =>
        // Exclude the current example
        example.slug !== currentExample.slug &&
        // Only include examples that have tags
        example.tags &&
        example.tags.length > 0
    )
    .map((example) => {
      const exampleTags = new Set(example.tags);
      const sharedTags = Array.from(currentTags).filter((tag) =>
        exampleTags.has(tag)
      );

      return {
        example,
        sharedTagsCount: sharedTags.length,
        sharedTags,
        // Calculate relevance score:
        // - More shared tags = higher score
        // - Bonus for having many tags in common relative to total tags
        relevanceScore:
          sharedTags.length + (sharedTags.length / example.tags!.length) * 0.5,
      };
    })
    .filter((scored) => scored.sharedTagsCount > 0) // Only include examples with at least 1 shared tag
    .sort((a, b) => {
      // Sort by relevance score (descending)
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      // If same score, sort alphabetically by title
      return a.example.title.localeCompare(b.example.title);
    });

  return scoredExamples.slice(0, maxResults).map((scored) => scored.example);
}

/**
 * Get a preview of shared tags between current example and a related example
 * @param currentExample - The current example
 * @param relatedExample - The related example to compare
 * @returns Array of shared tag names
 */
export function getSharedTags(
  currentExample: Example,
  relatedExample: Example
): string[] {
  if (!currentExample.tags || !relatedExample.tags) {
    return [];
  }

  const currentTags = new Set(currentExample.tags);
  return relatedExample.tags.filter((tag) => currentTags.has(tag));
}
