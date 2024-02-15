/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#C36D91",
          secondary: "#F57FB0",
          "base-100": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")[["dark"]],
          primary: "#F57FB0",
          secondary: "#F57FB0",
          "base-100": "#000000",
        },
      },
    ],
  },
};
