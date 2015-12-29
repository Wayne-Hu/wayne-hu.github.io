var path = require('path');

module.exports = {
    entry: {
        index: __dirname + '/src/entry.jsx'
    },
    output: {
        path: path.join(__dirname, '/js/'),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
                exclude: 'node_modules',
                // Options to configure babel with
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {test: /\.css$/, loader: "style!css"}
        ]
    }
};