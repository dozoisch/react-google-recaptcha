import { DefinePlugin } from "webpack";
export default {
  output: {
    pathinfo: true,
  },
  devtool: "inline-source-map",

  module: {
    loaders: [
      { test: /\.js/, loader: "babel", exclude: /node_modules/ },
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
