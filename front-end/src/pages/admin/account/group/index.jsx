import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rGroups,couGroup,dGroup} from '../../../../api'
import AddForm from './addform'
import AuthMenuForm from './authmenuform'
import AuthOperationForm from './authoperationform'
import {formateDate} from '../../../../utils/dateUtils'

export default class Group extends Component{
    constructor(props){
        super(props)
        this.auth=React.createRef()
    }
    state={
        isShowAdd:false,
        isShowGM:false,
        isShowGO:false,
        loading:false,
        groups:[],  //所有组,用于显示table数据
        selectedGroup:{},    //选中组,用于选中授权
    }
    initColums=()=>{
        this.columns=[
        {
            title:'名称',
            dataIndex:'name',
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(group)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(group)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteGroup(group)}/>
            </span>
            )
        }
        ]
    }
    getGroups=async ()=>{
        this.setState({loading:true})
        const result=await rGroups()
        this.setState({loading:false})
        if(result.status===1){
            const groups=result.data
            this.setState({
                groups:groups
            })
        }else{
            message.error("获取数据失败!")
        }
    }
    
    //设置选中
    onRow=(group)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedGroup:group
                })
            }
        }
    }

    showAdd=()=>{
        this.group=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateGroup=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const group=values
                this.form.resetFields()
                if(this.group){
                    group._id=this.group._id
                }
                const result=await couGroup(group)
                if(result.status===0){
                    message.success('操作成功')
                    this.getGroups()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(group)=>{
        this.group=group
        this.setState({isShowAdd:true})
    }
    
    deleteGroup=(group)=>{
        Modal.confirm({
            title:'确认删除 '+group.name+' 吗？',
            onOk:async()=>{
                const result=await dGroup(group._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }else{
                    message.error(result.msg)
                }
            }
        })
    } 
    showMenuAuth=()=>{
        this.setState({
            isShowGM:true
        })
    }
    showOperationAuth=()=>{
        this.setState({
            isShowGO:true
        })
    }
    GroupMenuAuth=async()=>{
        this.setState({
            isShowGM:false
        })
        const group=this.state.group
        const menus=this.auth.current.getMenus()
        const operations=this.auth.current.getOperations()
        group.menu=menus
        group.operation=operations
        
        const result=await couGroup(group)
        if(result.status===1){
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
        }
    }
    
    GroupOperationAuth=async()=>{
        this.setState({
            isShowGO:false
        })
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getGroups()
    }
    render(){
        const {groups,loading,selectedGroup,isShowAdd,isShowGM,isShowGO}=this.state
        const group=this.group||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="usergroup-add" />新增</Button>&nbsp;&nbsp;
                 <Button type='primary' onClick={this.showMenuAuth} disabled={!selectedGroup._id}><Icon type='menu'/>菜单权限</Button>&nbsp;&nbsp;
                 <Button type='primary' onClick={this.showOperationAuth} disabled={!selectedGroup._id}><Icon type='tool'/>操作权限</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={groups}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedGroup._id],
                    onSelect:(group)=>{
                        this.setState({
                            selectedGroup:group
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={group._id ? "编辑组" : '新增组'}
                  visible={isShowAdd}
                  onOk={this.addGroup}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} group={group}/>
                </Modal>
                <Modal
                  title="菜单权限"
                  visible={isShowGM}
                  onOk={this.GroupMenuAuth}
                  onCancel={()=>{
                      this.setState({isShowGM:false})
                  }}
                >
                    <AuthMenuForm ref={this.auth} group={selectedGroup}/>
                </Modal>
                <Modal
                  title="操作权限"
                  visible={isShowGO}
                  onOk={this.GroupOperationAuth}
                  onCancel={()=>{
                      this.setState({isShowGO:false})
                  }}
                >
                <AuthOperationForm ref={this.auth} group={selectedGroup}/>
                </Modal>
            </Card>
        )
    }
}