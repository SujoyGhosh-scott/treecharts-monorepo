# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-08-10

### Added

- **Major Architecture Redesign**: Implemented class-based architecture with dedicated managers
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
- **All Direction Chart Overflow**: Resolved scrolling and overflow issues in radial layouts
- **Text Vertical Centering**: Improved text positioning within nodes

### Changed

- **Breaking Change**: Migrated from flat options to structured `nodeConfig`/`edgeConfig` format
- **Improved Type Safety**: Enhanced TypeScript support with better type definitions
- **Better Documentation**: Comprehensive README with examples for all features

## [0.1.0] - 2025-04-27

### Added

- Initial monorepo setup with Turborepo
- Core TreeCharts library with TypeScript support
- Four visualization types: direct, right-angle, curved, and all-direction
- Development environment for the core library
- Basic documentation
- Basic README and CHANGELOG setup
