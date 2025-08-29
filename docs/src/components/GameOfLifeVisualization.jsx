"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const GameOfLifeVisualization = ({
  cellSize = 30,
  updateInterval = 400,
  initialDensity = 0.2,
  deadCellOpacity = 0,
  liveCellOpacity = 0.15,
  cellColor = "34, 197, 94", // Green color to match your theme
  glowEffect = false,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize grid with random cells
  const initializeGrid = useCallback(
    (cols, rows) => {
      const grid = [];
      for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
          grid[y][x] = Math.random() < initialDensity ? 1 : 0;
        }
      }
      return grid;
    },
    [initialDensity]
  );

  // Count live neighbors
  const countNeighbors = (grid, x, y) => {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const row = (y + i + rows) % rows;
        const col = (x + j + cols) % cols;
        count += grid[row][col];
      }
    }
    return count;
  };

  // Update grid based on Game of Life rules
  const updateGrid = (grid) => {
    if (!grid || grid.length === 0) return grid;

    const rows = grid.length;
    const cols = grid[0].length;
    const newGrid = grid.map((row) => [...row]);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const neighbors = countNeighbors(grid, x, y);

        if (grid[y][x] === 1) {
          if (neighbors < 2 || neighbors > 3) {
            newGrid[y][x] = 0;
          }
        } else {
          if (neighbors === 3) {
            newGrid[y][x] = 1;
          }
        }
      }
    }

    return newGrid;
  };

  // Draw the grid on canvas
  const drawGrid = (ctx, grid) => {
    if (!ctx || !grid || grid.length === 0) return;

    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rows = grid.length;
    const cols = grid[0].length;

    // Draw all cells
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const xPos = x * cellSize;
        const yPos = y * cellSize;

        if (grid[y][x] === 1) {
          // Live cell with edge fade for contained version
          // Calculate distance from edges (fade on all sides)
          const edgeFadeX = Math.min(x / 3, (cols - 1 - x) / 3, 1);
          const edgeFadeY = Math.min(y / 3, (rows - 1 - y) / 3, 1);
          const edgeFade = Math.min(edgeFadeX, edgeFadeY);

          // Apply fade to opacity
          const fadedOpacity = liveCellOpacity * edgeFade;

          ctx.fillStyle = `rgba(${cellColor}, ${fadedOpacity})`;
          ctx.fillRect(xPos, yPos, cellSize, cellSize);
        }
      }
    }
  };

  // Setup and handle resize
  useEffect(() => {
    const setupGrid = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      setDimensions({ width, height });

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      gridRef.current = initializeGrid(cols, rows);

      // Initial draw
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawGrid(ctx, gridRef.current);
        }
      }
    };

    // Use ResizeObserver for container size changes
    const resizeObserver = new ResizeObserver(setupGrid);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    setupGrid();

    return () => {
      resizeObserver.disconnect();
    };
  }, [cellSize, initializeGrid]);

  // Animation loop
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const animate = () => {
      if (!gridRef.current) return;

      gridRef.current = updateGrid(gridRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          drawGrid(ctx, gridRef.current);
        }
      }
    };

    const interval = setInterval(animate, updateInterval);
    return () => clearInterval(interval);
  }, [dimensions, updateInterval]);

  // Reinitialize on click
  const handleClick = () => {
    const cols = Math.ceil(dimensions.width / cellSize);
    const rows = Math.ceil(dimensions.height / cellSize);
    gridRef.current = initializeGrid(cols, rows);
  };

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onClick={handleClick}
        className="absolute inset-0 w-full h-full cursor-pointer"
      />
    </div>
  );
};

export default GameOfLifeVisualization;
