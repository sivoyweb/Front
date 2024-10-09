import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			arialroundedmtbold: ["arialroundedmtbold"],
  			sans: ["dinroundpro"]
  		},
  		colors: {
  			'sivoy-orange': '#df5430',
  			'sivoy-green': '#1a7970',
  			'sivoy-blue': '#09253E',
  		},
  		screens: {
  			'4k': '2560px',
			'md-lg': '1045px',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;