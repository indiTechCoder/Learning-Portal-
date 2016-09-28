const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './client/index',
        'webpack-hot-middleware/client?reload=true'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    eslint: {
        configFile: './.eslintrc'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'eslint-loader'],
       include: path.join(__dirname, 'client')
    }
        ],

    },
    assets: {
        publicPath: '/static/',
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        noInfo: true
    }
};