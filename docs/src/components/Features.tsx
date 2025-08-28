export default function Features() {
  const features = [
    {
      title: "Multiple Tree Types",
      description:
        "Support for direct connection, right-angle, curved edges, and all-direction trees",
      icon: (
        <svg
          className="w-8 h-8 text-base-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      items: [
        "Direct Connection Trees",
        "Right Angle Trees",
        "Curved Edge Trees",
        "All Direction Trees",
        "Family Trees (Coming Soon)",
      ],
    },
    {
      title: "Flexible Node Types",
      description:
        "Various node shapes and styles to fit your visualization needs",
      icon: (
        <svg
          className="w-8 h-8 text-base-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
      items: [
        "Regular Nodes",
        "Custom Shape Nodes",
        "Nodes with Descriptions",
        "Collapsible Nodes",
        "Image Nodes",
      ],
    },
    {
      title: "Extensive Customization",
      description: "Customize every aspect of your tree visualization",
      icon: (
        <svg
          className="w-8 h-8 text-base-content"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
          />
        </svg>
      ),
      items: [
        "Tree Titles",
        "Action Buttons",
        "Edge Customization",
        "Tree Orientation",
        "Themes & Colors",
      ],
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need for{" "}
            <span className="text-primary">Tree Visualizations</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            TreeCharts provides a comprehensive set of features to create
            beautiful, interactive tree visualizations for any use case.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="card-body">
                <div className="flex gap-4 mb-4">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-base-content/70 text-sm mb-4">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <span className="text-primary text-sm">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="text-center mt-16">
          <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 max-w-4xl mx-auto">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-base mb-6 text-base-content/80">
                Install TreeCharts in your project and start building beautiful
                tree visualizations in minutes.
              </p>

              <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                <div className="mockup-code bg-base-300 border border-base-content/20 text-left">
                  <pre data-prefix="$" className="text-base-content">
                    <code className="text-base-content">
                      npm install treecharts
                    </code>
                  </pre>
                  <pre data-prefix="$" className="text-base-content">
                    <code className="text-base-content">
                      npm install treecharts-react
                    </code>
                  </pre>
                </div>

                <div className="flex flex-col gap-4">
                  <a href="/docs" className="btn btn-primary btn-lg">
                    View Documentation
                  </a>
                  <a href="/examples" className="btn btn-outline btn-lg">
                    Browse Examples
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
