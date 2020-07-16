module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.vue"],
    options: {
      whitelist: [/svg.*/, /fa.*/]
    }
  },
  theme: {},
  variants: {},
  plugins: []
};
