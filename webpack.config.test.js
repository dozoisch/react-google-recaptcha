const DefinePlugin = require("webpack").DefinePlugin;
module.exports = {
  output: {
    pathinfo: true,
  },
  devtool: "inline-source-map",

  module: {
    loaders: [
      { test: /\.js/, loader: "babel-loader", exclude: /node_modules/ },
    ],
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
