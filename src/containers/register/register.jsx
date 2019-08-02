import React, {Component} from "react"
import {connect} from "react-redux"
// import {Redirect} from "react-router-dom"

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    Radio,
    Button,
    WhiteSpace,
    Toast
} from 'antd-mobile'
import Logo from "../../components/logo/logo"
import {register} from "../../redux/actions"
const ListItem = List.Item
class Register extends Component {

    state = {
        username: "",
        password: "",
        password2: "",
        type: "dashen"
    }

    inputHandler = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    componentDidUpdate() {
        const {code, msg}=this.props.user
        if (code === 0) {//注册成功
            Toast.success('注册成功', 1);
            this.toLogin()
        } else if (code === 1) {//注册失败
            Toast.fail(msg, 1);
        }
    }

    registerHandler = () => {
        const {username, password, password2, type}=this.state
        if (password !== password2) {
            Toast.fail('两次密码不一致', 1);
            return
        }
        this.props.register({username, password, type})
    }

    toLogin = () => {
        this.props.history.replace("/login")
    }


    render() {
        const {username, password, password2, type}=this.state
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
                        <InputItem
                            placeholder="请输入确认密码"
                            type="password"
                            onChange={val => this.inputHandler("password2", val)}
                        >确认密码：</InputItem>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === "dashen"}
                                   onChange={() => this.inputHandler("type", "dashen")}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === "laoban"}
                                   onChange={() => this.inputHandler("type", "laoban")}>老板</Radio>
                        </ListItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.registerHandler}
                                disabled={username === "" || password === "" || password2 === ""}>注册</Button>
                        <WhiteSpace></WhiteSpace>
                        <Button onClick={this.toLogin}>已有账号</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)