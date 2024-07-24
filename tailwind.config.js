/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        boxShadow: {
          'pink': '0 0 8px 0 rgba(183, 185, 255, 1)',
        }
      },
    },
    plugins: [],
  }