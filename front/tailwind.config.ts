import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arialroundedmtbold: ["arialroundedmtbold"],
        sans: ["dinroundpro"],
      },
      colors: {
       "sivoy-orange": "#df5430",
       "sivoy-green": "#1a7970",
       "sivoy-blue": "#00243C",
      },
    },
  },
  plugins: [],
};
export default config;