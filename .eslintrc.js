module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
  ],
  
  plugins: ['react', '@typescript-eslint', 'jest', "import"],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  
  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  "rules": {  
    "no-shadow": 0,   
    "@typescript-eslint/no-shadow": 0,
    "no-unused-expressions": 0,
    "@typescript-eslint/no-unused-expressions": 0,
  },
};
