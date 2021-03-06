module.exports = {
  entry: "./src/Controllers/app.ts",
  output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
      extensions: [".ts", ".js", ".json"]
  },

  module: {
      rules: [
          { test: /\.ts?$/, loader: "awesome-typescript-loader" },
          { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
  }
};