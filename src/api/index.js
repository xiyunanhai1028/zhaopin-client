/**
 * Created by flyTigger on 2019/8/1.
 */
import ajax from "./ajax"

//注册
export const reqRegister = (user) => ajax("/register", user, "POST")

//登录
export const reqLogin = (user) => ajax("/login", user, "POST")

//更新用户信息
export const updatInfo = (user) => ajax("/updateInfo", user, "POST")

//获取用户信息
export const reqUser = () => ajax("/user")

//获取用户列表
export const reqUserList = (type) => ajax("/userList", {type})

//获取消息列表
export const reqMsgList = () => ajax("/chatList")

//修改指定消息为已读
export const reqReadMsg = (from) => ajax("/readmsg", {from}, "POST")