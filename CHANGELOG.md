# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2025-08-20

### Added

- **Node with Description**: Revolutionary new node type that displays both a main value and descriptive text
  - Automatic text wrapping for long descriptions
  - Dynamic node sizing based on content length
  - Intelligent layout adjustment to prevent overlapping
  - Bold main text with smaller, gray description text
  - Maximum width constraints to maintain clean layouts
- **Dynamic Height Calculation**: Smart vertical spacing system that adjusts for variable node heights
  - Level-by-level height calculation for optimal spacing
  - Automatic vertical gap adjustment for taller nodes
  - Prevents edge overlap issues with varying node sizes

## [0.2.0] - 2025-08-10

### Added

- **Action Button System**: Interactive chart controls with download functionality
  - Download button to export charts as SVG files
  - Configurable button positioning (top-left, top-right, bottom-left, bottom-right)
  - Custom filename support for downloads
  - Subtle, non-intrusive design
- **NodeDrawer Class**: Common node manager supporting multiple node shapes (rectangle, circle, diamond, hexagon, triangle, pentagon, octagon, star)
- **ConnectionDrawer Class**: Common edge manager with advanced styling capabilities
- **Structured Options Format**: Introduced `nodeConfig` and `edgeConfig` for better organization
- **Per-Node Styling**: Individual nodes can now have custom styling via node-level `nodeConfig`
  - Override colors, shapes, sizes, fonts, and other properties per node
  - Selective styling - only specified nodes get custom styling
  - Works across all chart types (direct, right-angle, curved, all-direction)
- **Advanced Node Styling**: Gradients, shadows, border radius, opacity, and custom styling options
- **Directed Edges**: Added arrow support with configurable direction (source-to-target, target-to-source, both)
- **Edge Labels**: Support for text labels on connections with styling options
- **Chart Titles and Subtitles**: Added support for chart titles with custom positioning
- **Enhanced Edge Types**: Multiple edge styling options including dashed lines, custom colors, and variable widths

### Fixed

- **Right Angle Chart Alignment**: Fixed misalignment issues with child nodes in right-angle layouts
- **Right Angle Tree Chart**: Fixed child node connector edges overlapping issue
- **All Direction Chart Overflow**: Resolved scrolling and overflow issues in radial layouts

### Changed

- **Breaking Change**: Migrated from flat options to structured `nodeConfig`/`edgeConfig` format
- **Improved Type Safety**: Enhanced TypeScript support with better type definitions
- **Better Documentation**: Comprehensive README with examples for all features

## [0.1.0] - 2025-04-27

### Added

- Initial monorepo setup with Turborepo
- Implemented class-based architecture
- Core TreeCharts library with TypeScript support
- Four visualization types: direct, right-angle, curved, and all-direction
- Development environment for the core library
- Basic documentation
- Basic README and CHANGELOG setup
