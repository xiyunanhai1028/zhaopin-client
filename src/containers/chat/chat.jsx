import React, {Component} from "react"
import {connect} from "react-redux"
import QueueAnim from 'rc-queue-anim'
import {sendMsg, readMsg} from "../../redux/actions"
import {
    NavBar,
    List,
    InputItem,
    Grid,
    Icon
} from "antd-mobile"
import "./chat.less"

class Chat extends Component {

    state = {
        content: "",
        isShow: false
    }

    componentWillMount() {
        const emoji = [
            "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂",
            "🙂", "🙃", "😉", "😊", "😇", "😍", "😘", "😗",
            "☺", "😚", "😙", "😋", "😛", "😜", "😝", "🤑",
            "🤗", "🤔", "🤐", "😐", "😑", "😶", "😏", "😒"
        ]
        this.emoji = emoji.map(item => ({
            text: item
        }))
    }

    componentDidMount() {
        window.scrollTo(0, document.body.scrollHeight)
        // const from = this.props.match.params.userId
        // const to = this.props.user.data._id
        // this.props.readMsg({from, to})
    }

    componentDidUpdate() {
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        const from = this.props.match.params.userId
        const to = this.props.user.data._id
        this.props.readMsg({from, to})
    }

    //发送消息
    sendHandler = () => {
        this.setState({
            isShow: false
        })
        const from = this.props.user.data._id
        const to = this.props.match.params.userId
        const content = this.state.content.trim()
        if (content) {
            this.props.sendMsg({from, to, content})
            this.setState({content: ""})
        }
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if (isShow) {
            setTimeout(function () {
                window.dispatchEvent(new Event("resize"))
            }, 0)
        }
    }

    render() {
        const user = this.props.user.data;
        console.log("this.props.chat:", this.props.chat)
        const {users, chatMsgs}=this.props.chat

        //获取当前用户ID
        const meId = user._id

        if (!users[meId]) {
            return null
        }

        //获取当前聊天的id
        const targetId = this.props.match.params.userId
        const chatId = [meId, targetId].sort().join("_")
        //过滤
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        //获取对象图像
        const targetHeader = users[targetId].header
        const username = users[targetId].username
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        //获取自己的图像
        const meHeader = users[meId].header
        const meIcon = meHeader ? require(`../../assets/images/${meHeader}.png`) : null

        return (
            <div>
                <NavBar className="nav-bar"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => this.props.history.goBack()}>{username}</NavBar>
                <List onClick={() => this.setState({isShow: false})} style={{marginTop: 40}}>
                    <QueueAnim type="left" delay={100}>
                        {
                            msgs.map(msg => {
                                    if (msg.from === targetId) {//对象
                                        return (
                                            <div className="left-container" key={msg._id}>
                                                <div className="left-text">
                                                    <img className="icon-img" src={targetIcon} alt=""/>
                                                    <span>{msg.content}</span>
                                                </div>
                                            </div>
                                        )
                                    } else {//我的
                                        return (
                                            <div className="right-container" key={msg._id}>
                                                <div className="right-text">
                                                    <img className="icon-img" src={meIcon} alt=""/>
                                                    <span>{msg.content}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            )
                        }
                    </QueueAnim>

                </List>
                <div className="am-tab-bar">
                    <InputItem placeholder="请输入" value={this.state.content}
                               onChange={val => this.setState({content: val})}
                               extra={
                                   <span>
                                       <span onClick={this.toggleShow}>😄</span>
                                       <span onClick={this.sendHandler}>发送</span>
                                   </span>
                               }></InputItem>
                    {
                        this.state.isShow ? (
                                <Grid data={this.emoji} activeStyle={false} columnNum={8} isCarousel={true}
                                      carouselMaxRow={4}
                                      onClick={item => (this.setState({content: this.state.content + item.text}))}/>
                            ) : null
                    }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)