export default function Features() {
  const features = [
    {
      title: "Multiple Tree Types",
      description:
        "Support for direct connection, right-angle, curved edges, and all-direction trees",
      icon: "🌳",
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
      icon: "📦",
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
      icon: "🎨",
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
                  <div className="flex-shrink-0">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
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
                      npm install @treecharts/react
                    </code>
                  </pre>
                  <pre data-prefix="$" className="text-base-content">
                    <code className="text-base-content">
                      npm install @treecharts/angular
                    </code>
                  </pre>
                  <pre data-prefix="$" className="text-base-content">
                    <code className="text-base-content">
                      npm install @treecharts/vue
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
