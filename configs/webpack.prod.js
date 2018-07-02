var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
console.log('========================XINGATE 3.0 PRODUCTION ENVIROMENT========================');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path:  helpers.root('product'),
    publicPath: '/',
    filename: 'js/[name].js?[hash]',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(), // —stops the build if there is an error.
    //—minifies the bundles.
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    //  —extracts embedded css as external files, adding cache-busting hash to the filename.
    new ExtractTextPlugin('assets/css/[name].css?[hash]'),
    //  —use to define environment variables that you can reference within the application.
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    //—to override options of certain loaders.
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
});