import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    Button,
    WhiteSpace,
    Toast
} from 'antd-mobile'
import Logo from "../../components/logo/logo"
import {login} from "../../redux/actions"


class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    componentDidUpdate() {
        const {code, msg}=this.props.user
        if (code === 0) {//注册成功
            Toast.success('登录成功', 1);
            this.props.user.code = -1
        } else if (code === 1) {//注册失败
            Toast.fail(msg, 1);
            this.props.user.code = -1
        }
    }

    inputHandler = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    loginHandler = () => {
        console.log(this.state)
        const {username, password}=this.state
        this.props.login({username, password})
    }

    toRegister = () => {
        this.props.history.replace("/register")
    }

    render() {
        const {username, password}=this.state
        const {code, redirectTo}=this.props.user
        if (code === 0) {//注册成功
            return <Redirect to={redirectTo}/>
        }
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
                        <Button type="primary" onClick={this.loginHandler}
                                disabled={username === "" || password === ""}>登陆</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toRegister}>无账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)