const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = webpackMerge(baseConfig,{
    target: "node",
    entry:{
        app:path.join(__dirname,'../client/server-entry.js')
    },
    externals:Object.keys(require('../package.json').dependencies),
    output:{
        filename:'server-entry.js',
        libraryTarget: "commonjs2"
    }
})

if(isDev){
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
    ),
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css"
        })
    )
}



module.exports = config;