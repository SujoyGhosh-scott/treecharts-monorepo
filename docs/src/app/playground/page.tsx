import GameOfLifeBackground from "@/components/GameOfLifeBackground";

export const metadata = {
  title: "Playground - TreeCharts",
  description:
    "Interactive TreeCharts playground. Create, customize, and export beautiful tree visualizations for your presentations, documents, and applications. Build org charts, family trees, and diagrams visually.",
  keywords: [
    "treecharts playground",
    "tree chart builder",
    "interactive tree editor",
    "visual tree creator",
    "org chart maker",
    "family tree builder",
    "diagram creator",
    "tree visualization tool",
    "online tree editor",
    "export tree charts",
    "tree chart generator",
    "visual hierarchy builder",
  ],
  authors: [{ name: "Sujoy Ghosh" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TreeCharts Playground - Visual Tree Builder",
    description:
      "Interactive TreeCharts playground. Create, customize, and export beautiful tree visualizations for your presentations, documents, and applications.",
    url: "https://treecharts.netlify.app/playground",
    siteName: "TreeCharts",
    images: [
      {
        url: "https://treecharts.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TreeCharts Playground - Visual Tree Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts Playground - Visual Tree Builder",
    description:
      "Interactive TreeCharts playground. Create, customize, and export beautiful tree visualizations for your presentations and documents.",
    images: ["https://treecharts.netlify.app/og-image.jpg"],
  },
};

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-base-100 relative">
      {/* Game of Life Background - Client Component */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 to-secondary/10">
        <GameOfLifeBackground
          cellSize={40}
          updateInterval={300}
          initialDensity={0.15}
          deadCellOpacity={0}
          liveCellOpacity={0.06}
          cellColor="255, 255, 255"
          glowEffect={false}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Coming Soon
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-macondo">
              Interactive Playground
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Create stunning tree visualizations without writing code. Design,
              customize, and export your charts for presentations, documents, or
              anywhere you need them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
