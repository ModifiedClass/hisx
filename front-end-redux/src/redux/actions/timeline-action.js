/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
import {
    GET_TIMELINE,
    COU_TIMELINE,
    DEL_TIMELINE,
} from '../actiontypes'

import {
    rTimeLines,
    couTimeLine,
    dTimeLine,
} from '../../api'


//获取时间轴
const rTimeLinesAction = data =>({
    type:GET_TIMELINE,
    data
})
export const rTls = timeline => async dispatch => {
    const result = await rTimeLines(timeline)
    if(result.status === 1){
        dispatch(rTimeLinesAction(result.data))
    }
  }

//新增修改时间轴
const couTimeLineAction = (msg,status) =>({
    type:COU_TIMELINE,
    msg,
    status
})
export const couTl = timeline => async dispatch=>{
    const result=await couTimeLine(timeline)
    dispatch(couTimeLineAction(result.msg,result.status))
}

//删除时间轴
const dTimeLineAction = (msg,status) =>({
    type:DEL_TIMELINE,
    msg,
    status
})
export const dTl = timelineId => async dispatch=>{
    const result = await dTimeLine(timelineId)
    dispatch(dTimeLineAction(result.msg,result.status))
}