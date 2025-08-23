# TreeCharts Documentation

This is the documentation website for TreeCharts - a powerful and flexible library for creating beautiful tree visualizations.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library built on Tailwind
- **Static Site Generation** - Pre-rendered pages for better SEO

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── docs/           # Documentation pages
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # React components
│   ├── docs/          # Documentation-specific components
│   ├── Header.tsx     # Site header
│   ├── Hero.tsx       # Landing page hero
│   ├── Features.tsx   # Features section
│   └── Footer.tsx     # Site footer
├── data/              # Static data
│   └── docs.ts        # Documentation content and navigation
└── globals.css        # Global styles
```

## Documentation Content

The documentation content is managed in `src/data/docs.ts`. This file contains:

- **Navigation structure** - Organized sections and topics
- **Content** - Markdown-like content for each topic
- **Metadata** - Titles, descriptions, and paths
- **Helper functions** - For navigation and content retrieval

## Adding New Documentation

To add new documentation:

1. Add new sections/topics to `src/data/docs.ts`
2. Create corresponding page files in `src/app/docs/`
3. The sidebar navigation will automatically update

## Deployment

The site is configured for static export and can be deployed to any static hosting service:

```bash
npm run build
```

This generates a static site in the `out/` directory.

## Features

- ✅ Static site generation for better SEO
- ✅ Responsive design with mobile sidebar
- ✅ Dark/light theme support
- ✅ Documentation navigation with previous/next links
- ✅ Search-friendly URLs
- ✅ robots.txt and SEO meta tags
- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Markdown content support

## License

MIT
