const HOST=''
import ajax from './ajax'
import encapsulationfetch from './ajax'

/**account**/
//登陆
export const reqLogin=(username,password)=>ajax(HOST+'/login',{username,password},'POST')

//获取部门列表
export const reqDepartments=(parentID)=>ajax(HOST+'/account/department/list',{parentID})

//获取部门
export const reqDepartment=(departmentId)=>ajax(HOST+'/account/department/get',{departmentId})

//添加部门
export const reqAddDepartment=({departmentName,departmentcode,parentID})=>ajax(HOST+'/account/department/add',{departmentName,departmentcode,parentID},'POST')

//更新部门
export const reqUpdateDepartment=({departmentId,departmentName,departmentcode})=>ajax(HOST+'/account/department/update',{departmentId,departmentName,departmentcode},'POST')

//删除部门
export const reqDeleteDepartment=(departmentId)=>ajax(HOST+'/account/department/delete',{departmentId},'POST')


//获取组列表
export const reqGroups=()=>ajax(HOST+'/account/group/list')

//添加组
export const reqAddGroup=(groupName)=>ajax(HOST+'/account/group/add',{groupName},'POST')

//更新组
export const reqUpdateGroup=(group)=>ajax(HOST+'/account/group/update',group,'POST')


//获取用户列表
export const reqUsers=()=>ajax(HOST+'/account/user/list')

//添加或编辑用户
export const reqAddOrUpdateUser=(user)=>ajax(HOST+'/account/user/'+(user._id ? 'update' : 'add'),{user},'POST')

//删除用户
export const reqDeleteUser=(userId)=>ajax(HOST+'/account/user/delete',{userId},'POST')

//获取运维记录
export const reqProcessedRecords=(pageNum,pageSize)=>ajax(HOST+'/oapm/processedrecord/list',{pageNum,pageSize})

//搜索获取运维记录
export const reqSearchProcessedRecords=({pageNum,pageSize,searchName,searchType})=>ajax(HOST+'/oapm/processedrecord/list',{
    pageNum,
    pageSize,
    [searchType]:searchName
    })

//删除图片
export const reqDeleteImg=(name)=>ajax(HOST+'/oapm/img/delete',{name},'POST')

//新增或更新运维记录
export const reqreqAddOrUpdateUser=(processedrecord)=>ajax(HOST+'/oapm/processedrecord/'+(processedrecord._id ? 'update' : 'add'),{processedrecord},'POST')