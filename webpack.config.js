const path = require('path');
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['@codler/react-native-keyboard-aware-scroll-view'],
      },
    },
    argv
  );

  config.resolve.alias['@constants'] = path.resolve(__dirname, './constants');
  config.resolve.alias['@api'] = path.resolve(__dirname, './api');
  config.resolve.alias['@libs'] = path.resolve(__dirname, './libs');
  config.resolve.alias['@store'] = path.resolve(__dirname, './store');
  config.resolve.alias['@mocks'] = path.resolve(__dirname, './mocks');
  config.resolve.alias['@navigation'] = path.resolve(__dirname, './navigation');
  config.resolve.alias['@components'] = path.resolve(__dirname, './components');

  // config.resolve = {
  //   alias: {
  //     '@constants': path.resolve(__dirname, './constants'),
  //     '@api': path.resolve(__dirname, './api'),
  //     '@libs': path.resolve(__dirname, './libs'),
  //     '@store': path.resolve(__dirname, './store'),
  //     '@mocks': path.resolve(__dirname, './mocks'),
  //     '@navigation': path.resolve(__dirname, './navigation'),
  //     '@components': path.resolve(__dirname, './components'),
  //   },
  // };

  // config.devServer = {
  //   port: 3000,
  // };

  return config;
};
