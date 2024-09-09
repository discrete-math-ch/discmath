import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{html,js,mdx,jsx}',
    './components/**/*.{html,js,jsx,tsx,ts}',
    './*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },

  },
  plugins: [],
};
export default config;
