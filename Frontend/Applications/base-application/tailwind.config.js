/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Adjust this path if you need to scan other folders
    "./**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "../../SharedServices/**/*.{js,jsx,ts,tsx,html}",
    "../MicroApplications/**/*.{js,jsx,ts,tsx,html}",
    "../MicroApplications/**/src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
