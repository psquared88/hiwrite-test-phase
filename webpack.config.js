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
    background: path.join(__dirname, "src", "pages", "Background", "index.ts"),
    contentScript: path.join(__dirname, "src", "pages", "Content", "index.ts"),
    pdf: path.join(__dirname, "src", "pages", "Pdf", "index.tsx")
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
    // clean: true,
    // publicPath: ASSET_PATH
  },
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
        exclude: /node_modules\/(?!(pdf-reader)\/).*/,
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
      "@pdf-reader": path.resolve(__dirname, "../pdf-reader/src/")
    }
  },
  plugins: [
    new Dotenv({
      path: `./.env${process.env.NODE_ENV === "production" ? ".production" : ""}`
    }),
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: path.join(__dirname, "build"),
          force: true,
          transform: function(content) {
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString())
              })
            );
          }
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets/img/logo@4x.png",
          to: path.join(__dirname, "build"),
          force: true
        },
        {
          from: "src/assets/img/logo.png",
          to: path.join(__dirname, "build"),
          force: true
        },
        {
          from: "src/assets/img/logo@2x.png",
          to: path.join(__dirname, "build"),
          force: true
        },
        {
          from: "src/assets/img/logo-off@2x.png",
          to: path.join(__dirname, "build"),
          force: true
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/pages/Content/tooltip/tooltip-iframe.js",
          to: path.join(__dirname, "build"),
          force: true
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/pages/Content/content.styles.css",
          to: path.join(__dirname, "build"),
          force: true
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/pages/Pdf/pdf.html",
          to: path.join(__dirname, "build"),
          force: true
        },
        {
          from: "src/pages/Pdf/lib/pdf.worker.min.mjs",
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
  // options.optimization = {
  //   minimize: true,
  //   minimizer: [
  //     new TerserPlugin({
  //       extractComments: false
  //     })
  //   ]
  // };
}

module.exports = options;
