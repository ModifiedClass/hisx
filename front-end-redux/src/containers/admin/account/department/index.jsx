import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Card,Table,Button,Icon,message,Modal,Tag,Input} from 'antd'
import {BASE_GREEN,BASE_YELLOW} from '../../../../utils/colors'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {rDeps,couDep,dDep} from '../../../../redux/actions/account-action'
import AddForm from './addform'
import Highlighter from 'react-highlight-words'

class Department extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            isShow:false,
            searchText: '',
            searchedColumn: '',
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
            title:'名称',
            dataIndex:'name',
            ...this.getColumnSearchProps('name'),
        },
        {
            title:'简码',
            dataIndex:'code',
            ...this.getColumnSearchProps('code'),
        },
        {
            title:'状态',
            dataIndex:'status',
            render:(status)=>{
                if(status){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>启用</Tag>
                        </span>
                    )
                }else{
                    return (
                        <span>
                            <Tag color={BASE_YELLOW}>停用</Tag>
                        </span>
                    )
                }  
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
            render:(department)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(department)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDepartment(department)}/>
            </span>
            )
        }
        ]
    }
   
    initDepartments = async()=>{
        this.setState({loading:true})
        await this.props.rDeps()
        this.setState({loading:false})
        this.setState({departments:this.props.departmentReducer.data})
    }

    showAdd=()=>{
        this.department=null
        this.setState({isShow:true})
    }
    
    showUpdate=(department)=>{
        this.department=department
        this.setState({isShow:true})
    }
    
    addOrUpdateDepartment=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const department=values
                this.form.resetFields()
                if(this.department){
                    department._id=this.department._id
                }
                if(department.status)
                    department.status=true
                else
                    department.status=false
                await this.props.couDep(department)
                const result=this.props.departmentReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDepartments()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    
    deleteDepartment=(department)=>{
        Modal.confirm({
            title:'确认删除'+department.name+'吗？',
            onOk:async()=>{
                await this.props.dDep(department._id)
                const result=this.props.departmentReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDepartments()
                }else{
                    message.error(result.msg)
                } 
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initDepartments()
    }
    render(){
        const {loading,isShow}=this.state
        const department=this.department||{}
        const title=<Button type='primary' onClick={this.showAdd}><Icon type="apartment" />新增</Button>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={this.props.departmentReducer.data}
                columns={this.columns}
                pagination={false}
                scroll={{ y: 480 }}
                />
                
                <Modal
                  title={department._id ? "编辑部门" : '新增部门'}
                  visible={isShow}
                  onOk={this.addOrUpdateDepartment}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    department={department}
                    departments={this.props.departmentReducer.data}
                    />
                </Modal>
            </Card>
        )
    }
}

Department.propTypes={
    departmentReducer:PropTypes.object.isRequired,
    rDeps:PropTypes.func.isRequired,
    couDep:PropTypes.func.isRequired,
    dDep:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        departmentReducer:state.departmentReducer
    }
}

const mapDispatchToProps = {rDeps,couDep,dDep}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Department)