/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
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
    GET_PRINTERREPAIR,
    COU_PRINTERREPAIR,
    DEL_PRINTERREPAIR,
    REVIEWED_PRINTERREPAIR,
    GET_CARTRIDAY,
    COU_CARTRIDAY,
    DEL_CARTRIDAY,
    REVIEWED_CARTRIDAY,
} from '../actiontypes'

import {
    rProblemCategorys,
    couProblemCategory,
    dProblemCategory,
    rProcessedRecords,
    couProcessedRecord,
    dProcessedRecord,
    cImg,
    eProcessedRecord,
    rPrinterRepairs,
    couPrinterRepair,
    dPrinterRepair,
    rePrinterRepair,
    rCartridays,
    couCartriday,
    dCartriday,
    reCartriday,
    rApplicationSoftwares,
    couApplicationSoftware,
    dApplicationSoftware,
} from '../../api'


//获取信息模块
const rApplicationSoftwaresAction = data =>({
    type:GET_APPWARE,
    data
})
export const rAppss = () => async dispatch => {
    const result = await rApplicationSoftwares()
    if(result.status === 1){
        dispatch(rApplicationSoftwaresAction(result.data))
    }
  }

//新增修改信息模块
const couApplicationSoftwareAction = (msg,status) =>({
    type:COU_APPWARE,
    msg,
    status
})
export const couApps = applicationsoftware => async dispatch=>{
    const result=await couApplicationSoftware(applicationsoftware)
    dispatch(couApplicationSoftwareAction(result.msg,result.status))
}
//删除信息模块
const dApplicationSoftwareAction = (msg,status) =>({
    type:DEL_APPWAREE,
    msg,
    status
})
export const dApps = applicationsoftwareId => async dispatch=>{
    const result = await dApplicationSoftware(applicationsoftwareId)
    dispatch(dApplicationSoftwareAction(result.msg,result.status))
}
//获取问题类别
const rProblemCategorysAction = data =>({
    type:GET_PROBLEMCATEGORY,
    data
})
export const rPcs = () => async dispatch => {
    const result = await rProblemCategorys()
    if(result.status === 1){
        dispatch(rProblemCategorysAction(result.data))
    }
  }
//新增修改问题类别
const couProblemCategoryAction = (msg,status) =>({
    type:COU_PROBLEMCATEGORY,
    msg,
    status
})
export const couPc = problemcategory => async dispatch=>{
    const result=await couProblemCategory(problemcategory)
    dispatch(couProblemCategoryAction(result.msg,result.status))
}
//删除问题类别
const dProblemCategoryAction = (msg,status) =>({
    type:DEL_PROBLEMCATEGORY,
    msg,
    status
})
export const dPc =problemcategoryId => async dispatch=>{
    const result = await dProblemCategory(problemcategoryId)
    dispatch(dProblemCategoryAction(result.msg,result.status))
}
//获取处理记录
const rProcessedRecordsAction = data =>({
    type:GET_PROCESSEDRECORD,
    data
})
export const rPrs = () => async dispatch => {
    const result = await rProcessedRecords()
    if(result.status === 1){
        dispatch(rProcessedRecordsAction(result.data))
    }
  }
//新增修改处理记录
const couProcessedRecordAction = (msg,status) =>({
    type:COU_PROCESSEDRECORD,
    msg,
    status
})
export const couPr = processedrecord => async dispatch=>{
    const result=await couProcessedRecord(processedrecord)
    dispatch(couProcessedRecordAction(result.msg,result.status))
}
//删除处理记录
const dProcessedRecordAction = (msg,status) =>({
    type:DEL_PROCESSEDRECORD,
    msg,
    status
})
export const dPr = processedrecordId => async dispatch=>{
    const result = await dProcessedRecord(processedrecordId)
    dispatch(dProcessedRecordAction(result.msg,result.status))
}
//导出处理记录excel

//获取设备维修
const rPrinterRepairsAction = data =>({
    type:GET_PRINTERREPAIR,
    data
})
export const rDrs = () => async dispatch => {
    const result = await rPrinterRepairs()
    if(result.status === 1){
        dispatch(rPrinterRepairsAction(result.data))
    }
  }
//新增修改设备维修
const couPrinterRepairAction = (msg,status) =>({
    type:COU_PRINTERREPAIR,
    msg,
    status
})
export const couDr = printerrepair => async dispatch=>{
    const result=await couPrinterRepair(printerrepair)
    dispatch(couPrinterRepairAction(result.msg,result.status))
}
//删除设备维修
const dPrinterRepairAction = (msg,status) =>({
    type:DEL_PRINTERREPAIR,
    msg,
    status
})
export const dDr = printerrepairId => async dispatch=>{
    const result = await dPrinterRepair(printerrepairId)
    dispatch(dPrinterRepairAction(result.msg,result.status))
}
//审核设备维修

//获取硒鼓加粉
const rCartridaysAction = data =>({
    type:GET_CARTRIDAY,
    data
})
export const rCds = () => async dispatch => {
    const result = await rCartridays()
    if(result.status === 1){
        dispatch(rCartridaysAction(result.data))
    }
  }
//新增修改硒鼓加粉
const couCartridayAction = (msg,status) =>({
    type:COU_CARTRIDAY,
    msg,
    status
})
export const couCd = cartridday => async dispatch=>{
    const result=await couCartriday(cartridday)
    dispatch(couCartridayAction(result.msg,result.status))
}
//删除硒鼓加粉
const dCartridayAction = (msg,status) =>({
    type:DEL_CARTRIDAY,
    msg,
    status
})
export const dCd = cartriddayId => async dispatch=>{
    const result = await dCartriday(cartriddayId)
    dispatch(dCartridayAction(result.msg,result.status))
}
//审核硒鼓加粉
