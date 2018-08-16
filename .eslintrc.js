"use strict";
module.exports = {
  extends: ["eslint:recommended", "prettier", "prettier/react"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "2018",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
