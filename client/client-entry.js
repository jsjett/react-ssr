import React from 'react'
import ReactDOM from 'react-dom'
import App from "./views/App"
import { BrowserRouter} from 'react-router-dom'
import {Provider} from 'mobx-react';
import AppState from "./store/app-state";
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

const initialState = window.__INITIAL_STATE || {};

renderMethod(
    <Provider appState={new AppState(initialState.appState)}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);