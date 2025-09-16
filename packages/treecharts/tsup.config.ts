// packages/treecharts/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", "iife"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  globalName: "TreeChart",
  outExtension({ format }) {
    if (format === "iife") return { js: ".global.js" };
    return {};
  },
  footer: {
    js: "if (typeof TreeChart !== 'undefined' && TreeChart.default) { TreeChart = TreeChart.default; }",
  },
});
