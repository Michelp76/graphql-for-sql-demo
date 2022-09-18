/* should only be run on files in src/
 * Useful resources:
 * https://typescript-eslint.io/docs/
 * https://maximorlov.com/linting-rules-for-asynchronous-code-in-javascript/
 */
module.exports = {
  env: {
    'shared-node-browser': true,
    node: true,
    commonjs: true,
  },
  extends: [
    'async',
    'async/node',
    'async/typescript',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['temp', 'node_modules', 'dist'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['eslint-plugin-node', '@typescript-eslint'],
  root: true,
  rules: {
    'import/no-relative-parent-imports': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
