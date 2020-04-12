/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
import {
    SET_BREAD_CRUM,
    RECEIVE_USER,
    RESET_USER
} from './actiontypes'

import storeUtils from '../utils/storeUtils'
import {cLogin} from '../api'
//设置面包屑同步action
export const setBreadCrum=(breadCrum)=>({type:SET_BREAD_CRUM,data:breadCrum})

//接收用户同步action
export const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//登录

export const login=(username,password)=>{
    return async dispatch=>{
        const result=await cLogin(username,password)
        if(result.status===1){
            const user=result.data[0]
            storeUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const message=result.msg
            console.log(message)
        }
    }
}

//登出
export const logout=()=>{
    storeUtils.removeUser()
    return {type:RESET_USER}
}