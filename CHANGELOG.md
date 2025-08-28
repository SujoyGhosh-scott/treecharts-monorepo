# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2025-08-30

### Fixed

- **Shadow Rendering Issues**: Resolved critical shadow rendering problems that caused visual corruption
  - Fixed duplicate shadow elements creating multiple overlapping black shapes
  - Corrected shadow opacity handling for both solid colors and rgba values
  - Removed unwanted borders from shadow elements for proper drop shadow appearance
  - Eliminated triple rendering layers causing text and node duplication
- **Node Rendering Architecture**: Fixed fundamental rendering pipeline issues
  - Resolved duplicate appendChild calls between NodeDrawer and dedicated renderer classes
  - Fixed shadow elements being added twice to SVG (once by NodeDrawer, once by renderers)
  - Corrected text elements being rendered multiple times for rectangle and circle nodes
  - Streamlined rendering flow to use dedicated renderer classes properly without duplication
- **Gradient Rendering**: Fixed gradient styling not being applied to nodes
  - Resolved issue where gradient fill was being overwritten by solid color fill
  - Gradients now display correctly when enabled with proper color transitions
- **Custom Shape Support**: Fixed custom SVG path shapes not rendering correctly
  - Fixed customAttributes not being passed from renderers to NodeDrawer
  - Fixed custom shape positioning - shapes now render at correct node positions instead of origin (0,0)
  - Custom shapes with SVG paths now work properly across all renderer types
- **Right-Angle Arrow Positioning**: Fixed arrows appearing on incorrect segments in right-angle connections
  - Fixed "source-to-target" arrows appearing on horizontal segments instead of final vertical segments
  - Fixed "target-to-source" arrows appearing on all segments instead of only initial vertical segments
  - Arrows now correctly target the appropriate connection segments based on direction
  - Both arrow directions now work correctly for all right-angle connection types

## [0.3.0] - 2025-08-20

### Added

- **Strategy Pattern Architecture**: Complete refactoring from monolithic to pluggable renderer system
  - BaseNodeRenderer with centralized common functionality (342 lines)
  - Individual renderer classes with focused responsibilities
  - 44% size reduction in main NodeDrawer (1,217 → 677 lines)
  - Eliminated 140+ lines of code duplication across renderers
- **Node with Description**: Revolutionary new node type that displays both a main value and descriptive text
  - Automatic text wrapping for long descriptions
  - Dynamic node sizing based on content length
  - Intelligent layout adjustment to prevent overlapping
  - Bold main text with smaller, gray description text
  - Maximum width constraints to maintain clean layouts
- **Collapsible Nodes**: Interactive accordion-style nodes with expand/collapse functionality
  - Click-to-expand descriptions for cleaner initial layouts
  - Expand/collapse buttons with intuitive arrow indicators (▼ collapsed, ▲ expanded)
  - Smart layout recalculation when nodes are expanded or collapsed
  - Preserves tree structure while providing on-demand detail access
  - Ideal for organizational charts, process flows, and hierarchical data with optional details
- **Image Nodes**: Rich visual nodes with customizable images, titles, and descriptions
  - Support for any image URL with smart loading and error handling
  - Optional title and subtitle text with independent styling control
  - Configurable text positioning (above, below, left, right of image)
  - Dynamic sizing based on image dimensions and text content
  - Image borders, opacity, and background color customization
  - Typography control with alignment options for titles and subtitles
- **Dynamic Height Calculation**: Smart vertical spacing system that adjusts for variable node heights
  - Level-by-level height calculation for optimal spacing
  - Automatic vertical gap adjustment for taller nodes
  - Prevents edge overlap issues with varying node sizes

### Fixed

- **Architecture Maintainability**: Resolved monolithic class structure preventing easy extension
- **Code Duplication**: Eliminated duplicated methods across node renderers

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
