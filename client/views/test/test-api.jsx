import React from 'react'
import axios from 'axios'
export default class TestAPi extends React.Component{

    handleTopics = () => {
        axios.get('/api/topics').then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    handleLogin = () => {
        axios.post('/api/user/login',{
            accessToken:'baa2fa68-2469-470f-bd6b-e49b933d7c78'
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    handleMark = () => {
        axios.post('/api/message/mark_all?needAccessToken=true').then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleTopics}>topics</button>
                <button onClick={this.handleLogin}>login</button>
                <button onClick={this.handleMark}>mark_all</button>
                <button>点击</button>
            </div>
        );
    }
}
