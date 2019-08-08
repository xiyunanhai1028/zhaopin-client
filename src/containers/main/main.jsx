import React, {Component} from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import Cookies from "js-cookie"

import BossInfo from "../boss-info/boss-info"
import DashenInfo from "../dashen-info/dashen-info"
import {getRedirectTo} from "../../utils"
import {getUser} from "../../redux/actions"
import NotFound from "../../components/not-found/not-found"
import Dashen from "../dashen/dashen"
import Laoban from "../laoban/laoban"
import Message from "../message/message"
import Personal from "../personal/personal"
import {NavBar} from 'antd-mobile'
import NavFooter from "../../components/nav-footer/nav-footer"
import Chat from "../../containers/chat/chat"
import "./main.less"
class Main extends Component {

    listNav = [
        {
            path: "/laoban",
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: "/dashen",
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: "/message",
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: "/personal",
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ]

    componentDidMount() {
        //获取cookies中的userId
        const userId = Cookies.get("userId")
        //获取_id
        const {data}=this.props.user
        //userId存在，_id不存在
        if (userId && !data._id) {
            //发送异步请求
            this.props.getUser()
        }
    }

    render() {

        //得到当前请求路径
        let path = this.props.location.pathname

        //获取cookies中的userId
        const userId = Cookies.get("userId")
        //判断userId是否存在
        if (!userId) {//不存在 需要登录
            return <Redirect to="/login"/>
        }
        //存在
        //查看redux中的user中的_id是否存在
        console.log(this.props.user)
        const {data}=this.props.user
        if (!data._id) {//不存在 不显示
            return null
        } else {
            //如果有_id,显示对象的界面
            //如果请求根路径，通过判断重定向
            if (path === "/") {
                path = getRedirectTo(data.type, data.header)
                return <Redirect to={path}/>
            }
        }

        //获取当前的Nav
        const currentNav = this.listNav.find(nav => nav.path === path)
        if (data.type === "laoban") {
            this.listNav[1].hide = true
        } else if (data.type === "dashen") {
            this.listNav[0].hide = true
        }
        const unReadCount = this.props.unReadCount
        return (
            <div>
                {currentNav ? <NavBar className="nav-bar">{currentNav.title}</NavBar> : null}
                <Switch>
                    <Route path="/laobaninfo" component={BossInfo}/>
                    <Route path="/dasheninfo" component={DashenInfo}/>
                    <Route path="/chat/:userId" component={Chat}/>
                    {
                        this.listNav.map((nav, key) => <Route path={nav.path} component={nav.component} key={key}/>)
                    }
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter listNav={this.listNav} unReadCount={unReadCount}></NavFooter> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)