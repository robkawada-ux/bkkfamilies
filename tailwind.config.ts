import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orange: { DEFAULT: "#F4831F", 50: "#FEF3E8" },
        teal: { DEFAULT: "#3EC1D3", 50: "#EAFBFC" },
        green: { DEFAULT: "#8DC63F", 50: "#F3FAEA" },
        purple: { DEFAULT: "#5C2D91", dark: "#3D1E5C", 50: "#F3EEF9" },
      },
      fontFamily: {
        heading: ["Georgia", "Cambria", "serif"],
        body: ["Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
