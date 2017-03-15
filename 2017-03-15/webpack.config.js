var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: [
        './client/app.tsx',
    ],
    // Output the bundled JS to dist/app.js
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist', 'client')
    },
    module: {
        loaders: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2016&presets[]=es2015&presets[]=react!ts-loader'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2016', 'es2015', 'react']
            }
        }, {
            test: /\.css/,
            loader: 'style-loader!css-loader'
        }, ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist', 'client'),
        inline: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8181',
                secure: false
            }
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'client/index.html'
        }])
    ]

}