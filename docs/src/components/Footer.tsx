import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    Documentation: [
      { name: "Getting Started", href: "/docs" },
      { name: "Core Concepts", href: "/docs/core-concepts" },
      { name: "Tree Types", href: "/docs/tree-types" },
      { name: "Node Types", href: "/docs/node-types" },
      { name: "Customization", href: "/docs/customization" },
    ],
    Resources: [
      { name: "Examples", href: "/examples" },
      { name: "Playground", href: "/playground" },
      { name: "Blog", href: "/blog" },
      { name: "Changelog", href: "/changelog" },
      {
        name: "GitHub",
        href: "https://github.com/SujoyGhosh-scott/treecharts-monorepo",
      },
    ],
    Community: [
      {
        name: "GitHub Discussions",
        href: "https://github.com/SujoyGhosh-scott/treecharts-monorepo/discussions",
      },
      {
        name: "Issues",
        href: "https://github.com/SujoyGhosh-scott/treecharts-monorepo/issues",
      },
      { name: "Contributing", href: "/contributing" },
      { name: "Code of Conduct", href: "/code-of-conduct" },
      { name: "Contact Us", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-base-300 text-base-content">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold mb-3 block">
              <span className="text-primary">Tree</span>
              <span className="text-secondary">Charts</span>
            </Link>
            <p className="text-base-content/70 mb-4 text-sm">
              Beautiful tree visualizations for modern web applications.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/SujoyGhosh-scott/treecharts-monorepo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/treecharts"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, categoryLinks]) => (
            <div key={category}>
              <h3 className="font-semibold text-base mb-3">{category}</h3>
              <ul className="space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base-content/70 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-base-content/70 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base-content/60 text-sm">
            © {currentYear} TreeCharts. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-base-content/60">
            <span>Made with ❤️ by the TreeCharts team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
