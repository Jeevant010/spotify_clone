/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/10": "10%",
        "9/10": "90%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
      colors: {
        "spotify-base": "#121212",
        "spotify-black": "#000000",
        "spotify-card": "#181818",
        "spotify-card-hover": "#282828",
        "spotify-green": "#1db954",
        "spotify-grey": "#b3b3b3",
        "spotify-highlight": "#2a2a2a"
      }
    },
  },
  plugins: [],
};