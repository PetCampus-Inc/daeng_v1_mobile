module.exports = {
  presets: ["module:@react-native/babel-preset", "@babel/preset-typescript", "nativewind/babel"],
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
          "~": "./src"
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
