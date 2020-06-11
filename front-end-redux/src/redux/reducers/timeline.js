import {
    GET_TIMELINE,
    COU_TIMELINE,
    DEL_TIMELINE,
} from '../actiontypes'

//管理时间轴
export const timelinemanage=(state={},action)=>{
    switch(action.type){
        case GET_TIMELINE:
            return {
                ...state,
                data:action.data
            }
        case COU_TIMELINE:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_TIMELINE:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}