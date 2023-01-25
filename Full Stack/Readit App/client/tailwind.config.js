module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ["IBM Plex Sans"],
    },
    extend: {
      colors: {
        blue: {
          500: "#3394DC",
        },
      },
      spacing: {
        160: "40rem",
      },
      container: false,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          margin: "0 auto",
          "@screen sm": { maxWidth: "640px" },
          "@screen md": { maxWidth: "768px" },
          "@screen lg": { maxWidth: "975px" },
        },
        ".container-2": {
          width: "100%",
          margin: "0 auto",
          "@screen sm": { maxWidth: "700px" },
          "@screen md": { maxWidth: "900px" },
          "@screen lg": { maxWidth: "1300px" },
        },
      });
    },
  ],
};
