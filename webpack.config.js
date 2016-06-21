var postcss = require('./config/postcss');
var path = require('path');
var cssModules = require('postcss-modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var env = process.env.NODE_ENV;

var config = {
  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    sourceMapFilename: "[file].map",
  },

  cache: true,
  devtool: "#source-map",
  debug: env === 'production',

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
    ],

    loaders: [

      // Babel
      {
        test: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
        },
      },

      // CSS/Style
      {
        test: /.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[local]--[hash:base64:10]',
          'postcss-loader'
        ),
      },
    ],
  },

  postcss: postcss,

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
};

if (env === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.OccuranceOrderPlugin(true),
    new webpack.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}

module.exports = config;
