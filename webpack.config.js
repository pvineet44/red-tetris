const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'], //[ts-loader] -> ok for ts files but not tsx
                include : [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    output: {
        publicPath: '/public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/public')
    },

}