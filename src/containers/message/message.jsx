import React, {Component} from "react"
import QueueAnim from 'rc-queue-anim'
import {connect} from "react-redux"
import {
    List,
    Badge
} from "antd-mobile"

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, _id){
    //找出每个聊天的lastMsg,并保存
    const lastMsgObjs = {}
    chatMsgs.map(msg => {
        //对msg进行个体统计
        if (msg.to === _id && !msg.read) {
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        //得到聊天标识
        const chatId = msg.chat_id
        //获取以保存的里面是否有该数据
        const lastMsg = lastMsgObjs[chatId]
        if (!lastMsg) {//不存在
            lastMsgObjs[chatId] = msg
        } else {//存在
            const unReadCount = msg.unReadCount + lastMsg.unReadCount
            //如果msg比lastMsg晚，替换
            if (msg.create_time > lastMsg.create_time) {
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    })

    //得到所有的lastMsg数组
    const lastMsgs = Object.values(lastMsgObjs)

    //对数组进行排序(降序)
    lastMsgs.sort(function (s1, s2) {
        return s2.create_time - s1.create_time
    })

    return lastMsgs
}

class Message extends Component {



    render() {
        const user = this.props.user.data
        const {users, chatMsgs} = this.props.chat
        const lastMsgs = getLastMsgs(chatMsgs, user._id)
        console.log("lastMsgs---",lastMsgs)
        return (
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <QueueAnim type="scale">
                    {
                        lastMsgs.map(msg => {
                            const targetId = msg.from === user._id ? msg.to : msg.from
                            const targetUser = users[targetId]
                            return (
                                <Item
                                    extra={<Badge text={msg.unReadCount}/>}
                                    key={msg._id}
                                    arrow="horizontal"
                                    thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                    multipleLine
                                    onClick={() => {
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {targetUser.username} <Brief>{msg.content}</Brief>
                                </Item>
                            )
                        })
                    }
                </QueueAnim>
            </List>
        )
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)