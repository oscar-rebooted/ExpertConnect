const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/renderer.tsx',
    target: 'web', // Specify Electron as the target environment
    resolve: {
      alias: {
          '@': path.resolve(__dirname, 'src'), // Point "@" to "src"
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, isProduction ? 'dist' : 'temp'),
      publicPath: isProduction ? '/ExpertConnect/' : '/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/, // Handles CSS files
          use: [
            'style-loader', // Injects CSS into the DOM
            'css-loader',   // Translates CSS into CommonJS modules
            'postcss-loader', // Processes CSS with PostCSS (and Tailwind)
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,  // Regular expression to match image file types
          use: [
            {
              loader: 'file-loader',  // Use file-loader to handle image files
              options: {
                name: '[path][name].[ext]',  // Keep the file name and extension
                outputPath: 'assets/',  // Output directory for the images
              },
            },
          ],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // Serve index.html from here
      }, 
      compress: true,
      port: 3000,
      hot: true,
      open: true
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],  
  };
};