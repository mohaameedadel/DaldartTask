/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "1rem",
      center: true,
    },
    extend: {
      colors:{
        main:"#254336",
        second:"#B7B597"
      }
    },
  },
  plugins: [],
};
