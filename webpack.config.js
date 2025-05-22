const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "terraboost",
    projectName: "shared-ui",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
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
  };
};
