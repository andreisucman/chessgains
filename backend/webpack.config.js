const path = require("path");

module.exports = {
  mode: "production",
  entry: "./lib/js-chess-engine.mjs",
  output: {
    library: "js-chess-engine",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    filename: "js-chess-engine.js",
  },
  resolve: {
    alias: {
      "magic-sdk": path.resolve(__dirname, "node_modules/magic-sdk/dist/cjs/index.js"),
    },
  },
  node: {
    child_process: "empty",
    fs: "empty",
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    }),
  ],
};
