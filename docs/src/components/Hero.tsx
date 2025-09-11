import Link from "next/link";
import GameOfLifeVisualization from "../components/GameOfLifeVisualization";
import TreeChartsAnimation from "../components/TreeChartsAnimation";

export default function Hero() {
  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
      {/* Game of Life Background - Right half on desktop, full width on mobile */}
      <div className="absolute inset-y-0 right-0 left-0 lg:left-1/2">
        <GameOfLifeVisualization
          cellSize={40}
          updateInterval={350}
          initialDensity={0.15}
          liveCellOpacity={0.08}
          cellColor="34, 197, 94"
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-24 xl:px-32 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6">
              Beautiful <span className="text-primary">Tree</span>{" "}
              <span className="text-[#08CB00]">Visualizations</span>
              <br />
              for the Web
            </h1>

            <p className="text-lg md:text-xl mb-8 text-base-content/80">
              A highly customizable and lightweight library for creating
              stunning tree visualizations in React and vanilla JavaScript.
              Perfect for family trees, organizational charts, decision trees,
              and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Link
                href="/docs"
                className="btn btn-primary rounded-full btn-wide"
              >
                Get Started
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              {/* <Link
                href="/playground"
                className="btn btn-secondary rounded-full px-6"
              >
                Try Playground
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4V8a3 3 0 616 0v2M3 18v-6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
              </Link> */}
            </div>

            {/* Framework Support */}
            <div className="text-center lg:text-left">
              <p className="text-base font-semibold mb-4 text-base-content/70 font-macondo">
                Works with your favorite framework
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">⚛️</span>
                  <span className="text-sm font-medium">React</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">🟨</span>
                  <span className="text-sm font-medium">JavaScript</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">🔷</span>
                  <span className="text-sm font-medium">TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - TreeCharts Animation (layered on top of GameOfLife) */}
          <div className="flex items-center justify-center h-[400px] lg:h-[400px] relative z-20 w-full -ml-4 lg:ml-0">
            <TreeChartsAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
