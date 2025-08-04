# Changelog - TreeCharts Core

## [0.2.0] - 2025-08-10

### 🚀 Major Feature Release - Architecture Redesign

#### Added

- **NodeDrawer Class**: Dedicated node management system supporting multiple node shapes:
  - Rectangle (default), Circle, Diamond, Hexagon, Triangle, Pentagon, Octagon, Star, Custom
  - Advanced styling: gradients, shadows, border radius, opacity
  - Improved text positioning with proper vertical centering
- **ConnectionDrawer Class**: Dedicated edge management system with:
  - Multiple connection types (direct, right-angle, curved, custom)
  - Advanced styling options (colors, widths, dash patterns)
  - Arrow support with configurable directions
  - Edge text labels with custom positioning and styling
- **Structured Options Format**: New organized configuration system:
  ```javascript
  {
    nodeConfig: { /* node-specific options */ },
    edgeConfig: { /* edge-specific options */ }
  }
  ```
- **Chart Titles and Subtitles**:
  - Support for chart titles with custom positioning
  - Configurable subtitle support
  - Flexible text styling options
  - **NEW**: TitleDrawer class for dedicated title rendering
  - **NEW**: Horizontal positioning (left, center, right) with center as default
  - **NEW**: Vertical positioning (top, bottom) with top as default
  - **NEW**: Complete TitleConfig interface with styling options
- **Directed Graph Support**:
  - Arrow indicators for directional relationships
  - Configurable arrow directions (source-to-target, target-to-source, both)
  - Custom arrow sizes and colors
- **Enhanced Edge Features**:
  - Text labels on edges with background styling
  - Dashed and dotted line patterns
  - Variable edge widths and colors
  - Curved edge radius control

#### Fixed

- **Right Angle Chart Alignment**: Resolved child node misalignment issues in hierarchical layouts
- **All Direction Chart Overflow**: Fixed scrolling and viewport overflow problems in radial layouts
- **Text Vertical Centering**: Improved text positioning within nodes using proper SVG baseline alignment
- **Edge Connection Points**: Enhanced connection point calculations for different node shapes
- **Type Safety**: Resolved TypeScript compilation issues with new structured options

#### Changed

- **Breaking Change**: Migrated from flat options structure to nested `nodeConfig`/`edgeConfig` format
- **Class-based Architecture**: Refactored from helper functions to dedicated manager classes
- **Improved Performance**: Optimized rendering pipeline with dedicated drawing classes
- **Enhanced Type Definitions**: Better TypeScript support with comprehensive interface definitions
- **Documentation Overhaul**: Complete rewrite of documentation with structured examples

#### Migration Guide

**Before (v0.1):**

```javascript
const chart = new TreeChart("container", {
  nodeColor: "#87CEEB",
  lineColor: "#333",
  boxWidth: 100,
  boxHeight: 50,
});
```

**After (v0.2):**

```javascript
const chart = new TreeChart("container", {
  nodeConfig: {
    color: "#87CEEB",
    width: 100,
    height: 50,
  },
  edgeConfig: {
    color: "#333",
  },
});
```

_Note: Backward compatibility is maintained for legacy options._

## [0.1.0] - 2025-04-27

### Added

- Initial implementation of TreeCharts library
- Four visualization types:
  - Direct connections between nodes
  - Right-angle connections with horizontal and vertical lines
  - Curved connections with bezier curves
  - All-direction (radial) layout
- Customization options for:
  - Node dimensions (width, height)
  - Node styling (color, border)
  - Line styling (color)
  - Layout alignment (vertical, horizontal)
  - Text styling (font size, color)
- TypeScript support with full type definitions
- Development environment with interactive examples
