import fetchreq from './datareq'
import {HOST} from '../utils/constants'
/**account**/
//登陆
export const cLogin=(username,password)=>fetchreq(HOST+'/api/account/auth/',{username,password},'POST')

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
export const rProcessedRecords=({pageNum,pageSize,searchName,searchType})=>fetchreq(HOST+'/oapm/processedrecord/',{
    pageNum,
    pageSize,
    [searchType]:searchName
    })
//增加或更新运维记录
export const couProcessedRecord=(processedrecord)=>fetchreq(HOST+'/api/oapm/processedrecord/',processedrecord,(processedrecord._id ? 'PATCH' : 'POST'))
//删除运维记录
export const dProcessedRecord=(processedrecordId)=>fetchreq(HOST+'/api/oapm/processedrecord/',{'_id':processedrecordId},'DELETE')
//上传图片
export const cImg=(name)=>fetchreq(HOST+'/oapm/img/',{name},'POST')

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


