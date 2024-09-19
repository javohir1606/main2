/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container:{
        center: true,
        screens: {
          lg: "1300px",
        }
      }
    },
  },
  plugins: [],
}