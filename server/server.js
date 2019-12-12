/*
 * @Author: jett
 * @Date: 2019-08-27 22:44:36
 * @Last Modified by: jett
 * @Last Modified time: 2019-08-30 21:23:56
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const isDev = process.env.NODE_ENV === 'development';
const app = express();
const serverRender = require('./utils/server-render');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    maxAge:10*60*1000, //十分钟
    name:'tid',
    resave:false,
    saveUninitialized:false,
    secret:"cnode react class"
}));
app.use(favicon(path.join(__dirname,'../favicon.ico')));
app.use('/api/user',require('./utils/handle-login'));
app.use('/api',require('./utils/proxy'));

if(isDev){
    const staticRender = require("./utils/static-render");
    staticRender(app);
}else {
    const serverEntry = require('../dist/server-entry');
    //读取打包生成的server.ejs模板
    const template = fs.readFileSync(path.join(__dirname,"../dist/server.ejs"),"utf-8");
    //将前缀是/public的请求静态文件夹设置到dist目录
    app.use("/public",express.static(path.join(__dirname,"../dist")));

    app.get("*",(req,res,next) => {
        serverRender(serverEntry,template,req,res).catch(next);
    })
}

//全局处理错误的机制
app.use(function (error,req,res,next) {
    console.error(error);
    res.status(500).send(error);
});

app.listen(3333,function () {
    console.log("server is start at port 3333")
});
