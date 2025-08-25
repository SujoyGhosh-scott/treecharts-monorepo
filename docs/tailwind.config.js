/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "br-hendrix": [
          "BR Hendrix",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        macondo: ["var(--font-macondo)", "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        treecharts: {
          primary: "#08CB00",
          secondary: "#253900",
          accent: "#10b981",
          neutral: "#374151",
          "base-100": "#000000",
          "base-200": "#111111",
          "base-300": "#222222",
          "base-content": "#EEEEEE",
          info: "#08CB00",
          success: "#08CB00",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    darkTheme: "treecharts",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
