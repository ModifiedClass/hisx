/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
import {
    GET_ZYKS,
    GET_MZKS,
    CHART_PROCESSEDRECORD_DAY,
    CHART_PROCESSEDRECORD,
    CHART_DEVICE,
    CHART_QYZLQK,
    CHART_BMYSZLQK,
    CHART_QYZDQK,
    CHART_BMYSZDQK,
} from '../actiontypes'

import {
    getzyks,
    getmzks,
    chart_processedrecord_day,
    chart_processedrecord,
    chart_device,
    chart_qyzlqk,
    chart_bmyszlqk,
    chart_qyzdqk,
    chart_bmyszdqk,
} from '../../api'


//住院科室
const rZyksAction = data =>({
    type:GET_ZYKS,
    data
})
export const rZyks = () => async dispatch => {
    const res = await getzyks()
    const departments=[]
    for (let d in res){
        departments.push({'_id':res[d][0],'name':res[d][1]})
    }
    dispatch(rZyksAction(departments))
  }

//门诊科室
const rMzksAction = data =>({
    type:GET_MZKS,
    data
})
export const rMzks = () => async dispatch => {
    const result = await getmzks()
    const departments=[]
    for (let d in result){
        departments.push({'_id':result[d][0],'name':result[d][1]})
    }
    dispatch(rMzksAction(departments))
  }

//获取最近30天问题记录
const chartPrdAction = data =>({
    type:CHART_PROCESSEDRECORD_DAY,
    data
})
export const chartPrd = () => async dispatch=>{
    const result=await chart_processedrecord_day()
    dispatch(chartPrdAction(result))
}

//获取问题类别比例
const chartPrAction = data =>({
    type:CHART_PROCESSEDRECORD,
    data
})
export const chartPr = () => async dispatch=>{
    const result=await chart_processedrecord()
    dispatch(chartPrAction(result))
}

//获取设备类别比例
const chartDeviceAction = data =>({
    type:CHART_DEVICE,
    data
})
export const chartDevice = () => async dispatch=>{
    const result=await chart_device()
    dispatch(chartDeviceAction(result))
}

//获取全院治疗情况
const chartQyzlqkAction = data =>({
    type:CHART_QYZLQK,
    data
})
export const chartQyzlqk = (startdate,enddate) => async dispatch=>{
    const result=await chart_qyzlqk(startdate,enddate)
    dispatch(chartQyzlqkAction(result[0]))
}

//获取部门医师治疗情况
const chartBmyszlqkAction = data =>({
    type:CHART_BMYSZLQK,
    data
})
export const chartBmyszlqk = (department,startdate,enddate) => async dispatch=>{
    const result=await chart_bmyszlqk(department,startdate,enddate)
    const data=[]
    const legend=[]
    for (let d in result){
        data.push({
            value:[result[d][1],result[d][2],result[d][3],result[d][4],result[d][5],
            result[d][6],result[d][7],result[d][8],result[d][9],result[d][10],
            result[d][11],result[d][12],result[d][13],result[d][14],result[d][15]],
            name:result[d][0]
            })
        legend.push(result[d][0])
    }
    dispatch(chartBmyszlqkAction({data,legend}))
}

//获取全院诊断情况
const chartQyzdqkAction = data =>({
    type:CHART_QYZDQK,
    data
})
export const chartQyzdqk = (startdate,enddate) => async dispatch=>{
    const result=await chart_qyzdqk(startdate,enddate)
    const data=[['标题', '收病人数', '药占比%', '材料占比%', '检查占比%', '治疗占比%', '其他费用占比%', '平均费用(元)']]
    for (let d in result){
            data.push(['诊疗情况',result[d][0],result[d][1],result[d][2],result[d][3],result[d][4],result[d][5],result[d][6]])
    }
    dispatch(chartQyzdqkAction(data))
}

//获取部门医师诊断情况
const chartBmyszdqkAction = data =>({
    type:CHART_BMYSZDQK,
    data
})
export const chartBmyszdqk = (department,startdate,enddate) => async dispatch=>{
    const result=await chart_bmyszdqk(department,startdate,enddate)
    const data=[['医师', '收病人数', '药占比%', '材料占比%', '检查占比%', '治疗占比%', '其他费用占比%', '平均费用(元)']]
    for (let d in result){
            data.push([result[d][0],result[d][1],result[d][2],result[d][3],result[d][4],result[d][5],result[d][6],result[d][7]])
    }
    dispatch(chartBmyszdqkAction(data))
}