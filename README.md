# TreeCharts Monorepo

A monorepo for TreeCharts, a flexible tree visualization library and its framework adapters.

## Repository Structure

This monorepo contains the following packages:

- `packages/treecharts`: Core tree visualization library
- `packages/react-treecharts`: React wrapper for TreeCharts (planned)
- `packages/angular-treecharts`: Angular wrapper for TreeCharts (planned)
- `packages/vue-treecharts`: Vue wrapper for TreeCharts (planned)
- `apps/docs`: Documentation website (planned)

## Getting Started

### Prerequisites

- Node.js version 22.x or higher
- npm version 10.x or higher

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

This monorepo uses [Turborepo](https://turbo.build/) to manage the build process across packages.

### Commands

- `npm run build`: Build all packages
- `npm run dev`: Start development servers for all packages
- `npm run lint`: Lint all packages
- `npm run clean`: Clean build artifacts

### Working on the core library

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

## Core Features

The TreeCharts library offers several visualization styles:

- **Direct Connections**: Simple straight-line connections between nodes
- **Right Angle Connections**: Tree structure with right angle lines
- **Curved Connections**: Tree structure with smooth curved connections
- **All Direction**: Radial layout with nodes spreading in all directions

Each chart type can be customized with various options for colors, dimensions, and layout.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
