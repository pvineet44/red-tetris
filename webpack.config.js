const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                include : [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(mp3|png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.(woff|woff2)$/,
                loader: 'url-loader',
                // options: {
                //   limit: 4096,
                //   name: './src/assets/fonts/[name].[ext]?[hash]', // was '/fonts/[name].[ext]?[hash]',
                // },
              },              
        ]
    },
    output: {
        publicPath: '/public',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 8080,
        contentBase: "./public",
      }    
}