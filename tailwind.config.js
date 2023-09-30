/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // flowbite-svelte slate primary colors
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // custom slate surface colors
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
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
