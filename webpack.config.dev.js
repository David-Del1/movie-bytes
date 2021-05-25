const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000,
    // proxy: {
    //   '/auth': 'http://localhost:8001/api/auth',
    // },
  },
  devtool: 'source-map',
  // disableHostCheck: true

})