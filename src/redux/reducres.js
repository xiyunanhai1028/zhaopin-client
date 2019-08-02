/**
 * Created by flyTigger on 2019/7/30.
 */
import {combineReducers} from "redux"
import {AUTH_SUCCESS, ERROR_MSG} from "./action-types"

const initUser = {
    username: '',
    type: '',
    code: -1,
    msg: ''
}
export function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, ...action.data}
        case ERROR_MSG:
            return {...state,...action.data}
        default:
            return state
    }
}

export default combineReducers({user})