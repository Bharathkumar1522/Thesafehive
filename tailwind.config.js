/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#4CAF50",   // brand accent
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        yellow: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#FFC107",   // brand accent
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
      },

      /* Fonts: InterVar for body/UI, Nunito for headings */
      fontFamily: {
        sans: ["InterVar", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
        body: ["InterVar", "system-ui", "sans-serif"],
        heading: ["Nunito", "InterVar", "system-ui", "sans-serif"],
      },

      /* Tailwind Typography defaults + Nunito on headings */
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            "h1,h2,h3,h4,h5,h6": {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.gray.900"),
            },
            h1: { fontWeight: "800" },
            h2: { fontWeight: "700", marginTop: "2em" },
            h3: { fontWeight: "700" },
            a: {
              color: theme("colors.green.600"),
              "&:hover": { color: theme("colors.green.700") },
            },
          },
        },
      }),

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
