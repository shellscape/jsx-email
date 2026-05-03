const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const config = {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: "default",
    }),
  ],
};

module.exports = config;
