const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require("webpack").container;
const packages = require("./package.json");

module.exports = {
    mode: 'development',
    devServer: {
        port: 3003,
        open: true,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    resolve: {
        extensions: ['.js', '.vue']
    },    module: {
        rules: [
            {
                test: /.vue$/,
                use: 'vue-loader'
            },
            {
                test: /.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: "VueApp",
            filename: "remoteEntry.js",
            exposes: {
                "./VueApp": "./src/index"
            },
        })
    ]
}
