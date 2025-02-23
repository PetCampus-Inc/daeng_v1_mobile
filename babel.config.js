module.exports = {
  presets: [
    ["module:@react-native/babel-preset", { useTransformReactJSXExperimental: true }],
    "@babel/preset-typescript",
    "nativewind/babel"
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
          "@_app": "./src/app",
          "@_entities": "./src/entities",
          "@_screens": "./src/screens",
          "@_widgets": "./src/widgets",
          "@_shared": "./src/shared"
        }
      }
    ]
  ]
};
