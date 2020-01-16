const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: 'vue-svg-loader'
      },
      {
        test: /\.(otf)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/assets/images',
              name: '[name].[ext]',
              publicPath: '/assets/images/'
            }
          }
        ]
      }
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
      common: path.resolve(__dirname, 'src/common'),
      images: path.resolve(__dirname, 'src/images')
    },
  },
  entry: {
    'booking': './src/booking.js',
    'order-history': './src/order-history.js'
  },
  output: {
    filename: 'scripts/[name].[chunkhash].js',
    path: path.resolve(__dirname),
  },
  optimization: {
    usedExports: true,
  },
  plugins: [new VueLoaderPlugin()],
}
