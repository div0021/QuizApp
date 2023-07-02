/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        "poppins": ['Poppins', "sans-serif"]
      },
      screens:{
        "mini":"300px"
      }
    },
  },
  plugins: [],
}

