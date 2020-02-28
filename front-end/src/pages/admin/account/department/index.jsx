import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqDepartments} from '../../../../../api'
import reqDepartments from '../../../../api/json/department.js'
import AddForm from './addform'

export default class Department extends Component{
    state={
        departments:[],
        loading:false,
        isShow:false,
    }
    initColums=()=>{
        this.columns=[
        {
            title:'名称',
            dataIndex:'name',
        },
        {
            title:'简码',
            dataIndex:'code',
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
                <EditBtn onClick={()=>this.showUpdate(department)}/>&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDepartment(department)}/>
            </span>
            )
        }
        ]
    }
    
    getDepartments= async()=>{
        /*this.setState({loading:true})
        const {parentId}=this.state
        const result=await reqDepartments('0')
        this.setState({loading:false})
        if(result.status===0){
            const departments=result.data
            this.setState(departments)
        }else{
            message.error("获取数据失败!")
        }*/
        const departments=reqDepartments.data
        this.setState({departments})
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
                    department.id=this.department._id
                }
                /*const result=await reqAddorUpdateUser(department)
                if(result.status===9){
                    message.success('${this.department? '新增':'编辑'}成功')
                    this.getDepartments()
                }else{
                    message.error(result.msg)
                }*/
                console.log(department)
            }
        })
    }
    
    deleteDepartment=(department)=>{
        Modal.confirm({
            title:'确认删除'+department.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteDepartment(department._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getDepartments()
                }*/
                message.error(department.name)
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
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
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