const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/app.ts',
  mode: process.env.WEBPACK_ENV,
  devtool: 'cheap-source-map',
  devServer: {
    static: './dist',
    hot: true,
    port: 8802
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      favicon: './src/favicon.ico',
      filename: 'index.html',
      template: './src/index.html',
      inject: true
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/images/**', to: 'images/[name][ext]' },
        { from: 'src/shaders/**', to: 'shaders/[name][ext]' }
      ]
    })
  ]
}
