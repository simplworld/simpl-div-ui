var webpack = require('webpack')

var path = require('path')
var glob = require('glob')

var BundleTracker = require('webpack-bundle-tracker')

var entry_points = {
  common: [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-recycle',
    'history',
    'ws',
    'simpl-react',
  ],
}

glob.sync('js/*.js').forEach(function(_path) {
  var filename = _path.split('/').slice(-1)[0]
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
    entry_points[filename.split('.')[0]] = path.resolve(
      _path
        .split('.')
        .slice(0, -1)
        .join('.')
    )
  }
})

process.stdout.write('Entry points: ' + JSON.stringify(entry_points) + '\n')

var config = {
  context: __dirname,
  entry: entry_points,
  output: {
    path: path.resolve('./staticfiles/webpack_bundles/'),
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name]-[hash].js'
        : '[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  node: {
    fs: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        enforce: 'pre',
        loader: 'html-loader!markdown-loader',
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: { emitWarning: true },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'js'),
          path.resolve(__dirname, 'node_modules', 'utf-8-validate'),
          path.resolve(__dirname, 'node_modules', 'ws', 'lib'),
        ],
      },
    ],
    noParse: [/\.min\.js/, /\.md/],
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
}

if (process.env.NODE_ENV === 'production') {
  config.output.filename = '[name]-[hash].js'
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      name: 'common',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new BundleTracker({ filename: './webpack-stats.json' }),
  ]
} else {
  config.output.filename = '[name].bundle.js'
  config.devtool = 'cheap-module-eval-source-map'
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 3,
      name: 'common',
    }),
    new BundleTracker({ filename: './webpack-stats-dev.json' }),
  ]
}

module.exports = config
