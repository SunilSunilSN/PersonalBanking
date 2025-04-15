/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    
    "./src/**/*.{js,jsx,ts,tsx}",      // Adjust this path if you need to scan other folders
    "./Applications/**/*.{js,jsx,ts,tsx}",
    "./Applications/base-application/src/**/*.{js,jsx,ts,tsx}",
    "./Applications/MicroApplications/login-microapp/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

