import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // Added import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/shared-ui.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'shared-ui.js', // Output filename
      library: {
        type: 'module', // Output as ES module
      },
      publicPath: '/', // Ensure correct asset paths for dev server
    },
    experiments: {
      outputModule: true, // Enable ESM output
    },
    resolveLoader: { // Added resolveLoader
      modules: ['node_modules'],
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    module: {
      rules: [
        {
          test: /\\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { // Ensure Babel options are set here
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Extracts CSS in prod, injects in dev
            'css-loader', // Reads CSS files
            'postcss-loader', // Processes CSS with PostCSS (for Tailwind)
          ],
        },
        {
          test: /\\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({ // Added plugin instance
        title: 'Shared UI', // You can customize the title
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ].filter(Boolean), // Filter out falsy values (like MiniCssExtractPlugin in dev)
    externals: {
      // These are provided by the import map in the root-config or another shared dependency
      'react': 'react',
      'react-dom': 'react-dom',
      'react-dom/client': 'react-dom/client',
      '@rewind-ui/core': '@rewind-ui/core',
      'single-spa': 'single-spa',
      'single-spa-react': 'single-spa-react',
    },
    devServer: {
      port: 5173, // You can choose any port
      headers: {
        'Access-Control-Allow-Origin': '*', // For CORS during development
      },
      compress: true,
      historyApiFallback: true, // Important for SPAs
    },
  };
};
