/*
 * @Author: jett 
 * @Date: 2019-08-27 22:44:26 
 * @Last Modified by: jett
 * @Last Modified time: 2019-08-28 23:43:47
 */

const axios = require('axios');
const webpack = require('webpack');
const path = require('path');
const MemoryFs = require('memory-fs');
const serverConfig = require('../../build/webpack.config.server.js');
const proxy = require('http-proxy-middleware');

const serverRender = require('./server-render');

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
let serverBundle;
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({},(err,stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(war => console.warn(war));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );//转发静态文件代理
    //从内存中获取打包生成的server-entry.js
    const bundle = mfs.readFileSync(bundlePath,'utf-8');
    const m = getModuleFromString(bundle,"server-entry.js");
    serverBundle = m.exports;
});

//从开发环境服务获取server.ejs模板
const getTemplate = () => {
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:8888/public/server.ejs').then(res => {
            resolve(res.data);
        }).catch(reject)
    })
};

const NativeModule = require('module');
const vm = require('vm');

/**
 * 解决依赖包找不到的问题
 */
const getModuleFromString = (bundle,filename) => {
    const m = {exports:{}};
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper,{
        filename:filename,
        displayErrors:true
    });

    const result = script.runInThisContext();
    result.call(m.exports,m.exports,require,m);
    return m;
};


module.exports = (app) => {

    //转发静态文件代理
    app.use('/public',proxy({
        target:'http://localhost:8888'
    }));

    app.get('*',(req,res,next) => {

        if(!serverBundle){
            return res.send("请等待...编译，稍后刷新")
        }

        getTemplate().then((template) => {
            return serverRender(serverBundle,template,req,res);
        }).catch(next)
    })
};