import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'

import TopicList from "../views/topic-list/index";
import TopicDetail from "../views/topic-detail/index";
import TestAPi from "../views/test/test-api";
export default () => (
    <Switch>
        <Route path="/" key="/" exact render={() => <Redirect to="/list" />} />,
        <Route path="/list" component={TopicList} key="/list" />,
        <Route path="/detail" component={TopicDetail} key="/detail" />,
        <Route path="/test" component={TestAPi} key="/test" />
    </Switch>
)