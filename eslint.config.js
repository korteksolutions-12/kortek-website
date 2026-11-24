const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'no-undef': 'error'
    }
  }
];