/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        backgroundImage: {
          'login-bg': "url('/src/assets/bg-login.jpg')", // Replace with your image path
        },
        backdropBlur: {
          xs: '2px',
        },
      },
    },
  },
  plugins: [],
}