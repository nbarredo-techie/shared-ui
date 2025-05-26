const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "terrabost",
    projectName: "shared-ui",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  // Force externals to override any single-spa defaults
  const config = merge(defaultConfig, {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.mjs"),
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  });

  // Force override externals after merge to ensure they take precedence
  config.externals = {
    react: "react",
    "react-dom": "react-dom",
    "react/jsx-runtime": "react/jsx-runtime",
    "react/jsx-dev-runtime": "react/jsx-dev-runtime",
  };

  return config;
};
