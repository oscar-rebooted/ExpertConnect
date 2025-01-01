const path = require('path');

module.exports = {
  entry: {
    main: './electron/main.tsx',
    render: './src/renderer.tsx'
  },
  target: 'electron-main', // Specify Electron as the target environment
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'), // Point "@" to "src"
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    filename: '[name].js',
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
  node: {
    __dirname: false,
    __filename: false,
  },
  mode: 'production',
};
