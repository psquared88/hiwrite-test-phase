var webpack = require("webpack"),
  path = require("path"),
  fileSystem = require("fs-extra"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  TerserPlugin = require("terser-webpack-plugin");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const ASSET_PATH = process.env.ASSET_PATH || "/";

console.log("================>", process.env.NODE_ENV);


var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2"
];

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    pdf: path.join(__dirname, "src", "pdf", "PDFReader.tsx")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    library: {
      type: "module"
    }
  },
  experiments: {
    outputModule: true
  },
  target: ["web", "es2020"],
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }, {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: new RegExp(".(" + fileExtensions.join("|") + ")$"),
        type: "asset/resource",
        exclude: /node_modules/
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.mjs$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: fileExtensions
      .map((extension) => "." + extension)
      .concat([".js", ".jsx", ".ts", ".tsx", ".css", ".mjs"]),
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/pdf/lib/pdf.worker.min.mjs",
          to: path.join(__dirname, "build"),
          force: true
        }
      ]
    })
  ],
  infrastructureLogging: {
    level: "verbose"
  }
};

if (process.env.NODE_ENV === "development") {
  options.devtool = "source-map";
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  };
}

module.exports = options;
