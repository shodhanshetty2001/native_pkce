module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
