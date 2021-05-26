"use strict";
/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
