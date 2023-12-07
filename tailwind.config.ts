import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue-ish": "#5865f2",
        "gray-ish": "#313338",
        "black-ish": "#1e1f22",
        "white-1": "#f2f3f5",
        "white-2": "#dbdee1",
        "white-3": "#b5bac1",
        "white-4": "#949ba4",
        "l-blue": "#00a8fc",
        "red-ish": "#f23f42",
      },
      fontFamily: {
        "Noto-sans": ['"Noto Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
