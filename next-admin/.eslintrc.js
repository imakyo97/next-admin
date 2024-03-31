const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["src", path.resolve(__dirname, "./src")],
          ["generated", path.resolve(__dirname, "./src/__generated__")],
          ["app", path.resolve(__dirname, "./src/app")],
          ["components", path.resolve(__dirname, "./src/components")],
          ["generated_rest", path.resolve(__dirname, "./src/generated_rest")],
          ["gqls", path.resolve(__dirname, "./src/gqls")],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
    "import/ignore": "node_modules",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "unused-imports", "import"],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
