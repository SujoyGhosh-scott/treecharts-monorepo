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
import { TreeChartProps, TreeChartRef } from "./types";

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

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.id = containerIdRef.current;

        chartInstanceRef.current = new CoreTreeChart(
          containerIdRef.current,
          chartOptions
        );

        const svg = chartInstanceRef.current.render(data);
        applyAutoScaling(svg);
        onRender?.(svg);
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        chartInstanceRef.current = null;
      };
    }, []);

    useEffect(() => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.setOptions(chartOptions);
        const svg = chartInstanceRef.current.render(data);
        applyAutoScaling(svg);
        onUpdate?.(svg);
      }
    }, [data, chartOptions, onUpdate]);

    const applyAutoScaling = (svg: SVGSVGElement) => {
      if (!svg || !containerRef.current) return;

      const originalWidth = svg.getAttribute("width");
      const originalHeight = svg.getAttribute("height");

      if (originalWidth && originalHeight) {
        svg.setAttribute("viewBox", `0 0 ${originalWidth} ${originalHeight}`);
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.style.maxWidth = `${originalWidth}px`;
        svg.style.maxHeight = `${originalHeight}px`;

        // Center the SVG when it's at natural size
        containerRef.current.style.display = "flex";
        containerRef.current.style.alignItems = "center";
        containerRef.current.style.justifyContent = "center";
      }
    };

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
