/**
 * Created by flyTigger on 2019/7/30.
 */
import {combineReducers} from "redux"
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVER_USER,
    RESET_USER,
    USER_LIST,
    MSG_LIST,
    MSG,
    READ_MSG,
} from "./action-types"
import {getRedirectTo} from "../utils"

//用户信息
const initUser = {
    // username: '',
    // type: '',
    // code: -1,
    // msg: '',
    // header: '',
    // redirectTo: ''
    code: -1,
    msg: '',
    redirectTo: '',
    data: ''
}
export function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header}=action.data.data
            console.log("type:", type, "data:", action.data.data)
            return {...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, ...action.data}
        case RECEIVER_USER:
            console.log("reducres:", action.data)
            return action.data
        case RESET_USER:
            let msg = ""
            if (action.data) {
                msg = action.data.msg
            }
            return {...initUser, msg: msg}
        default:
            return state
    }
}

//用户列表
const initUsers = []
export function userList(state = initUsers, action) {
    switch (action.type) {
        case USER_LIST:
            return action.data
        default:
            return state
    }
}


//聊天
const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
export function chat(state = initChat, action) {
    switch (action.type) {
        case MSG_LIST:
            const {users, chatMsgs, _id}=action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === _id ? 1 : 0), 0)
            }
        case MSG:
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data._id ? 1 : 0)
            }
        case READ_MSG:
            const {from, to, count}=action.data
            console.log(from,to,count)
            state.chatMsgs.forEach(msg => {
                if (msg.from === from && msg.to === to && !msg.read) {
                    msg.read = true
                }
            })
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}


export default combineReducers({user, userList, chat})