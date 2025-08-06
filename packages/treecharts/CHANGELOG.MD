# Changelog - TreeCharts Core

## [0.2.0] - 2025-08-10

### 🚀 Major Feature Release - Architecture Redesign

#### Added

- **Action Button System**: Interactive chart actions with customizable positioning:
  - Download button for exporting charts as SVG files
  - Configurable positioning: top-left, top-right, bottom-left, bottom-right
  - Customizable filename for downloaded files
  - Subtle design that doesn't interfere with chart focus
  - Easy to enable/disable via actionConfig.download.enabled
- **NodeDrawer Class**: Dedicated node management system supporting multiple node shapes:
  - Rectangle (default), Circle, Diamond, Hexagon, Triangle, Pentagon, Octagon, Star, Custom
  - Advanced styling: gradients, shadows, border radius, opacity
  - Improved text positioning with proper vertical centering
- **Per-Node Styling System**: Revolutionary node-level customization feature:
  - Individual nodes can override default styling via node-level `nodeConfig`
  - Supports all nodeConfig properties: color, type, size, fonts, borders, etc.
  - Selective styling - only specified nodes get custom appearance
  - Full compatibility across all chart types (direct, right-angle, curved, all-direction)
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

- **Right Angle Tree Chart**: Fixed overlapping horizontal connector lines when multiple parents have children at the same level by implementing alternating offset positioning
- **All Direction Chart Overflow**: Fixed scrolling and viewport overflow problems in radial layouts
- **Text Vertical Centering**: Improved text positioning within nodes using proper SVG baseline alignment
- **Edge Connection Points**: Enhanced connection point calculations for different node shapes
- **Type Safety**: Resolved TypeScript compilation issues with new structured options

#### Changed

- **Breaking Change**: Completely migrated to structured `nodeConfig`/`edgeConfig` format (removed legacy flat options)
- **Class-based Architecture**: Refactored from helper functions to dedicated manager classes
- **Improved Performance**: Optimized rendering pipeline with dedicated drawing classes
- **Enhanced Type Definitions**: Better TypeScript support with comprehensive interface definitions
- **Documentation Overhaul**: Complete rewrite of documentation with structured examples

#### Migration Guide

**Old format (no longer supported):**

```javascript
const chart = new TreeChart("container", {
  nodeColor: "#87CEEB",
  lineColor: "#333",
  boxWidth: 100,
  boxHeight: 50,
});
```

**New format (v0.2+):**

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

**Per-Node Styling (NEW in v0.2):**

```javascript
const treeData = {
  value: "Root",
  child: [
    {
      value: "Child1",
      nodeConfig: {
        color: "#FFB6C1", // Custom pink background
        type: "circle", // Custom circle shape
      },
      child: [],
    },
    {
      value: "Child2",
      nodeConfig: {
        color: "#98FB98", // Custom green background
        fontSize: 16, // Custom font size
        fontColor: "#8B4513", // Custom font color
      },
      child: [],
    },
  ],
};
```

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
