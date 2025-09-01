// packages/treecharts-react/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "treecharts"],
  splitting: false,
  minify: false,
  treeshake: true,
});
