module.exports = {
  env: {
    es6: true,
    mocha: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:mocha/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2017,
  },
  plugins: ["mocha"],
};
