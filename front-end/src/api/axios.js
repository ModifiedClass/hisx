const HOST=''
import axiosreq from './datareq'
import fetchreq from './datareq'

/**account**/
//登陆
export const reqLogin=(username,password)=>axiosreq(HOST+'/login',{username,password},'POST')

//获取部门列表
export const reqDepartments=(parentID)=>axiosreq(HOST+'/account/department/list',{parentID})

//获取部门
export const reqDepartment=(departmentId)=>axiosreq(HOST+'/account/department/get',{departmentId})

//添加部门
export const reqAddDepartment=({departmentName,departmentcode,parentID})=>axiosreq(HOST+'/account/department/add',{departmentName,departmentcode,parentID},'POST')

//更新部门
export const reqUpdateDepartment=({departmentId,departmentName,departmentcode})=>axiosreq(HOST+'/account/department/update',{departmentId,departmentName,departmentcode},'POST')

//删除部门
export const reqDeleteDepartment=(departmentId)=>axiosreq(HOST+'/account/department/delete',{departmentId},'POST')


//获取组列表
export const reqGroups=()=>axiosreq(HOST+'/account/group/list')

//添加组
export const reqAddGroup=(groupName)=>axiosreq(HOST+'/account/group/add',{groupName},'POST')

//更新组
export const reqUpdateGroup=(group)=>axiosreq(HOST+'/account/group/update',group,'POST')


//获取用户列表
export const reqUsers=()=>axiosreq(HOST+'/account/user/list')

//添加或编辑用户
export const reqAddOrUpdateUser=(user)=>axiosreq(HOST+'/account/user/'+(user._id ? 'update' : 'add'),{user},'POST')

//删除用户
export const reqDeleteUser=(userId)=>axiosreq(HOST+'/account/user/delete',{userId},'POST')

//获取运维记录
export const reqProcessedRecords=(pageNum,pageSize)=>axiosreq(HOST+'/oapm/processedrecord/list',{pageNum,pageSize})

//搜索获取运维记录
export const reqSearchProcessedRecords=({pageNum,pageSize,searchName,searchType})=>axiosreq(HOST+'/oapm/processedrecord/list',{
    pageNum,
    pageSize,
    [searchType]:searchName
    })

//删除图片
export const reqDeleteImg=(name)=>axiosreq(HOST+'/oapm/img/delete',{name},'POST')

//新增或更新运维记录
export const reqreqAddOrUpdateUser=(processedrecord)=>axiosreq(HOST+'/oapm/processedrecord/'+(processedrecord._id ? 'update' : 'add'),{processedrecord},'POST')