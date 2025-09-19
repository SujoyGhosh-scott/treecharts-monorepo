# TreeCharts Monorepo

A comprehensive monorepo for TreeCharts, a flexible tree visualization library with framework adapters and documentation.

## 📋 Quick Links

- **📖 Documentation**: [https://treecharts.netlify.app](https://treecharts.netlify.app)
- **🎯 Examples**: [https://treecharts.netlify.app/examples](https://treecharts.netlify.app/examples)
- **🎮 Playground**: [https://treecharts.netlify.app/playground](https://treecharts.netlify.app/playground)
- **📦 NPM Packages**:
  - Core Library: [treecharts](https://www.npmjs.com/package/treecharts)
  - React Wrapper: [treecharts-react](https://www.npmjs.com/package/treecharts-react)
- **🐛 Issues**: [GitHub Issues](https://github.com/SujoyGhosh-scott/treecharts-monorepo/issues)

## Repository Structure

```
treecharts-monorepo/
├── packages/
│   ├── treecharts/          # Core library (Vanilla JS/TS)
│   └── treecharts-react/    # React wrapper
├── docs/                    # Documentation website (Next.js)
│   ├── src/
│   │   ├── app/            # Next.js app router
│   │   ├── components/     # React components
│   │   ├── data/           # Documentation & examples content
│   │   └── types/          # TypeScript type definitions
│   └── public/
│       ├── docs/           # Documentation images
│       └── examples/       # Example output images
└── turbo.json              # Turborepo configuration
```

## 📚 Documentation Management

The documentation website is built with Next.js and uses a file-based content management system. All content is organized in the `docs/src/data/` directory.

### Content Structure

#### Documentation Content (`docs/src/data/sections/`)

Documentation is organized into sections and topics:

```typescript
// Example: docs/src/data/sections/getting-started.ts
export const gettingStartedSection: DocSection = {
  id: "getting-started",
  title: "Getting Started",
  description: "Learn how to install and use TreeCharts",
  topics: [
    {
      id: "installation",
      title: "Installation",
      description: "How to install TreeCharts in your project",
      path: "/docs/getting-started/installation",
      content: [
        {
          type: "markdown",
          value: "Your markdown content here...",
        },
        {
          type: "code",
          title: "Installation Commands",
          codes: {
            javascript: "npm install treecharts",
            react: "npm install treecharts-react",
          },
        },
      ],
    },
  ],
};
```

#### Examples Content (`docs/src/data/examples/`)

Examples showcase real-world usage:

```typescript
// Example: docs/src/data/examples/family-tree.ts
export const familyTreeExample: Example = {
  title: "Family Tree",
  description: "A genealogical family tree visualization",
  slug: "family-tree",
  tags: ["curved", "regular-nodes"],
  versionUsed: "1.0.0",
  relatedDocs: ["/docs/tree-options/curved"],
  output: "/examples/family-tree.svg",
  code: [
    {
      type: "react",
      files: [
        {
          name: "FamilyTree.tsx",
          code: "// Your React component code here...",
        },
      ],
    },
  ],
};
```

### Adding New Documentation

To add a new documentation section:

1. **Create section file**: `docs/src/data/sections/your-section.ts`
2. **Add to navigation**: Import and add to `docs/src/data/docs.ts`
3. **Add images**: Place in `docs/public/docs/your-section/`
4. **Update sitemap**: Add new paths to `docs/public/sitemap.xml`

### Adding New Examples

To add a new example:

1. **Create example file**: `docs/src/data/examples/your-example.ts`
2. **Add to examples**: Import and add to `docs/src/data/examples.ts`
3. **Add output image**: Place in `docs/public/examples/your-example.svg`
4. **Update sitemap**: Add `/examples/your-slug` to `docs/public/sitemap.xml`

### Content Types

The content system supports multiple content block types:

- **Markdown**: Rich text content with full markdown support
- **Code**: Multi-language code examples with syntax highlighting
- **Image Grid**: Responsive image galleries with configurable layouts

## 🔍 Search Functionality

The documentation includes a powerful site-wide search feature:

### Search Algorithm

The search uses a multi-step ranking algorithm:

1. **Exact matches** - Highest priority for exact title/slug matches
2. **Starts with query** - Secondary priority for titles starting with query
3. **Contains query** - Tertiary priority for partial matches
4. **Content search** - Searches through markdown content blocks
5. **Tag matching** - Matches example tags and metadata

### Search Implementation

- **API Endpoint**: `/api/search?q={query}`
- **Debouncing**: 300ms delay to prevent excessive API calls
- **Result Categories**: Page, Doc, Example (with color-coded icons)
- **Keyboard Navigation**: Ctrl/Cmd+K to open, arrow keys to navigate
- **Real-time Results**: Updates as you type

### Search Sources

The search indexes content from:

- Documentation section titles and descriptions
- Documentation topic titles, descriptions, and content blocks
- Example titles, descriptions, slugs, and tags
- Main page titles and descriptions

## 🖼️ Image Organization

### Documentation Images

Store in `docs/public/docs/` organized by section:

```
docs/public/docs/
├── getting-started/
│   ├── installation-example.png
│   └── basic-usage.svg
├── tree-options/
│   ├── curved-example.svg
│   └── right-angle-example.svg
└── node-types/
    ├── regular-nodes.svg
    └── custom-shapes.png
```

### Example Images

Store example outputs in `docs/public/examples/`:

```
docs/public/examples/
├── family-tree.svg
├── org-chart.svg
├── project-structure.svg
└── tournament-bracket.svg
```

### Image Guidelines

- **SVG preferred** for scalable graphics
- **PNG for screenshots** or complex images
- **Consistent naming** using kebab-case
- **Optimize file sizes** for web performance

## 🗺️ Sitemap Management

**⚠️ Important**: The sitemap (`docs/public/sitemap.xml`) must be manually updated when adding new content.

### Adding Documentation Pages

```xml
<url>
  <loc>https://treecharts.netlify.app/docs/your-section/your-topic</loc>
  <lastmod>2024-01-15T00:00:00.000Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Adding Example Pages

```xml
<url>
  <loc>https://treecharts.netlify.app/examples/your-example-slug</loc>
  <lastmod>2024-01-15T00:00:00.000Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

## Getting Started

### Prerequisites

- Node.js version 18.x or higher (22.x recommended)
- npm version 9.x or higher (10.x recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SujoyGhosh-scott/treecharts-monorepo.git
cd treecharts-monorepo
```

2. Install dependencies:

```bash
npm install
```

3. Build all packages:

```bash
npm run build
```

## Development Workflow

This monorepo uses [Turborepo](https://turbo.build/) to manage the build process across packages.

### Available Commands

From the monorepo root:

- `npm run build`: Build all packages
- `npm run dev`: Start development servers for all packages
- `npm run lint`: Lint all packages
- `npm run clean`: Clean build artifacts across all packages

### Documentation Development

To work on the documentation website:

```bash
cd docs
npm run dev
```

The documentation site will be available at **http://localhost:3000/**

### Core Library Development

To develop the core TreeCharts library:

```bash
cd packages/treecharts
npm run dev
```

The development server will be available at **http://localhost:5173/**

### React Wrapper Development

For React wrapper development:

```bash
# Terminal 1: Watch core library changes
cd packages/treecharts
npm run dev:watch

# Terminal 2: Start React wrapper development
cd packages/treecharts-react
npm run storybook
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Ensure all packages build successfully before submitting PR
- Add appropriate TypeScript types
- Update documentation for new features
- Follow the existing code style
- Update sitemap when adding new documentation or examples

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Built With

- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Next.js](https://nextjs.org/) - Documentation website
- [Turborepo](https://turbo.build/) - Monorepo management
- [DaisyUI](https://daisyui.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [tsup](https://tsup.egoist.dev/) - Package building
- [Vite](https://vitejs.dev/) - Development server
