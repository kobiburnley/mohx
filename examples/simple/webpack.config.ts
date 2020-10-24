import * as path from "path"
import { Configuration, DefinePlugin, HashedModuleIdsPlugin } from "webpack"
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: Configuration = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: ["./src/client.tsx"],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "./tsconfig.build.json"),
          transpileOnly: true,
        },
      }
    ],
  },
  output: {
    path: path.join(__dirname, "public"),
    // filename: "[name].[contenthash].js",
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    // new BundleAnalyzerPlugin()
  ],
}

module.exports = config
