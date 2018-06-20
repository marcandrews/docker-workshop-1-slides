const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env = {}, argv) => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "reveal.js",
          entry: [
            "/lib/js/head.min.js",
            "js/reveal.js",
            "lib/js/classList.js",
            "plugin/markdown/marked.js",
            "plugin/markdown/markdown.js",
            "plugin/highlight/highlight.js",
            "plugin/zoom-js/zoom.js",
            "css/reveal.css"
          ]
        }
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: "src/content",
        to: "content"
      },
      {
        from: "node_modules/reveal.js/plugin",
        to: "vendor/reveal.js/plugin",
        force: true
      }
    ])
  ];

  if (!env.production) {
    plugins.push(new Dotenv());
  }

  return {
    entry: {
      app: ["./src/main.js"]
    },

    output: {
      path: path.join(__dirname, "docs"),
      filename: "[name].[hash].js"
    },

    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style-loader", "css-loader"]
        },
        { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
        { test: /\.(eot|svg|ttf|woff|woff2)$/, loaders: ["file-loader"] }
      ]
    },

    plugins,

    devServer: {
      port: 8081
    },
    watch: false
  };
};
