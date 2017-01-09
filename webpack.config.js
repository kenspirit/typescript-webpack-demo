var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

module.exports = {
    context: __dirname + '/build/src',
    entry: {
      index: './client/index'
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    resolve: {
      alias: {
        'bootstrap.css': path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css')
      },
      root: __dirname,
      extensions: ['', '.css', '.js']
    },
    module: {
      loaders: [
        {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
            loader: require.resolve("url-loader") + '?name=[name]-[hash].[ext]' + '&limit=3' // set a small limit to force CSS link to font and image file
        }
        , { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: __dirname + '/build/src/client/index.html',
        chunks: ['index']
      })
      // , new webpack.optimize.CommonsChunkPlugin('commons', 'commons.js')
      , new ExtractTextPlugin('[name].css', {
        allChunks: true
      })
    ],
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000/api/',
        secure: false
      }
    }
}
