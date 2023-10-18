/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom slate surface colors, used for dark theme
        surface: {
          50: "#dfe1e5",
          100: "#d4d7dc",
          200: "#c9cdd4",
          300: "#a9afb9",
          400: "#697385",
          500: "#283751",
          600: "#243249",
          700: "#1e293d",
          800: "#182131",
          900: "#141b28",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
