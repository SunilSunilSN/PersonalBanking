/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [          // Adjust this path if you need to scan other folders
    "./**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

