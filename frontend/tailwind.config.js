/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily : {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        'marvel-blue' : '#458EF7',
      },
    },
  },
  plugins: [],
}

