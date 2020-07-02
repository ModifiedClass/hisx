import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Card,Table,Button,Icon,message,Modal,Input} from 'antd'
import PropTypes from 'prop-types'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {formateDate} from '../../../../utils/dateUtils'
import {ptoc} from '../../../../utils/departmentUtils'
import {rUs,couUs,dUs,rGro,rDeps,recPwd} from '../../../../redux/actions/account-action'
import AddForm from './addform'
import DepartmentForm from './departmentform'
import Highlighter from 'react-highlight-words'

class User extends Component{
    constructor(props){
        super(props)
        this.auth=React.createRef()
        this.state={
            isShow:false,
            udShow:false,
            loading:false,
            users:[],  //所有用户
            groups:[],   //用户组
            selectedUser:{},    //选中用户
            initDepartment:[]   //传给子组件初始化tree
        }
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
    
    initUsers=async()=>{
        this.setState({loading:true})
        await this.props.rUs()
        const result=this.props.userReducer.data
        this.setState({loading:false})
        this.setState({users:result})

        await this.props.rGro()
        const groups=this.props.groupReducer.data
        this.initGroupNames(groups)
        this.setState({groups:groups})
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
                await this.props.couUs(user)
                const result=this.props.userReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initUsers()
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
                    await this.props.dUs(user._id)
                    const result=this.props.userReducer
                    if(result.status===1){
                        message.success(result.msg)
                        this.initUsers()
                    }else{
                        message.error(result.msg)
                    }
                }
            })
        }
    }
    
    showDepartment=async()=>{
        await this.props.rDeps()
        const result=this.props.departmentReducer
        this.setState({
            udShow:true,
            initDepartment:result?ptoc(result.data):[]
        })
    }
    
    UserDepartment=async()=>{
        this.setState({
            udShow:false
        })
        const user=this.state.selectedUser
        const departments=this.auth.current.getDepartments()
        user.department=departments

        await this.props.couUs(user)
        const result=this.props.userReducer
        if(result.status===1){
            message.success(result.msg)
            this.initUsers()
        }else{
            message.error(result.msg)
        }
    }

    resetPwd=()=>{
        const username=this.state.selectedUser.username
        if(username==='admin'){
            message.error('不允许重置管理员！')
        }else{
            Modal.confirm({
                title:'确认重置 '+username+' 吗？',
                onOk:async()=>{
                    await this.props.recPwd(username)
                    const result=this.props.userReducer
                    if(result.status===1){
                        message.success(result.msg)
                        this.initUsers()
                    }else{
                        message.error(result.msg)
                    }
                }
            })
        }
    }
    
    componentWillMount(){
        this.initColums()
    }
    
    componentDidMount(){
        this.initUsers()
    }
    render(){
        const {users,groups,selectedUser,initDepartment,loading,isShow,udShow}=this.state
        const user=this.user||{}
        const title=(
            <span>
                <Button type='primary' onClick={this.showAdd}><Icon type="user-add" />新增</Button>&nbsp;&nbsp;
                <Button type='primary' onClick={this.showDepartment} disabled={!selectedUser._id}><Icon type='apartment'/>部门选择</Button>&nbsp;&nbsp;
                <Button type='primary' onClick={this.resetPwd} disabled={!selectedUser._id}><Icon type='redo'/>重置密码</Button>
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
                      this.setState({udShow:false,initDepartment:[]})
                  }}
                >
                    <DepartmentForm ref={this.auth} initDepartment={initDepartment} user={selectedUser}/>
                </Modal>
            </Card>
        )
    }
}

User.propTypes={
    userReducer:PropTypes.object.isRequired,
    groupReducer:PropTypes.object.isRequired,
    departmentReducer:PropTypes.object.isRequired,
    rUs:PropTypes.func.isRequired,
    couUs:PropTypes.func.isRequired,
    dUs:PropTypes.func.isRequired,
    rGro:PropTypes.func.isRequired,
    rDeps:PropTypes.func.isRequired,
    recPwd:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        userReducer:state.userReducer,
        groupReducer:state.groupReducer,
        departmentReducer:state.departmentReducer
    }
}

const mapDispatchToProps = {
    rUs,
    couUs,
    dUs,
    rGro,
    rDeps,
    recPwd
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)