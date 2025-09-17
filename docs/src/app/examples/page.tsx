// app/examples/page.tsx
import GameOfLifeVisualization from "@/components/GameOfLifeVisualization";
import { examplesData } from "@/data/examples";
import Link from "next/link";
import Image from "next/image";

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
        url: "https://treecharts.netlify.app/logo1.png",
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
    images: ["https://treecharts.netlify.app/logo1.png"],
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
          <div className="max-w-4xl mx-auto text-center mb-16">
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

          {/* Examples Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examplesData.examples.map((example, index) => (
                <Link
                  key={example.slug}
                  href={`/examples/${example.slug}`}
                  className="group block"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    {/* Output Image */}
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={example.output}
                        alt={example.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {example.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                      {example.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {example.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {example.tags.length > 2 && (
                        <span className="px-3 py-1 bg-gray-500/20 text-gray-300 text-xs font-medium rounded-full">
                          +{example.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
