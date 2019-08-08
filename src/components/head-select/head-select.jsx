import React, {Component} from "react"
import {connect} from "react-redux"
import PopsType from "prop-types"

import {
    Grid
} from "antd-mobile"
import  "./head-select.less"
class HeadSelect extends Component {
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                icon: require(`../../assets/images/头像${i + 1}.png`),
                text: `头像${i + 1}`,
            })
        }
    }

    state = {
        icon: null
    }

    static PropsType = {
        setHeader: PopsType.func.isRequired
    }

    gridHandler = ({text, icon}) => {
        this.setState({icon})
        this.props.setHeader(text)
    }

    render() {
        const {icon}=this.state
        return (
            <div>
                <div className="header-title">请选择图像 <img src={icon} alt=""/></div>
                <Grid columnNum={5} data={this.headerList} onClick={this.gridHandler}></Grid>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(HeadSelect)