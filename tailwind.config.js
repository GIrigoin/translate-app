/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "main-text": "#F9FAFB",
      "button-bg": "#3662E3",
      "button-border": "#7CA9F3",
      "textarea-border": "#CDD5E0",
      "source-textarea": "#212936cc",
      "result-textarea": "#121826cc",
      "active-lang-bg": "#4D5562",
      "secondary-text": "#394150",
      dark: "#040711",
    },
    fontSize: {
      large: "1rem",
      medium: "0.875rem",
      small: "0.75rem",
    },
    extend: {
      fontFamily: {
        DM: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
