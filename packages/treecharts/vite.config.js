import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "dev",
  server: {
    open: true,
  },
  resolve: {
    alias: {
      // This allows your dev environment to use the source files directly
      "../src": resolve(__dirname, "src"),
    },
  },
});
