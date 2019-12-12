import React from 'react'
import App from './views/App'
import {StaticRouter} from 'react-router-dom'
import {Provider,useStaticRendering} from 'mobx-react';
import {createStoreMap} from './store/store';
useStaticRendering(true);
export default (stores,routerContext,url) => {
    return (
        <Provider {...stores}>
            <StaticRouter context={routerContext} location={url}>
                <App />
            </StaticRouter>
        </Provider>  
    )
}

export {
    createStoreMap
}