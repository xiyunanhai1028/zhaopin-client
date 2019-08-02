/**
 * Created by flyTigger on 2019/7/30.
 */
import {reqRegister, reqLogin} from "../api/index"
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types"


const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

const errorMsg = (user) => ({type: ERROR_MSG, data: user})

export function register(user) {
    return async dispatch => {
        const response = await reqRegister(user)
        const result = response.data
        console.log("result:", result)
        if (result.code === 0) {//成功
            dispatch(authSuccess(result))
        } else {//失败
            dispatch(errorMsg(result))
        }
    }
}

export function login({username, password}) {
    return async dispatch => {
        const response = await reqLogin({username, password})
        const result = response.data
        if (result.code === 0) {//登录成功
            dispatch(authSuccess(result))
        } else {//登录失败
            dispatch(errorMsg(result))
        }
    }

}