const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000,
    proxy: {
      '/api': 'http://localhost:8001',
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
  // disableHostCheck: true

})