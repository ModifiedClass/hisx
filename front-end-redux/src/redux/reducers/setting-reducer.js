import {
    BACKUP_DATA,
    CLEAR_ACCLOG,
    CLEAR_ERRLOG,
} from '../actiontypes'

//管理时间轴
export const settingReducer=(state={},action)=>{
    switch(action.type){
        case BACKUP_DATA:
            return {
                ...state,
                data:action.data
            }
        case CLEAR_ACCLOG:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case CLEAR_ERRLOG:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}