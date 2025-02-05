const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    navigation: "./src/navigation_entry.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
