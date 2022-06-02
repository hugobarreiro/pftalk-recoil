module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './src',
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
