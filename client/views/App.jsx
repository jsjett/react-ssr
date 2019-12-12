
import React from 'react';
import {Link} from 'react-router-dom';
import Routes from '../config/router';


class App extends React.Component{
    render() {
        return <>
            <div key='1'>
                <Link to="/">首页</Link>
                <Link to="/detail">详情页</Link>
            </div>
            <Routes key="2" />
        </>
    }
}

export default App
