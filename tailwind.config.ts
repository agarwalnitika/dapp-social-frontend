/**
 * Tailwind CSS configuration
 * Defines custom theme settings, colors, and responsive design utilities
 */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Optional, if you're using /app dir
  ],
  darkMode: "class", // Enables dark mode support
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1DA1F2", // Twitter blue
          dark: "#1A91DA",
        },
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
        muted: {
          light: "#f5f5f5",
          dark: "#1e1e1e",
        },
        accent: {
          yellow: "#FCD34D",
          pink: "#F472B6",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
