/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,tsx,ts,js,jsx}",
    "./example/*.{html,js}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "limuse-main-border": {
          "light": "white",
          "dark": "#e4e4e7" 
        },
        "limuse-bg-main-color": {
          "light": "white",
          "dark": "#2B2D31"
        },
        "limuse-badge": {
          "bg": "transparent",
          "bg-dark": "#3F3F46",
          "border": "black",
          "border-dark": "#8B5CF6"
        }, 
      }
    },
  },
  plugins: [],
}

