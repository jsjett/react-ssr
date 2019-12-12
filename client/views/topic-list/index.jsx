import React from 'react'
import {observer,inject} from 'mobx-react'
import PropTypes from 'prop-types'
import {AppState} from '../../store/app-state'
import Helmet from "react-helmet";
import {Button} from 'antd';

@inject('appState')
@observer
class TopicList extends React.Component{

    constructor(props){
        super(props);
        this.changeName = this.changeName.bind(this);
    }

    bootstrap(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                this.props.appState.count = 3;
                resolve(true);
            },500)
        })
    }

    changeName(){
        this.props.appState.changeName();
    }

    render() {

        return (
            <div>
                <Helmet>
                    <title>这是我的测试标题</title>
                    <meta name="description" content="这是我的meta测试描述的东西" />
                </Helmet>
                <div>
                    <Button type="primary">点我</Button>  
                </div>
                <div>
                    this is topic list
                    <button onClick={this.changeName}>click me</button>
                </div>
                <div>
                    {this.props.appState.msg}
                </div>
            </div>
        )
    }
}

TopicList.propTypes = {
    appState:PropTypes.instanceOf(AppState)
}


export default TopicList