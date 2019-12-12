const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

const config = webpackMerge(baseConfig,{
    entry:{
        app:path.join(__dirname,'../client/client-entry.js')
    },
    output:{
        filename:'[name].[hash].js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../client/template.html'),
            favicon:path.join(__dirname,'../favicon.ico')
        }),
        new HtmlWebpackPlugin({
            template: '!!ejs-compiled-loader!'+path.join(__dirname,'../client/server.template.ejs'),
            filename: 'server.ejs'
        })
    ]
})

if(isDev){
    config.devServer = {
        host:'0.0.0.0',
        port:8888,
        hot:true,
        contentBase:path.join(__dirname,'../dist'),
        overlay:true,
        publicPath:'/public/',
        historyApiFallback:{
            index:'/public/index.html'
        },
        proxy:{
            '/api':'http://localhost:3333'
        }
    },
    config.module.rules.push(
        { test:/\.css$/,use: ['style-loader', 'css-loader']}, //匹配所有已.css结尾的文件
        { test:/\.less$/,use: ['style-loader', 'css-loader','less-loader']}
    )
}else{
    config.entry = {
        app:path.join(__dirname,'../client/client-entry.js'),
        vendor:[    //将这些包分别打包出来
            'antd',
            'axios',
            'body-parser',
            'mobx',
            'mobx-react',
            'prop-types',
            'query-string',
            'react-dom',
            'react-router-dom'
        ]
    }

    config.output.filename = '[name].[chunkhash].js';
    config.optimization = {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
        splitChunks:{
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: Infinity
                }
            }
        }
    }

}

module.exports = config;