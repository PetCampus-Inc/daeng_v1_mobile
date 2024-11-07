import reactNative from "@react-native/eslint-config";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/", "build/"]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...reactNative.globals
      }
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      import: importPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": "error",
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
            "type"
          ],
          pathGroups: [
            {
              pattern: "@_app/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@_entities/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@_screens/**",
              group: "internal",
              position: "before"
            },
            {
              pattern: "@_shared/**",
              group: "internal",
              position: "before"
            }
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn"
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  },
  {
    files: ["*.js", "*.cjs"],
    rules: {
      "@typescript-eslint/no-var-requires": "off"
    }
  },
  prettierConfig
];
