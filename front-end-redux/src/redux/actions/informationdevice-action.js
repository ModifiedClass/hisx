/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
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

import {
    rDeviceCategorys,
    couDeviceCategory,
    dDeviceCategory,
    rDeviceModels,
    couDeviceModel,
    dDeviceModel,
    rInstallLocations,
    couInstallLocation,
    dInstallLocation,
    rDeviceInfos,
    couDeviceInfo,
    dDeviceInfo
} from '../../api'


//获取设备类别
const rDeviceCategorysAction = data =>({
    type:GET_DEVICECATEGORY,
    data
})
export const rDcs = devicecategory => async dispatch => {
    const result = await rDeviceCategorys(devicecategory)
    if(result.status === 1){
        dispatch(rDeviceCategorysAction(result.data))
    }
  }

//新增修改设备类别
const couDeviceCategoryAction = (msg,status) =>({
    type:COU_DEVICECATEGORY,
    msg,
    status
})
export const couDc = devicecategory => async dispatch=>{
    const result=await couDeviceCategory(devicecategory)
    dispatch(couDeviceCategoryAction(result.msg,result.status))
}

//删除设备类别
const dDeviceCategoryAction = (msg,status) =>({
    type:DEL_DEVICECATEGORY,
    msg,
    status
})
export const dDc = devicecategoryId => async dispatch=>{
    const result = await dDeviceCategory(devicecategoryId)
    dispatch(dDeviceCategoryAction(result.msg,result.status))
}

//获取设备型号
const rDeviceModelsAction = data =>({
    type:GET_DEVICEMODEL,
    data
})
export const rDms = devicemodel => async dispatch => {
    const result = await rDeviceModels(devicemodel)
    if(result.status === 1){
        dispatch(rDeviceModelsAction(result.data))
    }
  }

//新增修改设备型号
const couDeviceModelAction = (msg,status) =>({
    type:COU_DEVICEMODEL,
    msg,
    status
})
export const couDm = devicemodel => async dispatch=>{
    const result=await couDeviceModel(devicemodel)
    dispatch(couDeviceModelAction(result.msg,result.status))
}

//删除设备型号
const dDeviceModelAction = (msg,status) =>({
    type:DEL_DEVICEMODEL,
    msg,
    status
})
export const dDm = devicemodelId => async dispatch=>{
    const result = await dDeviceModel(devicemodelId)
    dispatch(dDeviceModelAction(result.msg,result.status))
}

//获取安装地点
const rInstallLocationsAction = data =>({
    type:GET_INSTALLLOCATION,
    data
})
export const rIls = installlocation => async dispatch => {
    const result = await rInstallLocations(installlocation)
    if(result.status === 1){
        dispatch(rInstallLocationsAction(result.data))
    }
  }

//新增修改安装地点
const couInstallLocationAction = (msg,status) =>({
    type:COU_INSTALLLOCATION,
    msg,
    status
})
export const couIl = installlocation => async dispatch=>{
    const result=await couInstallLocation(installlocation)
    dispatch(couInstallLocationAction(result.msg,result.status))
}

//删除安装地点
const dInstallLocationAction = (msg,status) =>({
    type:DEL_INSTALLLOCATION,
    msg,
    status
})
export const dIl = installlocationId => async dispatch=>{
    const result = await dInstallLocation(installlocationId)
    dispatch(dInstallLocationAction(result.msg,result.status))
}

//获取设备信息
const rDeviceInfoAction = data =>({
    type:GET_DEVICEINFO,
    data
})
export const rDis = deviceinfo => async dispatch => {
    const result = await rDeviceInfos(deviceinfo)
    if(result.status === 1){
        dispatch(rDeviceInfoAction(result.data))
    }
  }

//新增修改设备信息
const couDeviceInfoAction = (msg,status) =>({
    type:COU_DEVICEINFO,
    msg,
    status
})
export const couDi = deviceinfo => async dispatch=>{
    const result=await couDeviceInfo(deviceinfo)
    dispatch(couDeviceInfoAction(result.msg,result.status))
}

//删除设备信息
const dDeviceInfoAction = (msg,status) =>({
    type:DEL_DEVICEINFO,
    msg,
    status
})
export const dDi = deviceinfoId => async dispatch=>{
    const result = await dDeviceInfo(deviceinfoId)
    dispatch(dDeviceInfoAction(result.msg,result.status))
}