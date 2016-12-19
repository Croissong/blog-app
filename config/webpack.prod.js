/**
 * @author: @AngularClass
 */

const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

module.exports = function (env) {
  return webpackMerge(commonConfig({env: ENV}), {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      
      path: helpers.root('../mnt-koa/dist/blog'),
      filename: 'js/[name].[chunkhash].bundle.js',
      sourceMapFilename: 'js/[name].[chunkhash].bundle.map',
      chunkFilename: 'js/[id].[chunkhash].chunk.js' 
    },

    plugins: [

      new WebpackMd5Hash(),
      
      /**
       * Plugin: DedupePlugin
       * Description: Prevents the inclusion of duplicate code into your bundle
       * and instead applies a copy of the function at runtime.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       * See: https://github.com/webpack/docs/wiki/optimization#deduplication
       */
      // new DedupePlugin(), // see: https://github.com/angular/angular-cli/issues/1587

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      new UglifyJsPlugin({
        
        beautify: false, //prod
        output: {
          comments: false
        }, //prod
        mangle: {
          screw_ie8: true
        }, //prod
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false, // we need this for lazy v8
          drop_console: true
        }
      }),

      /**
       * Plugin: NormalModuleReplacementPlugin
       * Description: Replace resources that matches resourceRegExp with newResource
       *
       * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
       */

      new NormalModuleReplacementPlugin(
        /angular2-hmr/,
        helpers.root('config/empty.js')
      ),

      new NormalModuleReplacementPlugin(
        /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        helpers.root('config/empty.js')
      ),


      // AoT
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)upgrade/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)compiler/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)platform-browser-dynamic/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /dom(\\|\/)debug(\\|\/)ng_probe/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /dom(\\|\/)debug(\\|\/)by/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /src(\\|\/)debug(\\|\/)debug_node/,
      //   helpers.root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /src(\\|\/)debug(\\|\/)debug_renderer/,
      //   helpers.root('config/empty.js')
      // ),

      /**
       * Plugin: CompressionPlugin
       * Description: Prepares compressed versions of assets to serve
       * them with Content-Encoding
       *
       * See: https://github.com/webpack/compression-webpack-plugin
       */
      //  install compression-webpack-plugin
      new CompressionPlugin({
        regExp: /\.css$|\.html$|\.js$|\.map$/,
        threshold: 2 * 1024
      })
    ],
    
    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}
