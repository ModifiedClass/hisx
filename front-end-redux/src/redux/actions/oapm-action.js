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
export const rAppss = applicationsoftware => async dispatch => {
    const result = await rApplicationSoftwares(applicationsoftware)
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
export const rPcs = problemcategory => async dispatch => {
    const result = await rProblemCategorys(problemcategory)
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
export const rPrs = processedrecord => async dispatch => {
    const result = await rProcessedRecords(processedrecord)
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
const eProcessedRecordAction = data =>({
    type:EXPORT_PROCESSEDRECORD_EXCEL,
    data
})
export const ePr = () => async dispatch => {
    const result = await eProcessedRecord()
    if(result.status === 1){
        dispatch(eProcessedRecordAction(result.data))
    }
}
//上传图片
const uploadImgAction = (msg,status) =>({
    type:UPLOAD_IMG,
    msg,
    status
})
export const uImg = name => async dispatch=>{
    const result=await cImg(name)
    dispatch(uploadImgAction(result.msg,result.status))
}
//获取设备维修
const rPrinterRepairsAction = data =>({
    type:GET_PRINTERREPAIR,
    data
})
export const rPrps = printerrepair => async dispatch => {
    const result = await rPrinterRepairs(printerrepair)
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
export const couPrp = printerrepair => async dispatch=>{
    const result=await couPrinterRepair(printerrepair)
    dispatch(couPrinterRepairAction(result.msg,result.status))
}
//删除设备维修
const dPrinterRepairAction = (msg,status) =>({
    type:DEL_PRINTERREPAIR,
    msg,
    status
})
export const dPrp = printerrepairId => async dispatch=>{
    const result = await dPrinterRepair(printerrepairId)
    dispatch(dPrinterRepairAction(result.msg,result.status))
}
//审核设备维修
const rePrinterRepairAction = (msg,status) =>({
    type:REVIEWED_PRINTERREPAIR,
    msg,
    status
})
export const rePrp = handlerId => async dispatch=>{
    const result = await rePrinterRepair(handlerId)
    dispatch(rePrinterRepairAction(result.msg,result.status))
}
//获取硒鼓加粉
const rCartridaysAction = data =>({
    type:GET_CARTRIDAY,
    data
})
export const rCds = cartridday => async dispatch => {
    const result = await rCartridays(cartridday)
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
const reCartridayAction = (msg,status) =>({
    type:REVIEWED_CARTRIDAY,
    msg,
    status
})
export const reCd = handlerId => async dispatch=>{
    const result = await reCartriday(handlerId)
    dispatch(reCartridayAction(result.msg,result.status))
}