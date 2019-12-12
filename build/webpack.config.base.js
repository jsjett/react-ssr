const path = require('path')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {

    output:{
        path:path.join(__dirname,"../dist"),
        publicPath:'/public/'
    },
    mode: isDev ? 'development':'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.join(__dirname,"../node_modules") //忽略node_modules下面的代码
                ],
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js','.jsx']
    },

    plugins:[]
}

if(!isDev){
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
    )

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css"
        })
    )
}

module.exports = config;