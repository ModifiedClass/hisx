const operList=[
{
    name:'帐户管理',
    method:'account',
    children:[
    {
        name:'新增部门',
        method:'reqAddDepartment'
    },
    {
        name:'更新部门',
        method:'reqUpdateDepartment'
    },
    {
        name:'删除部门',
        method:'reqDeleteDepartment'
    },
    {
        name:'新增组',
        method:'reqAddGroup'
    },
    ]
},
{
    name:'时间线',
    method:'timeline',
    children:[
    {
        name:'新增事件',
        method:'reqAddTimeline'
    },
    {
        name:'更新事件',
        method:'reqUpdateTimeline'
    },
    ]
}
]

export default operList