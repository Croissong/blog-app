const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');


/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});


module.exports = function (options) {
  var config = {

    devtool: 'cheap-module-source-map',

    output: {

      path: helpers.root('../mnt-koa/dist/blog'),
      filename: 'js/[name].bundle.js', 
      sourceMapFilename: 'js/[name].map', 
      chunkFilename: 'js/[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var'
    },

    plugins: [
      
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR
        }
      }),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      // new NamedModulesPlugin(), 

    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      quiet: false,
      stats: 'errors-only', // none (or false), errors-only, minimal, normal (or true) and verbose
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      proxy: {
        '/socket/*': {
          target: 'http://localhost:4000',
          ws: true
        }
      }
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
    
  };
  config = webpackMerge(commonConfig({env: ENV}), config); 
  return config;
}
