const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.common.js"
    }
  },
  mode: process.env.NODE_ENV || "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "scripts")
  },
  plugins: [new VueLoaderPlugin()],
  watch: true
}
