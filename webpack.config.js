const { resolve } = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const cssnano = require('cssnano')

const workingDirectory = process.cwd()
const BUILD_PATH = resolve(workingDirectory, 'dist')
const SOURCE_PATH = resolve(workingDirectory, 'src')
const ASSETS_PATH = `${SOURCE_PATH}/assets`
const STYLES_PATH = `${SOURCE_PATH}/styles`

const commonPlugins = [
  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    inject: true
  })
]
const developmentPlugins = [
  ...commonPlugins,
  new webpack.HotModuleReplacementPlugin()
]
const productionPlugins = [
  ...commonPlugins,
  new MiniCssExtractPlugin({
    filename: '[name].[chunkhash:5].css',
    chunkFilename: '[name].[hash:5].css'
  }),
  new CompressionPlugin({
    test: /\.jsx?/,
    algorithm: 'gzip'
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /main\..*\.css$/g,
    cssProcessor: cssnano,
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  })
]

const ASSETS_LOADER = {
  test: /\.(jpg|png|svg|otf|ttf|woff|woff2|zip|eot)$/,
  include: ASSETS_PATH,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        context: __dirname
      }
    }
  ]
}
const JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/preset-es2015",
        ["@babel/preset-stage-2", { "decoratorsLegacy": true }],
        "@babel/preset-react"
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-transform-async-to-generator",
        "transform-export-extensions",
        "@babel/plugin-transform-runtime"
      ]
    }
  }
}
const CSS_LOADER = isProduction => ({
  test: /\.css$/,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: false,
        importLoaders: false,
        context: __dirname
      }
    }
  ]
})
const PCSS_LOADER = isProduction => ({
  test: /\.pcss$/,
  use: [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: true,
        context: __dirname,
        alias: {
          styles: STYLES_PATH
        },
        localIdentName: '[folder]-[local]--[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        config: {
          path: `${__dirname}/postcss.config.js`
        }
      }
    }
  ]
})

module.exports = (env, { mode, analyze }) => {
  const isProduction = mode === 'production'
  const devtool = isProduction ? '' : 'source-map'
  const plugins = isProduction ? productionPlugins : developmentPlugins

  if (analyze) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 0 }))
  }

  return {
    devtool,

    mode: 'production',

    output: {
      filename: isProduction ? '[name].[chunkhash:5].js' : '[name].js',
      path: BUILD_PATH,
      publicPath: '/'
    },

    devServer: {
      inline: true,
      contentBase: [BUILD_PATH, SOURCE_PATH],
      publicPath: '/',
      historyApiFallback: true,
      port: 9000,
      stats: 'errors-only',
      hot: true
    },

    module: {
      rules: [
        ASSETS_LOADER,
        JS_LOADER,
        PCSS_LOADER(isProduction),
        CSS_LOADER(isProduction)
      ]
    },

    resolve: {
      modules: ['node_modules', SOURCE_PATH],
      extensions: ['.js', '.jsx', '.pcss', '.css'],
      alias: {
        assets: ASSETS_PATH
      }
    },

    stats: 'errors-only',

    plugins
  }
}
