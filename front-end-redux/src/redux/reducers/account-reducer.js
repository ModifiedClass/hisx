
import storeUtils from '../../utils/storeUtils'
import {
    SET_BREAD_CRUM,
    RECEIVE_USER,
    RESET_USER,
    GET_DEPARTMENT,
    COU_DEPARTMENT,
    DEL_DEPARTMENT,
    GET_GROUP,
    COU_GROUP,
    DEL_GROUP,
    GET_USER,
    COU_USER,
    DEL_USER,
    REC_PWD
 } from '../actiontypes'

//管理面包屑
const initBreadCrum='仪表盘'
export const breadCrum=(state=initBreadCrum,action)=>{
    switch(action.type){
        case SET_BREAD_CRUM:
            return action.data
        default:
            return state
    }
}

//管理登陆用户
const initUser=storeUtils.getUser()
export const user=(state=initUser,action)=>{
    switch(action.type){
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {}
        default:
            return state
    }
}

//管理部门
export const departmentReducer=(state={},action)=>{
    switch(action.type){
        case GET_DEPARTMENT:
            return {
                ...state,
                data:action.data
            }
        case COU_DEPARTMENT:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_DEPARTMENT:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}

//管理组
export const groupReducer=(state={},action)=>{
    switch(action.type){
        case GET_GROUP:
            return {
                ...state,
                data:action.data
            }
        case COU_GROUP:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_GROUP:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}

//管理用户
export const userReducer=(state={},action)=>{
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                data:action.data
            }
        case COU_USER:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_USER:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case REC_PWD:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}