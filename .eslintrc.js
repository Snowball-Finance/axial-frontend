

module.exports = {
  extends: ['react-app'],
  rules: {
    "react-hooks/exhaustive-deps":"off"
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
    },
  ],
};
