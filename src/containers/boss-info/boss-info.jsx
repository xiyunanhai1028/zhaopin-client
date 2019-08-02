import React, {Component} from "react"
import {connect} from "react-redux"

import {
    NavBar,
    List,
    InputItem,
    TextareaItem,
    Button,
} from "antd-mobile"

import HeadSelect from "../../components/head-select/head-select"

class BossInfo extends Component {

    state = {
        header: "",
        post: "",
        info: "",
        company: "",
        salary: "",
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
    }

    render() {
        return (
            <div>
                <NavBar>老板信息完善</NavBar>
                <HeadSelect setHeader={this.setHeader}></HeadSelect>
                <List>
                    <InputItem onChange={val => {
                        this.inputHandler("post", val)
                    }}>招聘职位：</InputItem>
                    <InputItem onChange={val => {
                        this.inputHandler("company", val)
                    }}>公司名称：</InputItem>
                    <InputItem onChange={val => {
                        this.inputHandler("salary", val)
                    }}>职位薪资：</InputItem>
                    <TextareaItem rows="4" title="职位要求：" onChange={val => {
                        this.inputHandler("info", val)
                    }}></TextareaItem>
                </List>
                <Button type="primary" onClick={this.saveInfo}>保存</Button>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(BossInfo)