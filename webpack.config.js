const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const fs = require('fs').promises

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
    clean: {
      keep: filename => {
        if (filename.includes('booking') || filename.includes('order-history')) return false

        return true
      }
    }
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit
        compiler.hooks.afterEmit.tapPromise('AfterEmitPlugin', async ({ chunks }) => {
          for (chunk of chunks) {
            const filepath = chunk.files.keys().next().value
            const fileText = makeTemplate(filepath)
            await fs.writeFile(`./pages/${chunk.name}.page`, fileText)
          }
        })
      }
    }
  ],
}

// TODO: remove stripe from template
const makeTemplate = basename =>
  `<div id="app">
  <router-view></router-view>
</div>

<script src="https://js.stripe.com/v3/"></script>
<script src="/${basename}"></script>
`
