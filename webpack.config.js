const path = require('path');

module.exports = {
  entry: './src/renderer.tsx',
  target: 'electron-main', // Specify Electron as the target environment
  resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src'), // Point "@" to "src"
    },
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      path: false,
      util: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    
    contentBase: path.join(__dirname, 'public'), // Serve index.html from here    
    compress: true,
    port: 3000,
    hot: true,
    open: true
  },
  devtool: 'inline-source-map',
  mode: 'development',
};
