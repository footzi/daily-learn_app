const path = require('path');

module.exports = function(api) {
  
  console.log(path.resolve('./'));
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      development: {
        plugins: [
          [
            'module-resolver',
            {
              root: path.resolve('./'),
              extensions: [
                '.js'
              ],
              alias: {
                '@components': './components',
                '@constants': path.resolve(__dirname, 'constants'),
                '@store': './store',
                '@api': './api',
                '@libs': './libs',
                '@mocks': './mocks',
              },
            },
          ],
        ],
      },
    },
  };
};
