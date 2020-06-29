import {
    GET_APPWARE,
    COU_APPWARE,
    DEL_APPWAREE,
    GET_PROBLEMCATEGORY,
    COU_PROBLEMCATEGORY,
    DEL_PROBLEMCATEGORY,
    GET_PROCESSEDRECORD,
    COU_PROCESSEDRECORD,
    DEL_PROCESSEDRECORD,
    EXPORT_PROCESSEDRECORD_EXCEL,
    UPLOAD_IMG,
    GET_PRINTERREPAIR,
    COU_PRINTERREPAIR,
    DEL_PRINTERREPAIR,
    REVIEWED_PRINTERREPAIR,
    GET_CARTRIDAY,
    COU_CARTRIDAY,
    DEL_CARTRIDAY,
    REVIEWED_CARTRIDAY,
} from '../actiontypes'

//管理信息模块
export const applicationSoftwareReducer=(state={},action)=>{
    switch(action.type){
        case GET_APPWARE:
            return {
                ...state,
                data:action.data
            }
        case COU_APPWARE:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_APPWAREE:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//问题类别
export const problemCategoryReducer=(state={},action)=>{
    switch(action.type){
        case GET_PROBLEMCATEGORY:
            return {
                ...state,
                data:action.data
            }
        case COU_PROBLEMCATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_PROBLEMCATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理处理记录
export const processedRecordReducer=(state={},action)=>{
    switch(action.type){
        case GET_PROCESSEDRECORD:
            return {
                ...state,
                data:action.data
            }
        case COU_PROCESSEDRECORD:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_PROCESSEDRECORD:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case EXPORT_PROCESSEDRECORD_EXCEL:
            return {
                ...state,
                data:action.data
            }
        case UPLOAD_IMG:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理设备维修
export const printerRepairReducer=(state={},action)=>{
    switch(action.type){
        case GET_PRINTERREPAIR:
            return {
                ...state,
                data:action.data
            }
        case COU_PRINTERREPAIR:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_PRINTERREPAIR:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case REVIEWED_PRINTERREPAIR:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理硒鼓加粉
export const cartridayReducer=(state={},action)=>{
    switch(action.type){
        case GET_CARTRIDAY:
            return {
                ...state,
                data:action.data
            }
        case COU_CARTRIDAY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_CARTRIDAY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case REVIEWED_CARTRIDAY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}