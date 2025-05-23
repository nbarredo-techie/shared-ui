const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "terraboost",
    projectName: "shared-ui",
    webpackConfigEnv,
    argv,
    outputSystemJS: false, // This often means externals aren't set up by default for react
  });

  return {
    ...defaultConfig, 
    resolve: {
      ...defaultConfig.resolve,
      alias: {
        ...defaultConfig.resolve?.alias,
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      ...defaultConfig.module,
      rules: [
        ...(defaultConfig.module?.rules?.filter(
          (rule) => !rule.test || !rule.test.toString().includes("css")
        ) || []),
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
              },
            },
          ],
        },
      ],
    },
    // Add or override the devServer configuration
    devServer: {
      ...defaultConfig.devServer, // Spread existing devServer config from singleSpaDefaults
      port: 8081, // Set the port to 8081
    },
    plugins: [
      ...(defaultConfig.plugins || []),
      new ModuleFederationPlugin({
        name: "shared_ui",
        filename: "remoteEntry.js",
        exposes: {
          "./react": "react",
          "./react-dom": "react-dom",
          "./react-dom/client": "react-dom/client",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: defaultConfig.externals.find(
              (external) => external === "react" || (typeof external === "object" && external.react)
            )?.react || require("./package.json").dependencies.react || require("./package.json").devDependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: defaultConfig.externals.find(
              (external) => external === "react-dom" || (typeof external === "object" && external["react-dom"])
            )?.["react-dom"] || require("./package.json").dependencies["react-dom"] || require("./package.json").devDependencies["react-dom"],
          },
          "react-dom/client": {
            singleton: true,
            requiredVersion: require("./package.json").dependencies["react-dom"] || require("./package.json").devDependencies["react-dom"],
          },
        },
      }),
    ],
  };
};
