module.exports = {
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    semi: ["error", "never"],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
      },
    ],
    quotes: ["error", "double"],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
}
