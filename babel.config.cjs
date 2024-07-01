module.exports = {
  presets: [
    "module:@react-native/babel-preset",
    "@babel/preset-react",
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" } }]
  ],
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
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils"
        }
      }
    ]
  ]
};
