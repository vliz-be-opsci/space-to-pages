const path = require("path");

module.exports = function override(config, env) {
  config.entry = {
    main: "./src/index.js",
    navigation: "./src/navigation_entry.js",
  };
  config.output = {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  };
  return config;
};
