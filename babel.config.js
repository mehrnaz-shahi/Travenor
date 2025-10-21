module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push('react-native-worklets/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins:[
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@hooks': './hooks',
            '@context': './context',
            '@utils': './utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.json'],
        },
      ],

    ],
  };
};
