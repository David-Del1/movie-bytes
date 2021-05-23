const { merge } = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
<<<<<<< HEAD
    reportFilename: 'bundle_sizes.html'
=======
    reportFilename: 'bundle-sizes.html'
>>>>>>> 540bfa047d29067a4eb399daa00a4f0601fbd1ac
  })],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})