const helpers = require('./config/helpers');

module.exports = function (ctx) {
  return {
    plugins: {
      'postcss-import': {
        path: [helpers.root('src/assets/css')]
      },
      'postcss-url': {
        url: 'inline', basePath: helpers.root('src/assets'),
        maxSize: 100, filter: /\.woff$/
      },
      'precss': {},
      'postcss-cssnext': {}
    }
  };
}
