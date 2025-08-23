import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Beautiful <span className="text-primary">Tree</span>{" "}
              <span className="text-secondary">Visualizations</span>
              <br />
              for the Web
            </h1>

            <p className="text-lg md:text-xl mb-8 text-base-content/80">
              A powerful and flexible library for creating stunning tree
              visualizations in React, Angular, Vue, and vanilla JavaScript.
              Perfect for family trees, organizational charts, decision trees,
              and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Link href="/docs" className="btn btn-primary btn-lg">
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

              <Link href="/playground" className="btn btn-outline btn-lg">
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
              </Link>
            </div>

            {/* Framework Support */}
            <div className="text-center lg:text-left">
              <p className="text-base font-semibold mb-4 text-base-content/70">
                Works with your favorite framework
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">⚛️</span>
                  <span className="text-sm font-medium">React</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">🅰️</span>
                  <span className="text-sm font-medium">Angular</span>
                </div>
                <div className="flex items-center gap-2 text-base-content/60">
                  <span className="text-xl">💚</span>
                  <span className="text-sm font-medium">Vue</span>
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

          {/* Right Column - Visual/Image Space */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg h-96 bg-base-200 rounded-lg flex items-center justify-center border-2 border-dashed border-base-300">
              <div className="text-center text-base-content/50">
                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm">Tree Visualization Preview</p>
                <p className="text-xs mt-1">(GIF/Animation Coming Soon)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
