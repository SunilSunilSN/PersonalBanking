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
    extend: {
      keyframes: {
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "breathe": {
          '0%, 100%': { transform: 'scale(1.25)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.85' },
        },
        
      },
      animation: {
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
         "breathe": 'breathe 2s ease-in-out infinite',
         "breathe-fast": 'breathe 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
