import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  TreeChart as CoreTreeChart,
  TreeNode,
  TreeChartOptions,
} from "treecharts";

export interface TreeChartProps extends TreeChartOptions {
  /**
   * Tree data to visualize
   */
  data: TreeNode;

  /**
   * CSS class name for the container
   */
  className?: string;

  /**
   * Inline styles for the container
   */
  style?: React.CSSProperties;

  /**
   * Container width
   */
  width?: number | string;

  /**
   * Container height
   */
  height?: number | string;

  /**
   * Callback fired when the chart is rendered
   */
  onRender?: (svg: SVGSVGElement) => void;

  /**
   * Callback fired when the chart data is updated
   */
  onUpdate?: (svg: SVGSVGElement) => void;
}

export interface TreeChartRef {
  /**
   * Get the TreeChart instance
   */
  getInstance: () => CoreTreeChart | null;

  /**
   * Get the rendered SVG element
   */
  getSvg: () => SVGSVGElement | null;

  /**
   * Update the chart with new data
   */
  update: (data: TreeNode) => void;

  /**
   * Set new options for the chart
   */
  setOptions: (options: TreeChartOptions) => void;

  /**
   * Change the visualization type
   */
  setType: (type: TreeChartOptions["type"]) => void;

  /**
   * Resize the chart
   */
  resize: (width: number, height: number) => void;
}

/**
 * React wrapper for TreeCharts library
 *
 * Provides a React component interface for creating tree visualizations
 * with all the features and customization options of the core library.
 */
export const TreeChart = forwardRef<TreeChartRef, TreeChartProps>(
  (
    {
      data,
      className,
      style,
      width,
      height,
      onRender,
      onUpdate,
      ...chartOptions
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<CoreTreeChart | null>(null);
    const containerIdRef = useRef<string>(
      `treechart-${Math.random().toString(36).substr(2, 9)}`
    );

    // Expose methods via ref
    useImperativeHandle(
      ref,
      () => ({
        getInstance: () => chartInstanceRef.current,
        getSvg: () => chartInstanceRef.current?.getSvg() || null,
        update: (newData: TreeNode) => {
          if (chartInstanceRef.current) {
            const svg = chartInstanceRef.current.update(newData);
            onUpdate?.(svg);
          }
        },
        setOptions: (options: TreeChartOptions) => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.setOptions(options);
          }
        },
        setType: (type: TreeChartOptions["type"]) => {
          if (chartInstanceRef.current && type) {
            chartInstanceRef.current.setType(type);
          }
        },
        resize: (width: number, height: number) => {
          if (chartInstanceRef.current) {
            chartInstanceRef.current.resize(width, height);
          }
        },
      }),
      [onUpdate]
    );

    // Initialize chart on mount
    useEffect(() => {
      if (containerRef.current) {
        // Set the container ID
        containerRef.current.id = containerIdRef.current;

        // Create chart instance
        chartInstanceRef.current = new CoreTreeChart(
          containerIdRef.current,
          chartOptions
        );

        // Render initial data
        const svg = chartInstanceRef.current.render(data);
        onRender?.(svg);
      }

      // Cleanup on unmount
      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        chartInstanceRef.current = null;
      };
    }, []); // Only run on mount

    // Update chart when data or options change
    useEffect(() => {
      if (chartInstanceRef.current) {
        // Update options if they changed
        chartInstanceRef.current.setOptions(chartOptions);

        // Re-render with new data
        const svg = chartInstanceRef.current.render(data);
        onUpdate?.(svg);
      }
    }, [data, chartOptions, onUpdate]);

    // Calculate container styles
    const containerStyle: React.CSSProperties = {
      width: width || "100%",
      height: height || "auto",
      ...style,
    };

    return (
      <div ref={containerRef} className={className} style={containerStyle} />
    );
  }
);

TreeChart.displayName = "TreeChart";

export default TreeChart;
