import React, {Component} from "react"
import {connect} from "react-redux"
import Cookies from 'js-cookie'
import {
    Result,
    List,
    WhiteSpace,
    Button,
    Modal
} from "antd-mobile"
import {resetUser} from "../../redux/actions"

class Personal extends Component {

    //推出登陸
    outLogin = () => {
        Modal.alert('推出', '确定退出登录吗？', [
            {text: '取消', onPress: () => console.log('cancel'), style: 'default'},
            {text: '确认', onPress: () => {
                Cookies.remove("userId")
                this.props.resetUser()
            }},
        ])
    }

    render() {
        const user = this.props.user.data
        console.log(user)
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/${user.header}.png`)} style={{width: 50}}
                              alt="header"/>}
                    title={user.username}
                    message={user.company}/>
                <List renderHeader={() => "相关信息"}>
                    <List.Item multipleLine>
                        <List.Item.Brief>职位: {user.post}</List.Item.Brief>
                        <List.Item.Brief>简介: {user.info}</List.Item.Brief>
                        {user.salary ? <List.Item.Brief>薪资: {user.salary}</List.Item.Brief> : null}
                    </List.Item>
                    <WhiteSpace/>
                    <Button type="warning" onClick={this.outLogin}>退出登录</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)