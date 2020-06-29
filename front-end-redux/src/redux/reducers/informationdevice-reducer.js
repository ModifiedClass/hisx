import {
    GET_DEVICECATEGORY,
    COU_DEVICECATEGORY,
    DEL_DEVICECATEGORY,
    GET_DEVICEMODEL,
    COU_DEVICEMODEL,
    DEL_DEVICEMODEL,
    GET_INSTALLLOCATION,
    COU_INSTALLLOCATION,
    DEL_INSTALLLOCATION,
    GET_DEVICEINFO,
    COU_DEVICEINFO,
    DEL_DEVICEINFO
} from '../actiontypes'

//管理设备类别
export const devicecategoryReducer=(state={},action)=>{
    switch(action.type){
        case GET_DEVICECATEGORY:
            return {
                ...state,
                data:action.data
            }
        case COU_DEVICECATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_DEVICECATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理设备型号
export const devicemodelReducer=(state={},action)=>{
    switch(action.type){
        case GET_DEVICEMODEL:
            return {
                ...state,
                data:action.data
            }
        case COU_DEVICEMODEL:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_DEVICEMODEL:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理安装地点
export const installlocationReducer=(state={},action)=>{
    switch(action.type){
        case GET_INSTALLLOCATION:
            return {
                ...state,
                data:action.data
            }
        case COU_INSTALLLOCATION:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_INSTALLLOCATION:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理设备信息
export const deviceinfoReducer=(state={},action)=>{
    switch(action.type){
        case GET_DEVICEINFO:
            return {
                ...state,
                data:action.data
            }
        case COU_DEVICEINFO:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_DEVICEINFO:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}