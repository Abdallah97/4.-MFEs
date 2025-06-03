"use strict";

var path = require("path");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, ".dist"),
    filename: "[name].bundle.js"
  },
  devServer: {
    "static": {
      directory: path.resolve(__dirname, ".dist")
    },
    open: true,
    port: 3001,
    historyApiFallback: true
  },
  plugins: [new ModuleFederationPlugin({
    name: "commonComponents",
    filename: "remoteEntry.js",
    exposes: {
      "./CardDetails": "./src/components/CardDetails.jsx",
      "./CardShort": "./src/components/CardShort.jsx",
      "./ProductCard": "./src/components/ProductCard.jsx"
    },
    shared: ["react", "react-dom"]
  }), new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html"
  })],
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      include: path.resolve(__dirname, "src"),
      exclude: path.resolve(__dirname, "node_modules"),
      use: [{
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {
            targets: "defaults"
          }], "@babel/preset-react"]
        }
      }]
    }, {
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
    }, {
      test: /\.(png|jpeg|gif|jpg)$/i,
      type: "asset/resource"
    }]
  }
};