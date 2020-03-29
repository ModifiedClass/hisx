import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal,Tag,Input} from 'antd'
import {BASE_GREEN,BASE_YELLOW} from '../../../../utils/colors'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {rDepartments,couDepartment,dDepartment} from '../../../../api'
import AddForm from './addform'
import Highlighter from 'react-highlight-words'

export default class Department extends Component{
    state={
        departments:[],
        loading:false,
        isShow:false,
        searchText: '',
        searchedColumn: '',
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
    ptoc=(data)=>{
        let resData = data.slice()
        let tree = []

        for (let i = 0; i < resData.length; i++) {
            if (resData[i]._parent === null) {
                let obj = {
                    _id: resData[i]._id,
                    value: resData[i]._id,
                    key: resData[i]._id,
                    name: resData[i].name,
                    title: resData[i].name,
                    code: resData[i].code,
                    create_time: resData[i].create_time,
                    status: resData[i].status,
                    _parent: resData[i]._parent,
                    children: []
                }
                tree.push(obj)
                resData.splice(i, 1)
                i--
            }
        }
        
        run(tree)
        function run(chiArr){
            if (resData.length !== 0) {
                for (let i = 0; i < chiArr.length; i++) {
                    for (let j = 0; j < resData.length; j++) {
                        if (chiArr[i]._id === resData[j]._parent) {
                            let obj = {
                                _id: resData[j]._id,
                                key: resData[j]._id,
                                value: resData[j]._id,
                                title: resData[j].name,
                                name: resData[j].name,
                                code: resData[j].code,
                                create_time: resData[j].create_time,
                                status: resData[j].status,
                                _parent: resData[j]._parent,
                                children: []
                            }
                            chiArr[i].children.push(obj)
                            resData.splice(j, 1)
                            j--
                        }
                    }
                    run(chiArr[i].children)
                }
            }
        }
        return tree;
    }
   
    getDepartments= async()=>{
        this.setState({loading:true})
        //const {parentId}=this.state
        const result=await rDepartments()
        this.setState({loading:false})
        if(result.status===1){
            const departments=this.ptoc(result.data)
            this.setState({departments})
            
        }else{
            message.error("获取数据失败!")
        }
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
                const result=await couDepartment(department)
                if(result.status===1){
                    message.success('操作成功')
                    this.getDepartments()
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
                const result=await dDepartment(department._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getDepartments()
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
        this.getDepartments()
    }
    render(){
        const {departments,loading,isShow}=this.state
        const department=this.department||{}
        const title=<Button type='primary' onClick={this.showAdd}><Icon type="apartment" />新增</Button>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={departments}
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
                    departments={departments}
                    />
                </Modal>
            </Card>
        )
    }
}