module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      mob: "375px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
      laptopl: "1440px",
    },
    extend: {
      colors: {
        accent: {
          light: "#ddd6fe",
          DEFAULT: "#c4b5fd",
          mid: "#a78bfa",
          dark: "#8b5cf6",
        },
      },
    },
  },
  plugins: [],
};
