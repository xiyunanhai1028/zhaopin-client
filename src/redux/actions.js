/**
 * Created by flyTigger on 2019/7/30.
 */
import io from 'socket.io-client'
import {reqRegister, reqLogin, updatInfo, reqUser, reqUserList, reqMsgList, reqReadMsg} from "../api/index"
import {AUTH_SUCCESS, ERROR_MSG, RECEIVER_USER, RESET_USER, USER_LIST, MSG_LIST, MSG, READ_MSG} from "./action-types"


const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

const errorMsg = (user) => ({type: ERROR_MSG, data: user})

const receiverUser = (user) => ({type: RECEIVER_USER, data: user})

export const resetUser = (user) => ({type: RESET_USER, data: user})

const userList = (users) => ({type: USER_LIST, data: users})

const msgList = ({users, chatMsgs, _id}) => ({type: MSG_LIST, data: {users, chatMsgs, _id}})

const msg = (chatMsg, _id) => ({type: MSG, data: {chatMsg, _id}})

const isReadMsg = (from, to, count) => ({type: READ_MSG, data: {from, to, count}})

//初始化socket
function initIo(_id, dispatch) {
    if (!io.socket) {
        //链接服务器，获取一个Socket对象
        io.socket = io("ws://localhost:4000")
        //接收服务端消息
        io.socket.on("receiveMsg", function (chatMsg) {
            console.log('浏览器端接收到消息:', chatMsg)
            if (chatMsg.from === _id || chatMsg.to === _id) {
                dispatch(msg(chatMsg, _id))
            }
        })
    }

}

//发送消息
export function sendMsg({from, to, content}) {
    return async dispatch => {
        //发送消息
        io.socket.emit("sendMsg", {from, to, content})
    }
}

//已读
export function readMsg({from, to}) {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        console.log("result--", result)
        if (result.code === 0) {
            console.log(from, to, result.data)
            dispatch(isReadMsg(from, to, result.data))
        }
    }
}

//注册
export function register(user) {
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        console.log("result:", result)
        if (result.code === 0) {//成功
            getMsgList(result.data._id, dispatch)
            dispatch(authSuccess(result))
        } else {//失败
            dispatch(errorMsg(result))
        }
    }
}

//登录
export function login({username, password}) {
    return async dispatch => {
        const response = await reqLogin({username, password})
        const result = response.data
        if (result.code === 0) {//登录成功
            getMsgList(result.data._id, dispatch)
            dispatch(authSuccess(result))
        } else {//登录失败
            dispatch(errorMsg(result))
        }
    }

}

//更新用户信息
export function updataInfo(user) {
    return async dispatch => {
        const response = await updatInfo(user)
        const result = response.data
        if (result.code === 0) {//更新成功
            dispatch(receiverUser(result))
        } else {//更新失败
            dispatch(resetUser(result))
        }
    }

}

//获取用户信息
export function getUser() {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data;
        if (result.code === 0) {
            getMsgList(result.data._id, dispatch)
            dispatch(receiverUser(result))
        } else {
            dispatch(resetUser(result))
        }
    }
}

//获取用户列表
export function getUserList(type) {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(userList(result.data))
        }
    }

}

//获取消息列表
async function getMsgList(_id, dispatch) {
    initIo(_id, dispatch)
    const response = await reqMsgList()
    const result = response.data
    if (result.code === 0) {
        const {users, chatMsgs}=result.data
        dispatch(msgList({users, chatMsgs, _id}))
    }
}