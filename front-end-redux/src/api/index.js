import fetchreq from './datareq'
import fetchdownload from './downloadreq'
import {HOST} from '../utils/constants'
/**account**/
//登陆
export const cLogin=(username,password)=>fetchreq(HOST+'/api/account/auth/',{username,password},'POST')
//重置密码
export const cReset=(username)=>fetchreq(HOST+'/api/account/auth/',{username},'PATCH')

//读取组
export const rGroups=(group)=>fetchreq(HOST+'/api/account/group/',group)
//增加或更新组
export const couGroup=(group)=>fetchreq(HOST+'/api/account/group/',group,(group._id ? 'PATCH' : 'POST'))
//删除组
export const dGroup=(groupId)=>fetchreq(HOST+'/api/account/group/',{'_id':groupId},'DELETE')

//读取部门
export const rDepartments=(department)=>fetchreq(HOST+'/api/account/department/',department)
//增加或更新部门
export const couDepartment=(department)=>fetchreq(HOST+'/api/account/department/',department,(department._id ? 'PATCH' : 'POST'))
//删除部门
export const dDepartment=(departmentId)=>fetchreq(HOST+'/api/account/department/',{'_id':departmentId},'DELETE')

//读取用户
export const rUsers=(user)=>fetchreq(HOST+'/api/account/user/',user)
//增加或更新用户
export const couUser=(user)=>fetchreq(HOST+'/api/account/user/',user,(user._id ? 'PATCH' : 'POST'))
//删除用户
export const dUser=(userId)=>fetchreq(HOST+'/api/account/user/',{'_id':userId},'DELETE')

/**informationdevice**/
//读取设备类别
export const rDeviceCategorys=(devicecategory)=>fetchreq(HOST+'/api/informationdevice/devicecategory/',devicecategory)
//增加或更新设备类别
export const couDeviceCategory=(devicecategory)=>fetchreq(HOST+'/api/informationdevice/devicecategory/',devicecategory,(devicecategory._id ? 'PATCH' : 'POST'))
//删除设备类别
export const dDeviceCategory=(devicecategoryId)=>fetchreq(HOST+'/api/informationdevice/devicecategory/',{'_id':devicecategoryId},'DELETE')

//读取设备型号
export const rDeviceModels=(devicemodel)=>fetchreq(HOST+'/api/informationdevice/devicemodel/',devicemodel)
//增加或更新设备型号
export const couDeviceModel=(devicemodel)=>fetchreq(HOST+'/api/informationdevice/devicemodel/',devicemodel,(devicemodel._id ? 'PATCH' : 'POST'))
//删除设备型号
export const dDeviceModel=(devicemodeld)=>fetchreq(HOST+'/api/informationdevice/devicemodel/',{'_id':devicemodeld},'DELETE')

//读取安装位置
export const rInstallLocations=(installlocation)=>fetchreq(HOST+'/api/informationdevice/installlocation/',installlocation)
//增加或更新安装位置
export const couInstallLocation=(installlocation)=>fetchreq(HOST+'/api/informationdevice/installlocation/',installlocation,(installlocation._id ? 'PATCH' : 'POST'))
//删除安装位置
export const dInstallLocation=(installlocationId)=>fetchreq(HOST+'/api/informationdevice/installlocation/',{'_id':installlocationId},'DELETE')

//读取设备信息
export const rDeviceInfos=(deviceinfo)=>fetchreq(HOST+'/api/informationdevice/deviceinfo/',deviceinfo)
//增加或更新设备信息
export const couDeviceInfo=(deviceinfo)=>fetchreq(HOST+'/api/informationdevice/deviceinfo/',deviceinfo,(deviceinfo._id ? 'PATCH' : 'POST'))
//删除设备信息
export const dDeviceInfo=(deviceinfoId)=>fetchreq(HOST+'/api/informationdevice/deviceinfo/',{'_id':deviceinfoId},'DELETE')

//读取设备拓扑
export const rDeviceTopos=(devicetopo)=>fetchreq(HOST+'/api/informationdevice/devicetopo/',devicetopo)
//增加或更新设备拓扑
export const couDeviceTopo=(devicetopo)=>fetchreq(HOST+'/api/informationdevice/devicetopo/',devicetopo,(devicetopo._id ? 'PATCH' : 'POST'))
//删除设备拓扑
export const dDeviceTopo=(devicetopoId)=>fetchreq(HOST+'/api/informationdevice/devicetopo/',{'_id':devicetopoId},'DELETE')

/**oapm**/
//读取问题类别
export const rProblemCategorys=(problemcategory)=>fetchreq(HOST+'/api/oapm/problemcategory/',problemcategory)
//增加或更新问题类别
export const couProblemCategory=(problemcategory)=>fetchreq(HOST+'/api/oapm/problemcategory/',problemcategory,(problemcategory._id ? 'PATCH' : 'POST'))
//删除问题类别
export const dProblemCategory=(problemcategoryId)=>fetchreq(HOST+'/api/oapm/problemcategory/',{'_id':problemcategoryId},'DELETE')

//读取运维记录
export const rProcessedRecords=(ProcessedRecord)=>fetchreq(HOST+'/api/oapm/processedrecord/',ProcessedRecord)
//增加或更新运维记录
export const couProcessedRecord=(processedrecord)=>fetchreq(HOST+'/api/oapm/processedrecord/',processedrecord,(processedrecord._id ? 'PATCH' : 'POST'))
//删除运维记录
export const dProcessedRecord=(processedrecordId)=>fetchreq(HOST+'/api/oapm/processedrecord/',{'_id':processedrecordId},'DELETE')
//上传图片
export const cImg=(name)=>fetchreq(HOST+'/api/oapm/img/',{name},'POST')
//导出excel
export const eProcessedRecord=()=>fetchdownload(HOST+'/api/oapm/export_ProcessedRecord_excel/')

//读取打印机维修
export const rPrinterRepairs=(printerrepair)=>fetchreq(HOST+'/api/oapm/printerrepair/',printerrepair)
//增加或更新打印机维修
export const couPrinterRepair=(printerrepair)=>fetchreq(HOST+'/api/oapm/printerrepair/',printerrepair,(printerrepair._id ? 'PATCH' : 'POST'))
//删除打印机维修
export const dPrinterRepair=(printerrepairId)=>fetchreq(HOST+'/api/oapm/printerrepair/',{'_id':printerrepairId},'DELETE')
//审核打印机维修
export const rePrinterRepair=(handlerId)=>fetchreq(HOST+'/api/oapm/printerrepair/',{'handler':handlerId},'PUT')


//读取硒鼓加粉
export const rCartridays=(cartriday)=>fetchreq(HOST+'/api/oapm/cartriday/',cartriday)
//增加或更新硒鼓加粉
export const couCartriday=(cartriday)=>fetchreq(HOST+'/api/oapm/cartriday/',cartriday,(cartriday._id ? 'PATCH' : 'POST'))
//删除硒鼓加粉
export const dCartriday=(cartridayId)=>fetchreq(HOST+'/api/oapm/cartriday/',{'_id':cartridayId},'DELETE')
//审核硒鼓加粉
export const reCartriday=(handlerId)=>fetchreq(HOST+'/api/oapm/cartriday/',{'_handler':handlerId},'PUT')



//读取应用软件
export const rApplicationSoftwares=(applicationsoftware)=>fetchreq(HOST+'/api/oapm/applicationsoftware/',applicationsoftware)
//增加或更新应用软件
export const couApplicationSoftware=(applicationsoftware)=>fetchreq(HOST+'/api/oapm/applicationsoftware/',applicationsoftware,(applicationsoftware._id ? 'PATCH' : 'POST'))
//删除应用软件
export const dApplicationSoftware=(applicationsoftwareId)=>fetchreq(HOST+'/api/oapm/applicationsoftware/',{'_id':applicationsoftwareId},'DELETE')

/**timeline**/
//读取时间轴
export const rTimeLines=(timeline)=>fetchreq(HOST+'/api/timeline/',timeline)
//增加或更新时间轴
export const couTimeLine=(timeline)=>fetchreq(HOST+'/api/timeline/',timeline,(timeline._id ? 'PATCH' : 'POST'))
//删除时间轴
export const dTimeLine=(timelineId)=>fetchreq(HOST+'/api/timeline/',{'_id':timelineId},'DELETE')

/**analysis**/
//住院科室
export const getzyks=()=>fetchreq(HOST+'/api/analysis/getzyks/')
//门诊科室
export const getmzks=()=>fetchreq(HOST+'/api/analysis/getmzks/')
//获取最近30天问题记录
export const chart_processedrecord_day=()=>fetchreq(HOST+'/api/analysis/chart_processedrecord_day/')
//获取问题类别比例
export const chart_processedrecord=()=>fetchreq(HOST+'/api/analysis/chart_processedrecord/')
//获取设备类别比例
export const chart_device=()=>fetchreq(HOST+'/api/analysis/chart_device/')
//获取全院治疗情况
export const chart_qyzlqk=(startDate,endDate)=>fetchreq(HOST+'/api/analysis/chart_qyzlqk/',{startDate:startDate,endDate:endDate})
//获取部门医师治疗情况
export const chart_bmyszlqk=(department,startDate,endDate)=>fetchreq(HOST+'/api/analysis/chart_bmyszlqk/',{department:department,startDate:startDate,endDate:endDate})
//获取全院诊断情况
export const chart_qyzdqk=(startDate,endDate)=>fetchreq(HOST+'/api/analysis/chart_qyzdqk/',{startDate:startDate,endDate:endDate})
//获取部门医师诊断情况
export const chart_bmyszdqk=(department,startDate,endDate)=>fetchreq(HOST+'/api/analysis/chart_bmyszdqk/',{department:department,startDate:startDate,endDate:endDate})

/**tools**/
//获取zlhis表空间使用情况
export const getzlhists=()=>fetchreq(HOST+'/api/analysis/getzlhists/')
//获取体检系统表空间使用情况
export const gettjxtts=()=>fetchreq(HOST+'/api/analysis/gettjxtts/')
//获取zlhis某个表空间使用情况
export const getzlhistssub=(tsname)=>fetchreq(HOST+'/api/analysis/getzlhistssub/',{tsname:tsname})
//获取体检系统某个表空间使用情况
export const gettjxttssub=(tsname)=>fetchreq(HOST+'/api/analysis/gettjxttssub/',{tsname:tsname})
//查询his锁表情况
export const gethislocktables=()=>fetchreq(HOST+'/api/analysis/gethislocktables/')
//his解锁表
export const hisunlocktables=(ss)=>fetchreq(HOST+'/api/analysis/hisunlocktables/',{ss:ss},'POST')
//查询体检系统锁表情况
export const gettjxtlocktables=()=>fetchreq(HOST+'/api/analysis/gettjxtlocktables/')
//体检系统解锁表
export const tjxtunlocktables=(ss)=>fetchreq(HOST+'/api/analysis/tjxtunlocktables/',{ss:ss},'POST')

/**setting**/
//清理session
export const delovertimesession=()=>fetchreq(HOST+'/api/systemsetting/delovertimesession/')
//备份
export const database_backup=(path)=>fetchreq(HOST+'/api/systemsetting/database_backup/',{'path':path})
//清理日志
export const clear_nginxlog=(path)=>fetchreq(HOST+'/api/systemsetting/clear_nginxlog/',{'path':path})

/**bms**/
//读取图书类别
export const rBookCategorys=(bookcategory)=>fetchreq(HOST+'/api/bms/bookcategory/',bookcategory)
//增加或更新图书类别
export const couBookCategory=(bookcategory)=>fetchreq(HOST+'/api/bms/bookcategory/',bookcategory,(bookcategory._id ? 'PATCH' : 'POST'))
//删除图书类别
export const dBookCategory=(bookcategoryId)=>fetchreq(HOST+'/api/bms/bookcategory/',{'_id':bookcategoryId},'DELETE')

//读取图书
export const rBooks=(book)=>fetchreq(HOST+'/api/bms/books/',book)
//增加或更新图书
export const couBook=(book)=>fetchreq(HOST+'/api/bms/books/',book,(book._id ? 'PATCH' : 'POST'))
//删除图书
export const dBook=(bookId)=>fetchreq(HOST+'/api/bms/books/',{'_id':bookId},'DELETE')

//读取借阅记录
export const rBorrowRecords=(borrowrecord)=>fetchreq(HOST+'/api/bms/borrowrecord/',borrowrecord)
//增加或更新借阅记录
export const couBorrowRecord=(borrowrecord)=>fetchreq(HOST+'/api/bms/borrowrecord/',borrowrecord,(borrowrecord._id ? 'PATCH' : 'POST'))
//删除借阅记录
export const dBorrowRecord=(borrowrecordId)=>fetchreq(HOST+'/api/bms/borrowrecord/',{'_id':borrowrecordId},'DELETE')
