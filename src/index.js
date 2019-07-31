/**
 * Created by flyTigger on 2019/7/30.
 */
import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import store from "./redux/store"
import {Switch, Route, HashRouter} from "react-router-dom"

import Register from "./containers/register/register"
import Login from "./containers/login/login"
import Main from "./containers/main/main"

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/register" component={Register}></Route>
                <Route path="/login" component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById("root"))