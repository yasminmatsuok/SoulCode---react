/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#0A0A0F",
        bgSecondary: "#12121A",
        brandPrimary: "#5B4FCF",
        brandSecondary: "#7B6FE8",
        accent: "#4ECDC4",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0A0B0",
        borderColor: "#2A2A3A",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        pill: "50px",
      },
    },
  },
  plugins: [],
}
