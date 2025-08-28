# Changelog - TreeCharts Core

## [0.4.0] - 2025-08-30

### 🐛 Critical Bug Fixes

#### Fixed

- **Shadow Rendering Issues**: Resolved critical visual corruption when shadows were enabled
  - Fixed duplicate shadow elements creating overlapping black shapes that obscured content
  - Corrected shadow styling to appear as proper drop shadows instead of solid rectangles
  - Fixed double opacity application when using rgba color values
- **Node Duplication**: Eliminated triple rendering layers causing each node to appear 3 times
  - Resolved duplicate appendChild calls between NodeDrawer and renderer classes
  - Fixed text and shadow elements being added multiple times to SVG
  - Streamlined rendering pipeline to ensure each node renders exactly once
- **Gradient Rendering**: Fixed gradient styling not being applied to rectangle nodes
  - Resolved issue where applyCommonStyling was overwriting gradient fill with solid color
  - Gradients now display correctly with proper color transitions from start to end colors
- **Custom Shape Support**: Fixed custom SVG path shapes not rendering correctly
  - Fixed customAttributes property not being passed from NodeFactory and AllDirectionRenderer to NodeDrawer
  - Added missing customAttributes parameter to all drawNode method calls
  - Fixed custom shape positioning by adding proper transform translation to node coordinates
  - Custom shapes with SVG paths now render at correct positions instead of appearing at origin (0,0)
  - Enhanced createCustomShape method to apply node positioning transformation
- **Right-Angle Arrow Positioning**: Fixed arrows appearing on incorrect segments in right-angle connections
  - Fixed "source-to-target" arrows appearing on horizontal segments instead of final vertical segments connecting to target nodes
  - Fixed "target-to-source" arrows appearing on all segments instead of only the initial vertical segments from parent nodes
  - Implemented proper arrow segment control in RightAngleRenderer by conditionally applying arrows based on direction
  - Arrows now correctly appear on the 3rd segment (horizontal-to-child) for "source-to-target" direction
  - Arrows now correctly appear on the 1st segment (parent-to-horizontal) for "target-to-source" direction
  - Both "source-to-target" and "target-to-source" directions now work correctly for all right-angle connection scenarios
  - Fixed applies to both multiple children connections and single child with alternating offset connections
- **EdgeConfig Cleanup**: Removed unused `type` property from EdgeConfig interface
  - Removed redundant `type` property that was duplicating the main TreeChart type configuration
  - Connection types are now determined solely by the renderer (DirectRenderer → "direct", RightAngleRenderer → "right-angle", etc.)
  - Simplified EdgeConfig interface to focus only on actual edge styling properties (color, width, dasharray, arrows, etc.)
  - Updated type definitions, constants, and examples to remove the unused property
- **ConnectionDrawer Optimization**: Cleaned up unused method parameters and improved curve rendering
  - Removed unused `options` parameter from `createDirectConnection` and `createRightAngleConnection` methods
  - Removed unused `fromPoint` and `toPoint` parameters from `addArrow` method (arrows use SVG markers, not coordinates)
  - Enhanced `createCurvedConnection` to properly utilize the `curveRadius` parameter for controlling curve intensity
  - Simplified method signatures to only include required parameters, improving code maintainability
  - All renderer calls verified and updated to use correct parameter counts

#### Removed

- **Icon Support**: Removed redundant icon functionality from node options
  - Removed `icon`, `iconSize`, and `iconColor` properties from NodeConfig and NodeOptions interfaces
  - Removed icon creation logic from NodeDrawer class
  - Removed icon support example from documentation
  - Use dedicated image nodes (`type: "image"`) for visual elements instead

This release resolves visual corruption issues that made shadow-enabled charts unusable.

## [0.3.0] - 2025-08-20

### 🚀 Advanced Node Types & Architecture Overhaul

#### Added

- **Strategy Pattern Architecture**: Complete refactoring from monolithic to pluggable renderer system:

  - **BaseNodeRenderer**: Centralized common functionality (342 lines) with shared methods for all node types
  - **Individual Renderer Classes**: Focused, single-responsibility renderers for each node type
  - **NodeRenderer Interface**: Standardized contract for all node renderers ensuring consistency
  - **Factory Pattern**: NodeDrawer acts as coordinator, delegating to appropriate renderers
  - **44% Size Reduction**: Main NodeDrawer reduced from 1,217 lines to 677 lines through systematic refactoring
  - **Eliminated Code Duplication**: Removed 140+ lines of duplicated code across renderers

- **Specialized Node Renderers**: Clean, focused implementations:

  - **RectangleNodeRenderer** (42 lines): Streamlined rectangle rendering with shadow and gradient support
  - **CircleNodeRenderer** (85 lines): Optimized circular node handling with proper centering
  - **ImageNodeRenderer** (180+ lines): Complete image node rendering with flexible positioning and styling
  - **NodeWithDescriptionRenderer** (261 lines): Auto-sizing nodes with descriptions and smart text wrapping
  - **CollapsibleNodeRenderer** (363 lines): Interactive expandable nodes with state management

- **Node with Description Type**: Revolutionary new node type for displaying structured information:

  - **Main Text + Description**: Display both a primary value and detailed description in a single node
  - **Smart Text Wrapping**: Automatic text wrapping for long descriptions with configurable maximum width
  - **Dynamic Sizing**: Nodes automatically resize based on content length and description complexity
  - **Intelligent Typography**: Bold main text with smaller, gray description text for clear hierarchy
  - **Layout Preservation**: Maximum width constraints prevent nodes from becoming too wide and disrupting chart flow

  ```javascript
  const treeData = {
    value: "Engineering",
    description:
      "Software development and R&D teams responsible for product innovation",
    nodeConfig: { type: "node-with-description" },
  ```

- **Collapsible Node Type**: Interactive accordion-style nodes with expand/collapse functionality:

  - **Click-to-Expand**: Toggle node descriptions on demand for cleaner initial layouts
  - **Interactive Controls**: Intuitive expand/collapse buttons with arrow indicators (▼ collapsed, ▲ expanded)
  - **Dynamic Layout**: Smart chart recalculation when nodes are expanded or collapsed
  - **State Management**: Preserves expansion state during tree interactions
  - **Hierarchical Detail**: Perfect for organizational charts and process flows with optional context

  ```javascript
  const treeData = {
    value: "Company Overview",
    description:
      "Global technology corporation specializing in software development",
    collapsibleState: { expanded: false },
    nodeConfig: { type: "collapsible-node" },
    child: [
      {
        value: "Engineering",
        description: "Software development and R&D teams",
        collapsibleState: { expanded: false },
        nodeConfig: { type: "collapsible-node" },
        child: [],
      },
    ],
  };
  ```

- **Image Node Type**: Rich visual nodes with customizable images, titles, and descriptions:

  - **Flexible Image Display**: Support for any image URL with smart loading and error handling
  - **Title and Subtitle Support**: Optional title and subtitle text with independent styling control
  - **Configurable Text Positioning**: Position text above, below, left, or right of the image
  - **Dynamic Sizing**: Automatic node sizing based on image dimensions and text content
  - **Smart Layout Adaptation**: Image margins, padding, and spacing automatically adjust for optimal appearance
  - **Border and Styling**: Customizable image borders, opacity, and background colors
  - **Typography Control**: Independent font configuration for titles and subtitles with alignment options

  ```javascript
  const treeData = {
    value: "Team Member",
    nodeConfig: {
      type: "image",
      imageUrl: "https://example.com/profile.jpg",
      title: "John Smith",
      subtitle: "Senior Developer",
      imageTextPositionConfig: { position: "bottom" },
    },
    child: [],
  };
  ```

- **Code Quality Improvements**: Clean, maintainable codebase:
  - Consistent error handling patterns across all renderers
  - Proper TypeScript typing with interface segregation
  - Clean separation between public API types and internal renderer types
  - Eliminated anti-patterns and technical debt

#### Fixed

- **Architecture Maintainability**: Resolved monolithic class structure preventing easy extension
- **Code Duplication**: Eliminated 140+ lines of duplicated methods across node renderers
- **File Organization**: Cleaned up duplicate NodeDrawer files and consolidated common functionality

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
