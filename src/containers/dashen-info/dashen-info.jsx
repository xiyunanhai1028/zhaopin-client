import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"

import {
    NavBar,
    List,
    InputItem,
    TextareaItem,
    Button,
    Toast
} from "antd-mobile"

import HeadSelect from "../../components/head-select/head-select"
import {updataInfo} from "../../redux/actions"

class DashenInfo extends Component {

    state = {
        header: "",
        post: "",
        info: "",
        company: "",
        salary: "",
    }

    componentDidUpdate() {
        console.log("boosInfo", this.props.user)
        const {code, msg}=this.props.user
        if (code === 0) {
            Toast.success('更新成功', 1)
            this.props.user.code = -1
        } else if (code === 1) {
            Toast.fail(msg, 1);
            this.props.user.code = -1
        }
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    inputHandler = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    saveInfo = () => {
        console.log(this.state)
        this.props.updataInfo(this.state)
    }

    render() {
        // console.log("render:",this.props.user)
        const {code}=this.props.user
        if (code === 0) {
            return <Redirect to="/dashen"/>
        }

        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeadSelect setHeader={this.setHeader}></HeadSelect>
                <List>
                    <InputItem onChange={val => {
                        this.inputHandler("post", val)
                    }}>求职岗位：</InputItem>
                    <TextareaItem rows="4" title="个人简介：" onChange={val => {
                        this.inputHandler("info", val)
                    }}></TextareaItem>
                </List>
                <Button type="primary" onClick={this.saveInfo}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {updataInfo}
)(DashenInfo)