module.exports = {
    entry: './entry.js',
    output: {
        //path: __dirname,
        path: './dist',
        publicPath: './dist/',  // for chunks, see: https://github.com/webpack/docs/wiki/configuration#outputpublicpath
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};