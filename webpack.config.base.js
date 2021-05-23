const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
<<<<<<< HEAD
module.exports = {

=======

module.exports = {
>>>>>>> 540bfa047d29067a4eb399daa00a4f0601fbd1ac
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
<<<<<<< HEAD
        exclude: /node_modules/,
=======
        exclude: /node_modules/
>>>>>>> 540bfa047d29067a4eb399daa00a4f0601fbd1ac
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
<<<<<<< HEAD
=======

>>>>>>> 540bfa047d29067a4eb399daa00a4f0601fbd1ac
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
}