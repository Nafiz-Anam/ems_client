/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        blackText: "#222222",
        primary: "#0C4C4D",
        secondary: "#F1F3F7",

        black: "#0D0D10",
        chartBar: "blue",
      },

      boxShadow: {
        cardShadow: "2px 5px 10px rgba(0, 0, 0, 0.15)",
        drawShadow: "0px 10px 20px rgba(0, 0, 0, 0.30)",
        userDetailsCardShadow: "2px 5px 10px rgba(0, 0, 0, 0.15)",
        rollingShadow: "0px 4px 12px 3px rgba(0, 0, 0, 0.50) inset;",
      },

    },
  },
  plugins: [require("daisyui"), require('tailwind-scrollbar-hide')],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: false, // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },


}

