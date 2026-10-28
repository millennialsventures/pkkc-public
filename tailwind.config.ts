import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pkkc: {
          purple: "#B8529E",
          blue: "#1273B8",
          pink: "#EF5FA5",
          green: "#37A94A",
          orange: "#F49021",
          red: "#ED1E26",
          bg: "#FAFAF9",
          ink: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};

export default config;
