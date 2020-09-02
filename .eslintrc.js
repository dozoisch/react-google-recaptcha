"use strict";
/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "prettier", "prettier/react"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "2020",
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
