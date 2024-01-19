module.exports = {
  root: true,
  extends: ['universe/native'],
  rules: {
    'prettier/prettier': [1, { endOfLine: 'auto' }, { singleQuote: true }],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
};
