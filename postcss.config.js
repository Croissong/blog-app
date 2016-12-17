const helpers = require('./config/helpers');

module.exports = function (ctx) {
  return {
    plugins: {
      'postcss-import': {
        path: [helpers.root('src/assets/css')]
      },
      'lost': {},
      'precss': {},
      'postcss-cssnext': {}
    }
  };
}
