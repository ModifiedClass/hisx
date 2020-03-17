import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {formateDate} from '../../../../utils/dateUtils'
import reqUsers from '../../../../api/json/user'
import AddForm from './addform'
import DepartmentForm from './departmentform'

export default class User extends Component{
    
    state={
        isShow:false,
        udShow:false,
        loading:false,
        users:[],  //所有用户
        groups:[],   //用户组
        selectedUser:{}    //选中用户
    }
    initColums=()=>{
        this.columns=[
        {
            title:'用户名',
            dataIndex:'username',
        },
        {
            title:'密码',
            dataIndex:'password',
        },
        {
            title:'姓名',
            dataIndex:'name',
        },
        {
            title:'所在组',
            dataIndex:'group_id',
            render:(group_id)=>this.groupNames[group_id]
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(user)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(user)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteUser(user)}/>
            </span>
            )
        }
        ]
    }
    
    initGroupNames=(groups)=>{
        const groupNames= groups.reduce((pre,group)=>{
            pre[group._id]=group.name
            return pre
        },{})
        this.groupNames=groupNames
    }
    
    getUsers=async()=>{
        /*const result=await reqUsers()
        if(result.status===0){
        const {users，groups}=result.data
            this.initGroupNames(groups)
            this.setState({
                users,
                groups
            })
        }*/
        const {users,groups}=reqUsers.data
        this.initGroupNames(groups)
        this.setState({
            users,
            groups
        })
    }
    
    onRow=(user)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedUser:user
                })
            }
        }
    }
    
    addOrUpdateUser=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                //const user=this.form.getFieldsValue()
                const user=values
                this.form.resetFields()
                if(this.user){
                    user.id=this.user._id
                }
                /*const result=await reqAddorUpdateUser(user)
                if(result.status===9){
                    message.success('${this.user? '新增':'编辑'}成功')
                    this.getUsers()
                }else{
                    message.error(result.msg)
                }*/
                console.log(user)
            }
        })
    }
    
    showAdd=()=>{
        this.user=null
        this.setState({isShow:true})
    }
    
    showUpdate=(user)=>{
        this.user=user
        this.setState({isShow:true})
    }
    
    deleteUser=(user)=>{
        Modal.confirm({
            title:'确认删除 '+user.username+' 吗？',
            onOk:async()=>{
                /*const result=await reqDeleteUser(user._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }*/
                console.log(user.username)
                message.error(user.username)
            }
        })
    }
    
    showDepartment=()=>{
        this.setState({
            udShow:true
        })
    }
    
    UserDepartment=()=>{
        this.setState({
            udShow:false
        })
        const user=this.state.user
        const departments=this.auth.current.getDepartments()
        user.department=departments
        
        /*
        const result=await reqUpdateGroup(group)
        if(result.status===0){
            //给自己角色授权，强制退出
            if(group._id===memUtils.user.group_id){
                memUtils.user={}
                storeUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户组权限更改，需重新登录！')
            }else{
                message.success('授权成功！')
                this.setState({
                    groups:[...this.state.groups]
                })
            }
        }else{
            message.error(result.msg)
        }*/
        console.log(user)
    }
    
    componentWillMount(){
        this.initColums()
    }
    
    componentDidMount(){
        this.getUsers()
    }
    render(){
        const {users,groups,selectedUser,loading,isShow,udShow}=this.state
        const user=this.user||{}
        const title=(
            <span>
                <Button type='primary' onClick={this.showAdd}><Icon type="user-add" />新增</Button>&nbsp;&nbsp;
                <Button type='primary' onClick={this.showDepartment} disabled={!selectedUser._id}><Icon type='apartment'/>部门选择</Button>
            </span>)
        
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={users}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                    rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedUser._id],
                    onSelect:(user)=>{
                        this.setState({
                            selectedUser:user
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={user._id ? "编辑用户" : '新增用户'}
                  visible={isShow}
                  onOk={this.addOrUpdateUser}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    groups={groups} 
                    setForm={(form)=>{this.form=form}} 
                    user={user}
                    />
                </Modal>
                <Modal
                  title="部门选择"
                  visible={udShow}
                  onOk={this.UserDepartment}
                  onCancel={()=>{
                      this.setState({udShow:false})
                  }}
                >
                    <DepartmentForm ref={this.auth} user={selectedUser}/>
                </Modal>
            </Card>
        )
    }
}