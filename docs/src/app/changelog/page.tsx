import Header from "@/components/Header";
import MarkdownContent from "@/components/docs/MarkdownContent";
import { CHANGELOG_CONFIG } from "@/utils/changelog";

async function fetchChangelogContent() {
  try {
    const response = await fetch(CHANGELOG_CONFIG.url, {
      // Revalidate based on config
      next: { revalidate: CHANGELOG_CONFIG.revalidateInterval }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch changelog: ${response.status}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error("Error fetching changelog:", error);
    return "# Changelog\n\nFailed to load changelog content. Please try again later.";
  }
}

export default async function ChangelogPage() {
  const changelogContent = await fetchChangelogContent();

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="bg-gradient-to-br from-base-300 to-base-100 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
              <p className="text-gray-300 text-lg">
                Track all changes, updates, and improvements to TreeCharts
              </p>
            </div>

            {/* Content */}
            <div className="bg-base-200/50 backdrop-blur-sm rounded-lg border border-base-300 p-8">
              <MarkdownContent content={changelogContent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Changelog - TreeCharts",
  description: "Track all changes, updates, and improvements to TreeCharts library",
};
