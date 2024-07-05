module.exports = {
  presets: ["module:@react-native/babel-preset", "@babel/preset-typescript"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json"
        ],
        alias: {
          "~": "./src",
          "@config": "./src/config",
          "@services": "./src/services",
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils"
        }
      }
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env"
      }
    ]
  ]
};
