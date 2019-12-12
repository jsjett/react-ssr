const bootstrapper = require('react-async-bootstrapper');
const ReactSSR = require('react-dom/server');
const ejs = require('ejs');
const serialize = require('serialize-javascript');
const {Helmet} = require('react-helmet');
/**
 * 获取store的state数据的方法
 * @param app
 */
const getStoreState = (stores) => {
    return Object.keys(stores).reduce((result,storeName) =>{
        result[storeName] = stores[storeName].toJson();
        return result;
    },{})
};

module.exports = (bundle,template,req,res) => {
    return new Promise((resolve,reject) => {
        const routerContext = {};
        const createStoreMap = bundle.createStoreMap;
        const createApp = bundle.default;
        const stores = createStoreMap();
        let appBundle = createApp(stores,routerContext,req.url);
        bootstrapper(appBundle).then(() => {
            const appString = ReactSSR.renderToString(appBundle);
            //有重定向的会在routerContext上增加url
            if(routerContext.url){
                res.status(302).setHeader('Location',routerContext.url);
                res.end();
                return;
            }

            const appStoreState = getStoreState(stores);

            const htmlSeo = Helmet.renderStatic();

            const html = ejs.render(template,{
                initialState:serialize(appStoreState),
                appString:appString,
                title:htmlSeo.title.toString(),
                meta:htmlSeo.meta.toString(),
                style:htmlSeo.style.toString(),
                link:htmlSeo.link.toString()
            });
            res.send(html);
            resolve();
        }).catch(reject)
    })
};