module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:boundaries/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "boundaries"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    extends: ["plugin:boundaries/recommended"],
    "boundaries/ignore": ["**/tests/"],
    "boundaries/elements": [
      {
        type: "controllers",
        pattern: "src/controllers",
      },
      {
        type: "services",
        pattern: "src/services",
      },
      {
        type: "middlewares",
        pattern: "src/middlewares",
      },
      {
        type: "repositories",
        pattern: "src/repositories",
      },
      {
        type: "routers",
        pattern: "src/routers",
      },
      {
        type: "config",
        pattern: "src/config",
      },
    ],
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-shadow": "off",
    "no-console": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "lines-between-class-members": "off",
    "no-use-before-define": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    "object-curly-spacing": ["error", "always"],
    "max-statements-per-line": ["error", { max: 1 }],
    "no-multi-spaces": ["error"],
    "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
    "no-case-declarations": "off",
    "no-extra-boolean-cast": "error",

    //Typescript
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true,
        },
      },
    ],
  },
};
