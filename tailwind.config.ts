import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue-ish": "#5865f2",
        "gray-ish": "#313338",
        "room-black-2": "#4E5058",
        "room-black": "#2B2D31",
        "room-deep-black": "#1E1F22",
        "black-ish": "#1e1f22",
        "faded-black": "#0000008a",
        "white-1": "#f2f3f5",
        "white-2": "#dbdee1",
        "white-3": "#b5bac1",
        "white-4": "#949ba4",
        "l-blue": "#00a8fc",
        "red-ish": "#f23f42",
        "off-white": "#f6f6f6",
        "dark-not-black": "#2c2f33",
      },
      fontFamily: {
        "Noto-sans": ['"Noto Sans"', "sans-serif"],
        "Archivo-Black": ['"Archivo Black"', "sans-serif"],
        "Open-sans": ['"Open Sans"', "sans-serif"],
      },
      flex: {
        "flex-1-1": "3 1 auto",
      },
      screens: {
        "s-custom": "500px",
        "m-screen": "800px",
        "l-screen": "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
