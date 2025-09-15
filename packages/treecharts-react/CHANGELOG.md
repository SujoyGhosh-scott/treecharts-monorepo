# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-15-09

### Added

- Auto-scaling container fitting: Charts automatically scale down to fit containers, stay at natural size when containers are larger
- Automatic centering in containers

### Changed

- Moved TypeScript interfaces to separate `types.ts` file
- Cleaned up component code and removed unnecessary comments

## [0.1.0] - 2024-14-09

### Added

- Initial release of TreeCharts React wrapper
- React component with full TypeScript support
- Comprehensive Storybook documentation with examples
- Support for all TreeCharts core features:
  - Multiple visualization types (direct, right-angle, curved, all-direction)
  - Rich node types (regular shapes, node-with-description, collapsible, image)
  - Advanced edge customization (arrows, labels, styling)
  - Chart titles and descriptions
  - Download functionality
  - Flexible alignment and spacing options
- React-specific features:
  - Declarative component interface
  - React hooks integration
  - Event callbacks (onRender, onUpdate)
  - CSS styling support
  - Ref-based programmatic control
- Development tools:
  - Storybook with comprehensive examples
  - TypeScript configuration
  - Build system with tsup
  - Package configuration for npm distribution

### Features

#### Core Component

- `TreeChart` - Main React component wrapping TreeCharts core library
- Full prop interface matching core library options
- React ref support for programmatic control
- Event handling for render and update callbacks

#### Node Types Support

- Regular geometric shapes (rectangle, circle, diamond, hexagon, triangle, pentagon, octagon, star)
- Node with description for enhanced content display
- Collapsible nodes with interactive expand/collapse
- Image nodes for visual organizational charts

#### Visualization Types

- Direct connections for clean, minimal appearance
- Right-angle connections for traditional org charts
- Curved connections for elegant, flowing designs
- All-direction (radial) layout for central-focused diagrams

#### Advanced Features

- Chart titles with flexible positioning and styling
- Download functionality for SVG export
- Edge labels and advanced connection styling
- Flexible alignment and spacing controls
- Professional color themes and styling options

#### Development Experience

- Comprehensive Storybook documentation
- TypeScript support with full type definitions
- Examples for all major use cases
- Real-world implementation showcases

### Documentation

- Complete README with installation and usage instructions
- Storybook stories organized by feature categories:
  1. Core Concepts & Getting Started
  2. Tree Options & Connection Types
  3. Node Types (Regular, Description, Collapsible, Image)
  4. Edge Customization & Styling
  5. Tree Alignment & Layout Options
  6. Advanced Features & Real-World Examples
- TypeScript API documentation
- Migration guide from core library
- Contributing guidelines

### Examples Included

- Corporate organization charts with photos
- Interactive project timelines
- Software architecture diagrams
- Decision tree workflows
- Process flow documentation
- Team structure visualizations
- Product catalogs with images
- Knowledge base hierarchies

[0.1.0]: https://github.com/SujoyGhosh-scott/treecharts-monorepo/releases/tag/treecharts-react-v0.1.0
