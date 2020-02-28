/*
根据旧state和action生成返回新state
*/
import {combineReducers} from 'redux'
import storeUtils from '../utils/storeUtils'
import {
    SET_BREAD_CRUM,
    RECEIVE_USER,
    RESET_USER
    } from './actiontypes'
//管理面包屑
const initBreadCrum='仪表盘'
function breadCrum(state=initBreadCrum,action){
    switch(action.type){
        case SET_BREAD_CRUM:
            return action.data
        default:
            return state
    }
}

//管理登陆用户
const initUser=storeUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    breadCrum,
    user
})