const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function override(config, env) {
  config.entry = {
    main: "./src/index.js",
    navigation: "./src/navigation_entry.js",
  };
  config.output = {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  };

  config.plugins = [
    ...config.plugins,
    new HtmlWebpackPlugin({
      template: "./public/navigation_template.html",
      filename: "navigation.html",
      chunks: ["navigation"],
    }),
  ];

  return config;
};
