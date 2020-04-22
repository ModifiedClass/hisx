import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal,Input} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {formateDate} from '../../../../utils/dateUtils'
import {ptoc} from '../../../../utils/departmentUtils'
import {rUsers,rGroups,couUser,dUser,rDepartments} from '../../../../api'
import AddForm from './addform'
import DepartmentForm from './departmentform'
import Highlighter from 'react-highlight-words'

export default class User extends Component{
    constructor(props){
        super(props)
        this.auth=React.createRef()
    }
    state={
        isShow:false,
        udShow:false,
        loading:false,
        users:[],  //所有用户
        groups:[],   //用户组
        selectedUser:{},    //选中用户
        initDepartment:{}   //传给子组件初始化tree
    }
    
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                  ref={node => {
                    this.searchInput = node;
                  }}
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                  type="primary"
                  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  icon="search"
                  size="small"
                  style={{ width: 90, marginRight: 8 }}
                >
                  Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                  Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[this.state.searchText]}
                  autoEscape
                  textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    })

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        })
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ searchText: '' })
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'用户名',
            dataIndex:'username',
            ...this.getColumnSearchProps('username'),
        },
        {
            title:'密码',
            dataIndex:'password',
        },
        {
            title:'姓名',
            dataIndex:'name',
            ...this.getColumnSearchProps('name'),
        },
        {
            title:'所在组',
            dataIndex:'group',
            render:(group)=>{
                let result=[]
                for(let i=0;i<group.length;i++){
                    for(let key in this.groupNames){
                        if(key.toString()===group[i].toString()){
                            result.push(this.groupNames[key]+' ')
                        }
                    }
                }
                return result
            }
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
        const groupNames=groups? groups.reduce((pre,group)=>{
            pre[group._id]=group.name
            return pre
        },{}):[]
        this.groupNames=groupNames
    }
    
    getUsers=async()=>{
        this.setState({loading:true})
        const result=await rUsers()
        this.setState({loading:false})
        if(result.status===1){
            const users=result.data
            this.setState({
                users
            })
        }
        const gresult=await rGroups()
        if(gresult.status===1){
            const groups=gresult.data
            this.initGroupNames(groups)
            this.setState({
                groups
            })
        }
    }
    
    onRow=(user)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedUser:user,
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
                    user._id=this.user._id
                }
                const result=await couUser(user)
                if(result.status===1){
                    message.success('操作成功')
                    this.getUsers()
                }else{
                    message.error(result.msg)
                }
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
        if(user.username==='admin'){
            message.error('不允许删除管理员！')
        }else{
            Modal.confirm({
                title:'确认删除 '+user.username+' 吗？',
                onOk:async()=>{
                    const result=await dUser(user._id)
                    if(result.status===1){
                        message.success('删除成功！')
                        this.getUsers()
                    }
                }
            })
        }
    }
    
    showDepartment=async()=>{
        const result=await rDepartments()
        this.setState({
            udShow:true,
            initDepartment:result?ptoc(result.data):{}
        })
    }
    
    UserDepartment=async()=>{
        this.setState({
            udShow:false
        })
        const user=this.state.selectedUser
        const departments=this.auth.current.getDepartments()
        user.department=departments

        const result=await couUser(user)
        if(result.status===1){
            message.success('操作成功！')
            this.getUsers()
        }else{
            message.error(result.msg)
        }
    }
    
    componentWillMount(){
        this.initColums()
    }
    
    componentDidMount(){
        this.getUsers()
    }
    render(){
        const {users,groups,selectedUser,initDepartment,loading,isShow,udShow}=this.state
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
                            selectedUser:user,
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
                      this.setState({udShow:false,initDepartment:{}})
                  }}
                >
                    <DepartmentForm ref={this.auth} initDepartment={initDepartment} user={selectedUser}/>
                </Modal>
            </Card>
        )
    }
}