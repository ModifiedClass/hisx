import {
    DISPLAY_ZLTS,
    DISPLAY_TJTS,
} from '../actiontypes'

//管理时间轴
export const toolsReducer=(state={},action)=>{
    switch(action.type){
        case DISPLAY_ZLTS:
            return {
                ...state,
                data:action.data
            }
        case DISPLAY_TJTS:
            return {
                ...state,
                data:action.data
            }
        default:
            return state
    }
}