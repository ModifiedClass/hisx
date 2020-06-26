/*
action type常量名称
*/

//设置面包屑
export const SET_BREAD_CRUM='set_bread_crum'

//收集用户信息
export const RECEIVE_USER='receive_user'

//重置用户信息
export const RESET_USER='reset_user'

/**accoutn**/
//获取部门
export const GET_DEPARTMENT='get_department'
//新增修改部门
export const COU_DEPARTMENT='cou_department'
//删除部门
export const DEL_DEPARTMENT='del_department'
//获取组
export const GET_GROUP='get_group'
//新增修改组
export const COU_GROUP='cou_group'
//删除组
export const DEL_GROUP='del_group'
//获取用户
export const GET_USER='get_user'
//新增修改用户
export const COU_USER='cou_user'
//删除用户
export const DEL_USER='del_user'
//重置密码
export const REC_PWD='rec_pwd'

/**timeline**/
//获取时间轴
export const GET_TIMELINE='get_timeline'
//新增修改时间轴
export const COU_TIMELINE='cou_timeline'
//删除时间轴
export const DEL_TIMELINE='del_timeline'

/**analysis**/
//住院科室
export const GET_ZYKS='getzyks'
//门诊科室
export const GET_MZKS='getmzks'
//获取最近30天问题记录
export const CHART_PROCESSEDRECORD_DAY='chart_processedrecord_day'
//获取问题类别比例
export const CHART_PROCESSEDRECORD='chart_processedrecord'
//获取设备类别比例
export const CHART_DEVICE='chart_device'
//获取全院治疗情况
export const CHART_QYZLQK='chart_qyzlqk'
//获取部门医师治疗情况
export const CHART_BMYSZLQK='chart_bmyszlqk'
//获取全院诊断情况
export const CHART_QYZDQK='chart_qyzdqk'
//获取部门医师诊断情况
export const CHART_BMYSZDQK='chart_bmyszdqk'

/**oapm**/
//获取信息模块
export const GET_APPWARE='get_appware'
//新增修改信息模块
export const COU_APPWARE='cou_appware'
//删除信息模块
export const DEL_APPWAREE='del_appware'
//获取问题类别
export const GET_PROBLEMCATEGORY='get_problemcategory'
//新增修改问题类别
export const COU_PROBLEMCATEGORY='cou_problemcategory'
//删除问题类别
export const DEL_PROBLEMCATEGORY='del_problemcategory'
//获取处理记录
export const GET_PROCESSEDRECORD='get_processedrecord'
//新增修改处理记录
export const COU_PROCESSEDRECORD='cou_processedrecord'
//删除处理记录
export const DEL_PROCESSEDRECORD='del_processedrecord'
//导出处理记录excel
export const EXPORT_PROCESSEDRECORD_EXCEL='export_processedrecord_excel'
//获取设备维修
export const GET_PRINTERREPAIR='get_printerrepair'
//新增修改设备维修
export const COU_PRINTERREPAIR='cou_printerrepair'
//删除设备维修
export const DEL_PRINTERREPAIR='del_printerrepair'
//审核设备维修
export const REVIEWED_PRINTERREPAIR='reviewed_printerrepair'
//获取硒鼓加粉
export const GET_CARTRIDAY='get_cartriday'
//新增修改硒鼓加粉
export const COU_CARTRIDAY='cou_cartriday'
//删除硒鼓加粉
export const DEL_CARTRIDAY='del_cartriday'
//审核硒鼓加粉
export const REVIEWED_CARTRIDAY='reviewed_cartriday'
/**informationdevice**/
//获取设备类别
export const GET_DEVICECATEGORY='get_devicecategory'
//新增修改设备类别
export const COU_DEVICECATEGORY='cou_devicecategory'
//删除设备类别
export const DEL_DEVICECATEGORY='del_devicecategory'
//获取设备型号
export const GET_DEVICEMODEL='get_devicemodel'
//新增修改设备型号
export const COU_DEVICEMODEL='cou_devicemodel'
//删除设备型号
export const DEL_DEVICEMODEL='del_devicemodel'
//获取安装地点
export const GET_INSTALLLOCATION='get_installlocation'
//新增修改安装地点
export const COU_INSTALLLOCATION='cou_installlocation'
//删除安装地点
export const DEL_INSTALLLOCATION='del_installlocation'
//获取设备信息
export const GET_DEVICEINFO='get_deviceinfo'
//新增修改设备信息
export const COU_DEVICEINFO='cou_deviceinfo'
//删除设备信息
export const DEL_DEVICEINFO='del_deviceinfo'
/**setting**/
//备份数据
export const BACKUP_DATA='backup_data'
//清除访问日志
export const CLEAR_ACCLOG='clear_acclog'
//清除错误日志
export const CLEAR_ERRLOG='clear_errlog'
/**tools**/
//查看中联表空间
export const DISPLAY_ZLTS='display_zlts'
//查看体检系统表空间
export const DISPLAY_TJTS='display_tjts'
/**bms**/
//获取图书类别
export const GET_BOOKCATEGORY='get_bookcategory'
//新增修改图书类别
export const COU_BOOKCATEGORY='cou_bookcategory'
//删除图书类别
export const DEL_BOOKCATEGORY='del_bookcategory'
//获取图书目录
export const GET_BOOK='get_book'
//新增修改图书目录
export const COU_BOOK='cou_book'
//删除图书目录
export const DEL_BOOK='del_book'
//获取图书库存
export const GET_BOOKSTOCK='get_bookstock'
//新增修改图书库存
export const COU__BOOKSTOCK='cou_bookstock'
//删除图书库存
export const DEL__BOOKSTOCK='del_bookstock'
//获取借阅记录
export const GET_BORROWRECORD='get_borrowrecord'
//新增修改借阅记录
export const COU_BORROWRECORD='cou_borrowrecord'
//删除借阅记录
export const DEL_BORROWRECORD='del_borrowrecord'
//归还图书
export const RETURN_BOOK='return_book'