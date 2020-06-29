/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
import {
    BACKUP_DATA,
    CLEAR_ACCLOG,
    CLEAR_ERRLOG,
} from '../actiontypes'

import {
    delovertimesession,
    database_backup,
    clear_nginxlog,
} from '../../api'


//清理session
const delovertimesessionAction = data =>({
    type:BACKUP_DATA,
    data
})
export const dots = () => async dispatch => {
    const result = await delovertimesession()
    if(result.status === 1){
        dispatch(delovertimesessionAction(result.data))
    }
  }

//备份
const databasebackupAction = (msg,status) =>({
    type:CLEAR_ACCLOG,
    msg,
    status
})
export const dbb = path => async dispatch=>{
    const result=await database_backup(path)
    dispatch(databasebackupAction(result.msg,result.status))
}

//清理日志
const clearnginxlogAction = (msg,status) =>({
    type:CLEAR_ERRLOG,
    msg,
    status
})
export const cnl = path => async dispatch=>{
    const result = await clear_nginxlog(path)
    dispatch(clearnginxlogAction(result.msg,result.status))
}