var webpack = require('webpack');

module.exports = {
    entry: {
        app: './own-module/entry.js',
        vendor: ['promise-light']
    },
    output: {
        path: './dist',
        publicPath: './dist/',  // for chunks, see: https://github.com/webpack/docs/wiki/configuration#outputpublicpath
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};