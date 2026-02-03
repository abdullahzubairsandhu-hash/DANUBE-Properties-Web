// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        danube: {
          gold: "#BDA588",
          navy: "#0E243A",
          red: "#FE2D2D",
          text: "#4A4B4B",
          bg: "#F8F8F8",
        },
      },
      fontFamily: {
        // These link Tailwind classes to your Layout variables
        primary: ['var(--font-primary)', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}