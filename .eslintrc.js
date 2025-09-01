// .eslintrc.js (root of monorepo)
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Add your preferred rules here
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    ".turbo",
    "coverage",
    "*.config.js",
    "*.config.ts",
  ],
};
