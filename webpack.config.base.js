const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new NetlifyPlugin({
      redirects: [
        {
          from: '/api/*',
          to: 'https://still-brushlands-56791.herokuapp.com/api/:splat',
          status: 200,
          force: true,
          conditions: {
            role: ['admin', 'cms'],
          },
        },
        {
          from: '/*',
          to: '/index.html',
          status: 200,
          force: true,
          conditions: {
            role: ['admin', 'cms'],
          },
        },
      ],
    }),
  ],
};
