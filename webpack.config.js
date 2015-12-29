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
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},
            {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.woff(\d+)?$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.md$/, loader: "html!markdown"}
        ]
    }
};