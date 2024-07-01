module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: ["@react-native", "prettier"],
  plugins: ["import"],
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": ["off", "error", "ignorePackages"],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type",
          "unknown"
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin"
          },
          {
            pattern: "@screens/*",
            group: "unknown"
          },
          {
            pattern: "@components/*",
            group: "unknown"
          },
          {
            pattern: "@hooks/*",
            group: "unknown"
          },
          {
            pattern: "@utils/*",
            group: "unknown"
          }
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "react/react-in-jsx-scope": "off"
  }
};
