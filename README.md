# TreeCharts Monorepo

A monorepo for TreeCharts, a flexible tree visualization library and its framework adapters.

## Repository Structure

This monorepo contains the following packages:

- `packages/treecharts`: Core tree visualization library (✅ Complete)
- `packages/treecharts-react`: React wrapper for TreeCharts (🚧 In Development)
- `packages/treecharts-angular`: Angular wrapper for TreeCharts (📋 Planned)
- `packages/treecharts-vue`: Vue wrapper for TreeCharts (📋 Planned)
- `apps/docs`: Documentation website (📋 Planned)

## Getting Started

### Prerequisites

- Node.js version 18.x or higher (22.x recommended)
- npm version 9.x or higher (10.x recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/treecharts-monorepo.git
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

This monorepo uses [Turborepo](https://turbo.build/) to manage the build process across packages. The workspace setup automatically links local packages together during development.

### Available Commands

From the monorepo root:

- `npm run build`: Build all packages
- `npm run dev`: Start development servers for all packages
- `npm run lint`: Lint all packages
- `npm run clean`: Clean build artifacts across all packages

### Working on the Core Library

To develop the core TreeCharts library:

```bash
cd packages/treecharts
npm run dev:watch
```

This will start a development server with hot-reloading. The server will be available at:

**🌐 http://localhost:5173/**

**Important**: Make sure to access the development page through the Vite server URL (`http://localhost:5173/`) rather than opening the HTML file directly in your browser. Opening the file directly (`file://`) will prevent the JavaScript modules from loading properly due to CORS restrictions.

The development page includes:

- Interactive controls for testing different chart configurations
- Live examples of all four visualization types
- Hot-reloading when you make changes to the source code

### Working on Framework Wrappers

#### React Wrapper Development

The React wrapper uses Storybook for development. To work on it:

```bash
# Terminal 1: Watch and rebuild core library on changes
cd packages/treecharts
npm run dev:watch

# Terminal 2: Start Storybook for React wrapper
cd packages/treecharts-react
npm run storybook
```

Storybook will open at **http://localhost:6006/** with interactive examples and documentation.

### Complete Development Setup (For New Contributors)

If you're setting up the development environment for the first time:

```bash
# 1. Clone and setup monorepo
git clone https://github.com/your-username/treecharts-monorepo.git
cd treecharts-monorepo
npm install

# 2. Build core library first
cd packages/treecharts
npm run build

# 3. For React wrapper development
cd ../treecharts-react
npm install  # This creates symlinks to local packages
npm run storybook

# 4. Verify the symlink was created
ls -la node_modules/ | grep treecharts
# Should show: treecharts -> ../../treecharts
```

### How Workspace Linking Works

During development, the monorepo uses npm workspaces to link packages:

- Changes in `packages/treecharts` are immediately available in `packages/treecharts-react`
- No need to publish or rebuild to test integration between packages
- The `"treecharts": "workspace:*"` dependency automatically resolves to your local version

## Publishing Workflow

The packages are published independently to npm:

1. **Core Library**: Published as `treecharts`
2. **React Wrapper**: Published as `treecharts-react`
3. **Angular Wrapper**: Will be published as `treecharts-angular`
4. **Vue Wrapper**: Will be published as `treecharts-vue`

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

## Acknowledgments

Built with:

- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Turborepo](https://turbo.build/) for monorepo management
- [tsup](https://tsup.egoist.dev/) for building
- [Vite](https://vitejs.dev/) for development
- [Storybook](https://storybook.js.org/) for component development
