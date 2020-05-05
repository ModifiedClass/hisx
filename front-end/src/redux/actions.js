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
import {cLogin,rGroups} from '../api'
//设置面包屑同步action
export const setBreadCrum=(breadCrum)=>({type:SET_BREAD_CRUM,data:breadCrum})

//接收用户同步action
export const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//登录

export const login=(username,password)=>{
    return async dispatch=>{
        const result=await cLogin(username,password)
        if(result.status===1){
            /*const user=result.data[0]
            storeUtils.saveUser(user)
            dispatch(receiveUser(user))*/
            const{_id,username,name,group}=result.data[0]
            const arr=[]
            for(let i=0;i<group.length;i++){
                const g={'_id':group[i]}
                const res=await rGroups(g)
                if(res.status===1){
                    for(let j=0;j<res.data.length;j++){
                        let temp=res.data[j].menu.split(',')
                        for(let k=0;k<temp.length;k++){
                            arr.push(temp[k])
                        }
                    } 
                }                
            }
            const menus=Array.from(new Set(arr))
            const user={_id,username,name,group,menus}
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
    //react onbeforeunload 关闭浏览器时执行
    storeUtils.removeUser()
    return {type:RESET_USER}
}