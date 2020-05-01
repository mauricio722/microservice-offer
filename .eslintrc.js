module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
    "func-names": "off",
    "no-console": "off",
    "max-len": ["error", 220],
    "newline-before-return": "error",
    "class-methods-use-this": 0,
  },
};
