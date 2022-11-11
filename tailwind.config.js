/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        'semi-md': '768px',
        md: '1024px',
        'semi-lg': '1280px',
        lg: '1536px',
        xl: '1920px',
        '2xl': '2560px',
        '3xl': '3840px',
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
}
