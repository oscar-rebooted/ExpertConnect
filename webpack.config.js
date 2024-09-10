const path = require('path');

module.exports = {
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
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
  devtool: 'inline-source-map',
  mode: 'development',
};
