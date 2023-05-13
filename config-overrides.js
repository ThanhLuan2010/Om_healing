const webpack = require('webpack');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.js$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['module:metro-react-native-babel-preset'],
        [
          require.resolve('babel-preset-react-app/dependencies'),
          {helpers: true},
        ],
      ],
      plugins: [
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties'],
      ],
    },
  });

  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: process.env,
    }),
  );

  return config;
};
