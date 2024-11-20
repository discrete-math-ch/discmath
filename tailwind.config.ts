import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,js,mdx,jsx}',
    './components/**/*.{html,js,jsx,tsx,ts}',
    './*.{jsx,tsx}',
  ],

  theme: {
    extend: {
        colors: {
            primary: {
                dark: '#1e3266', // Rich Navy Blue (accent for hover states in light mode)
                light: '#b3c4e8', // Soft Cornflower Blue (dark mode and headers)
            },
            secondary: {
                light: '#eef2f6', // Pale Sky Blue (background for cards in light mode)
                DEFAULT: '#5a6e8c', // Cool Slate Blue (subtext and secondary text)
                dark: '#3b4a5c', // Muted Deep Slate (subtext in dark mode)
            },
            background: {
                light: '#f7fafc', // Off-White Blue Tint (overall light background)
                DEFAULT: '#ffffff', // Crisp White (card backgrounds in light mode)
                dark: '#1a202e', // Deep Blue-Gray (dark mode background)
            },
            text: {
                light: '#334155', // Charcoal Blue-Gray (primary text in light mode)
                DEFAULT: '#1c2834', // Dark Blue-Black (default text color)
                dark: '#e2e8f0', // Soft Frosted Gray (text in dark mode)
            },
            border: {
                light: '#d1dce6', // Light Silver-Blue Border (card borders in light mode)
                DEFAULT: '#c0cad6', // Neutral Gray-Blue Border (default border)
                dark: '#3c485a', // Slate Blue Border (dark mode borders)
            },
        },
        
    },
},

  plugins: [],
};
export default config;
