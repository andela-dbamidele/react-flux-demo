const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: path.join(__dirname, 'client/main.jsx'),
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs',
            'transform-decorators-legacy',
            'transform-class-properties'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=100000',
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?' +
          'bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    path: `${__dirname}/client/assets/js`,
    filename: 'scripts.min.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '../css/style.css',
      allChunks: true
    })
  ]
};
