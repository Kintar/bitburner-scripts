module.exports = {
  env: {
    browser: true,
    es6: false,
    commonjs: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['*.d.ts', '*.js'],
  overrides: [
    {
      files: ['src/**/*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {
    'no-undef': "error",
    'no-var': 'error',
    'no-return-await': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/promise-function-async': 'warn',
    '@typescript-eslint/return-await': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
  },
};
