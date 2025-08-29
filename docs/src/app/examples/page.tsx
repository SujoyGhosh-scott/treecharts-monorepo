// app/examples/page.jsx
import GameOfLifeVisualization from "@/components/GameOfLifeVisualization";

export const metadata = {
  title: "Examples - TreeCharts",
  description:
    "Explore real-world examples and use cases for TreeCharts. Discover how to implement org charts, family trees, decision trees, and more in your applications.",
  keywords: [
    "treecharts examples",
    "tree visualization examples",
    "org chart examples",
    "family tree examples",
    "decision tree examples",
    "tree diagram use cases",
    "hierarchical chart examples",
    "real world tree examples",
    "tree visualization showcase",
    "interactive tree examples",
    "react tree examples",
    "javascript tree examples",
  ],
  authors: [{ name: "Sujoy Ghosh" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "TreeCharts Examples - Real-World Use Cases",
    description:
      "Explore real-world examples and use cases for TreeCharts. Discover how to implement org charts, family trees, decision trees, and more in your applications.",
    url: "https://treecharts.netlify.app/examples",
    siteName: "TreeCharts",
    images: [
      {
        url: "https://treecharts.netlify.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TreeCharts Examples - Real-World Use Cases",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeCharts Examples - Real-World Use Cases",
    description:
      "Explore real-world examples and use cases for TreeCharts. Discover how to implement org charts, family trees, decision trees, and more.",
    images: ["https://treecharts.netlify.app/og-image.jpg"],
  },
};

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 relative">
      {/* Game of Life Background using GameOfLifeVisualization */}
      <GameOfLifeVisualization
        cellSize={40}
        updateInterval={300}
        initialDensity={0.15}
        deadCellOpacity={0}
        liveCellOpacity={0.06}
        cellColor="255, 255, 255"
        glowEffect={false}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
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
              Real-World Examples
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover how TreeCharts powers real-world applications. From
              organizational hierarchies to family genealogies, explore
              practical implementations and use cases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
