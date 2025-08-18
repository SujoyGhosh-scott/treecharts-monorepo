import { NodeDrawer } from "./NodeDrawer";
import { getNodeKey } from "./svgHelpers";
import { TreeLayout, NodeLayoutPosition, NodeMapEntry } from "../types";

export class NodeFactory {
  constructor(
    private nodeDrawer: NodeDrawer,
    private onTreeUpdate?: () => void
  ) {}

  /**
   * Create all nodes from the calculated layout
   */
  public createNodesFromLayout(
    layout: TreeLayout
  ): Record<string, NodeMapEntry> {
    const nodeMap: Record<string, NodeMapEntry> = {};

    layout.levels.forEach((level) => {
      level.nodes.forEach((nodePosition) => {
        const nodeResult = this.createSingleNode(nodePosition);
        const nodeKey = getNodeKey(level.levelIndex, nodePosition.nodeIndex);

        nodeMap[nodeKey] = {
          x: nodeResult.bounds.x,
          y: nodeResult.bounds.y,
          centerX: nodeResult.centerX,
          centerY: nodeResult.centerY,
          width: nodeResult.bounds.width,
          height: nodeResult.bounds.height,
          bottomY: nodeResult.bounds.y + nodeResult.bounds.height,
          topY: nodeResult.bounds.y,
          node: nodePosition.node,
        };
      });
    });

    return nodeMap;
  }

  /**
   * Create a single node with the given position and configuration
   */
  private createSingleNode(nodePosition: NodeLayoutPosition) {
    const { node, effectiveNodeConfig, x, y, width, height } = nodePosition;

    return this.nodeDrawer.drawNode({
      type: effectiveNodeConfig.type,
      x,
      y,
      width,
      height,
      fill: effectiveNodeConfig.color,
      stroke: effectiveNodeConfig.borderColor,
      strokeWidth: effectiveNodeConfig.borderWidth,
      borderRadius: effectiveNodeConfig.borderRadius,
      text: node.text,
      description: node.description,
      fontSize: effectiveNodeConfig.fontSize,
      fontColor: effectiveNodeConfig.fontColor,
      padding: effectiveNodeConfig.padding || 5,
      opacity: effectiveNodeConfig.opacity,
      shadow: effectiveNodeConfig.shadow,
      shadowColor: effectiveNodeConfig.shadowColor,
      shadowOffset: effectiveNodeConfig.shadowOffset,
      gradient: effectiveNodeConfig.gradient,
      gradientStartColor: effectiveNodeConfig.gradientStartColor,
      gradientEndColor: effectiveNodeConfig.gradientEndColor,
      collapsible: effectiveNodeConfig.collapsible,
      expanded: node.collapsibleState?.expanded || false,
      onToggleExpand: this.createToggleHandler(node),
      // Image node specific configurations
      imageConfig: effectiveNodeConfig.imageConfig,
      imageTitleConfig: effectiveNodeConfig.imageTitleConfig,
      imageSubtitleConfig: effectiveNodeConfig.imageSubtitleConfig,
      imageTextPositionConfig: effectiveNodeConfig.imageTextPositionConfig,
      imageMargin: effectiveNodeConfig.imageMargin,
      // Image node specific data
      imageUrl: node.imageUrl,
      title: node.title,
      subtitle: node.subtitle,
    });
  }

  /**
   * Create a toggle handler for collapsible nodes
   */
  private createToggleHandler(node: any) {
    return (expanded: boolean) => {
      // Update the node state
      if (node.collapsibleState) {
        node.collapsibleState.expanded = expanded;
      } else {
        node.collapsibleState = { expanded };
      }

      // Trigger tree re-rendering
      if (this.onTreeUpdate) {
        this.onTreeUpdate();
      }
    };
  }
}
