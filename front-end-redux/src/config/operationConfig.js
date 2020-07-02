const operList=[
{
    name:'帐户管理',
    method:'account',
    children:[
    {
        key:'cReset',
        name:'重置密码',
        method:'cReset'
    },{
        key:'rGroups',
        name:'读取组',
        method:'rGroups'
    },{
        key:'couGroup',
        name:'增加或更新组',
        method:'couGroup'
    },{
        key:'dGroup',
        name:'删除组',
        method:'dGroup'
    },{
        key:'rDepartments',
        name:'读取部门',
        method:'rDepartments'
    },{
        key:'couDepartment',
        name:'增加或更新部门',
        method:'couDepartment'
    },{
        key:'dDepartment',
        name:'删除部门',
        method:'dDepartment'
    },{
        key:'rUsers',
        name:'读取用户',
        method:'rUsers'
    },{
        key:'couUser',
        name:'增加或更新用户',
        method:'couUser'
    },{
        key:'dUser',
        name:'删除用户',
        method:'dUser'
    }
    ]
},{
    name:'信息设备',
    method:'informationdevice',
    children:[
    {
        key:'rDeviceCategorys',
        name:'读取设备类别',
        method:'rDeviceCategorys'
    },{
        key:'couDeviceCategory',
        name:'增加或更新设备类别',
        method:'couDeviceCategory'
    },{
        key:'dDeviceCategory',
        name:'删除设备类别',
        method:'dDeviceCategory'
    },{
        key:'rDeviceModels',
        name:'读取设备型号',
        method:'rDeviceModels'
    },{
        key:'couDeviceModel',
        name:'增加或更新设备型号',
        method:'couDeviceModel'
    },{
        key:'dDeviceModel',
        name:'删除设备型号',
        method:'dDeviceModel'
    },{
        key:'rInstallLocations',
        name:'读取安装位置',
        method:'rInstallLocations'
    },{
        key:'couInstallLocation',
        name:'增加或更新安装位置',
        method:'couInstallLocation'
    },{
        key:'dInstallLocation',
        name:'删除安装位置',
        method:'dInstallLocation'
    },{
        key:'rDeviceInfos',
        name:'读取设备信息',
        method:'rDeviceInfos'
    },{
        key:'couDeviceInfo',
        name:'增加或更新设备信息',
        method:'couDeviceInfo'
    },{
        key:'dDeviceInfo',
        name:'删除设备信息',
        method:'dDeviceInfo'
    },{
        key:'rDeviceTopos',
        name:'读取设备拓扑',
        method:'rDeviceTopos'
    },{
        key:'couDeviceTopo',
        name:'增加或更新设备拓扑',
        method:'couDeviceTopo'
    },{
        key:'dDeviceTopo',
        name:'删除设备拓扑',
        method:'dDeviceTopo'
    }
    ]
},{
    name:'运维记录',
    method:'oapm',
    children:[
    {
        key:'rProblemCategorys',
        name:'读取问题类别',
        method:'rProblemCategorys'
    },{
        key:'couProblemCategory',
        name:'增加或更新问题类别',
        method:'couProblemCategory'
    },{
        key:'dProblemCategory',
        name:'删除问题类别',
        method:'dProblemCategory'
    },{
        key:'rProcessedRecords',
        name:'读取运维记录',
        method:'rProcessedRecords'
    },{
        key:'couProcessedRecord',
        name:'增加或更新运维记录',
        method:'couProcessedRecord'
    },{
        key:'dProcessedRecord',
        name:'删除运维记录',
        method:'dProcessedRecord'
    },{
        key:'cImg',
        name:'上传图片',
        method:'cImg'
    },{
        key:'rPrinterRepairs',
        name:'读取打印机维修',
        method:'rPrinterRepairs'
    },{
        key:'couPrinterRepair',
        name:'增加或更新打印机维修',
        method:'couPrinterRepair'
    },{
        key:'dPrinterRepair',
        name:'删除打印机维修',
        method:'dPrinterRepair'
    },{
        key:'rePrinterRepair',
        name:'审核打印机维修',
        method:'rePrinterRepair'
    },{
        key:'rCartridays',
        name:'读取硒鼓加粉',
        method:'rCartridays'
    },{
        key:'couCartriday',
        name:'增加或更新硒鼓加粉',
        method:'couCartriday'
    },{
        key:'dCartriday',
        name:'删除硒鼓加粉',
        method:'dCartriday'
    },{
        key:'reCartriday',
        name:'审核硒鼓加粉',
        method:'reCartriday'
    },{
        key:'rApplicationSoftwares',
        name:'读取应用软件',
        method:'rApplicationSoftwares'
    },{
        key:'couApplicationSoftware',
        name:'增加或更新应用软件',
        method:'couApplicationSoftware'
    },{
        key:'dApplicationSoftware',
        name:'删除应用软件',
        method:'dApplicationSoftware'
    }
    ]
},{
    name:'时间线',
    method:'timeline',
    children:[
    {
        key:'rTimeLines',
        name:'读取时间轴',
        method:'rTimeLines'
    },{
        key:'couTimeLine',
        name:'增加或更新时间轴',
        method:'couTimeLine'
    },{
        key:'dTimeLine',
        name:'删除时间轴',
        method:'dTimeLine'
    }
    ]
}
]

export default operList