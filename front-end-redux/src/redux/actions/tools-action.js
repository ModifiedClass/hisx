/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
import {
    DISPLAY_ZLTS,
    DISPLAY_TJTS,
} from '../actiontypes'

import {
    getzlhists,
    gettjxtts,
} from '../../api'


//获取zlhis表空间使用情况
const getzlhistsAction = data =>({
    type:DISPLAY_ZLTS,
    data
})
export const rTls = () => async dispatch => {
    const result = await getzlhists()
    if(result.status === 1){
        dispatch(getzlhistsAction(result.data))
    }
  }

//获取体检系统表空间使用情况
const gettjxttsAction = data =>({
    type:DISPLAY_TJTS,
    data
})
export const couTl = () => async dispatch=>{
    const result=await gettjxtts()
    dispatch(gettjxttsAction(result.data))
}