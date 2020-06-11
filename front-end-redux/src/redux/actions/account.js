/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
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

import storeUtils from '../../utils/storeUtils'
import {
    rDepartments,
    couDepartment,
    dDepartment,
    cLogin,
    rGroups,
    couGroup,
    dGroup,
    rUsers,
    couUser,
    dUser,
    cReset
} from '../../api'
import {ptoc} from '../../utils/departmentUtils'

//设置面包屑同步action
export const setBreadCrum=(breadCrum)=>({type:SET_BREAD_CRUM,data:breadCrum})

//接收用户同步action
export const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
//登录

export const login=(username,password)=>{
    return async dispatch=>{
        const result=await cLogin(username,password)
        if(result.status===1){
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

//获取部门
const rDepartmentsAction = data =>({
    type:GET_DEPARTMENT,
    data
})
export const rDeps = () => async dispatch => {
    const result = await rDepartments()
    if(result.status === 1){
        const data = ptoc(result.data)
        dispatch(rDepartmentsAction(data))
    }
  }

//新增修改部门
const couDepartmentsAction = (msg,status) =>({
    type:COU_DEPARTMENT,
    msg,
    status
})
export const couDep = department => async dispatch=>{
    const result=await couDepartment(department)
    dispatch(couDepartmentsAction(result.msg,result.status))
}

//删除部门
const dDepartmentsAction = (msg,status) =>({
    type:DEL_DEPARTMENT,
    msg,
    status
})
export const dDep = departmentId => async dispatch=>{
    const result = await dDepartment(departmentId)
    dispatch(dDepartmentsAction(result.msg,result.status))
}

//获取组
const rGroupsAction = data =>({
    type:GET_GROUP,
    data
})
export const rGro = () => async dispatch => {
    const result = await rGroups()
    if(result.status === 1){
        const data = result.data
        dispatch(rGroupsAction(data))
    }
  }

//新增修改组
const couGroupsAction = (msg,status) =>({
    type:COU_GROUP,
    msg,
    status
})
export const couGro = group => async dispatch=>{
    const result=await couGroup(group)
    dispatch(couGroupsAction(result.msg,result.status))
}

//删除组
const dGroupsAction = (msg,status) =>({
    type:DEL_GROUP,
    msg,
    status
})
export const dGro = groupId => async dispatch=>{
    const result = await dGroup(groupId)
    dispatch(dGroupsAction(result.msg,result.status))
}

//获取用户
const rUserAction = data =>({
    type:GET_USER,
    data
})
export const rUs = () => async dispatch => {
    const result = await rUsers()
    if(result.status === 1){
        const data = result.data
        dispatch(rUserAction(data))
    }
  }

//新增修改用户
const couUsersAction = (msg,status) =>({
    type:COU_USER,
    msg,
    status
})
export const couUs = user => async dispatch=>{
    const result=await couUser(user)
    dispatch(couUsersAction(result.msg,result.status))
}

//删除用户
const dUsersAction = (msg,status) =>({
    type:DEL_USER,
    msg,
    status
})
export const dUs = userId => async dispatch=>{
    const result = await dUser(userId)
    dispatch(dUsersAction(result.msg,result.status))
}

//重置密码
const recPwdAction=(msg,status)=>({
    type:REC_PWD,
    msg,
    status
})
export const recPwd=user=>async dispatch=>{
    const result=await cReset(user)
    dispatch(recPwdAction(result.msg,result.status))
}