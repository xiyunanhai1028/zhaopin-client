import React, {Component} from "react"

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    Button,
    WhiteSpace
} from 'antd-mobile'
import Logo from "../../components/logo/logo"

export default class Login extends Component {

    state = {
        username: "",
        password: "",
    }
    inputHandler = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    loginHandler = () => {
        console.log(this.state)
    }

    toRegister = () => {
        this.props.history.replace("/register")
    }

    render() {
        return (
            <div>
                <NavBar>硅谷直聘</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder="请输入用户名"
                            onChange={val => this.inputHandler("username", val)}
                        >用户名：</InputItem>
                        <InputItem
                            placeholder="请输入密码"
                            type="password"
                            onChange={val => this.inputHandler("password", val)}
                        >密码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.loginHandler}>登陆</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toRegister}>无账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}