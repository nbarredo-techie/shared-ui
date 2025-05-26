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

  return merge(defaultConfig, {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    devServer: {
      hot: true,
      liveReload: true,
    },
    // Use single-spa defaults and add JSX runtime externals
    externals: [
      ...defaultConfig.externals,
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  });
};
