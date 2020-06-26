import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rDeviceCategorys,couDeviceCategory,dDeviceCategory} from '../../../../api'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

export default class DeviceCategory extends Component{

    state={
        isShowAdd:false,
        loading:false,
        devicecategorys:[],  //所有类别,用于显示table数据
    }
    initColums=()=>{
        this.columns=[
        {
            title:'编号',
            dataIndex:'_id',
        },{
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
            render:(devicecategory)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(devicecategory)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceCategory(devicecategory)}/>
            </span>
            )
        }
        ]
    }
    getDeviceCategorys=async ()=>{
        this.setState({loading:true})
        const result=await rDeviceCategorys()
        this.setState({loading:false})
        if(result.status===1){
            const devicecategorys=result.data
            this.setState({
                devicecategorys:devicecategorys
            })
        }
    }

    showAdd=()=>{
        this.devicecategory=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateDeviceCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const devicecategory=values
                this.form.resetFields()
                if(this.devicecategory){
                    devicecategory._id=this.devicecategory._id
                }
                const result=await couDeviceCategory(devicecategory)
                if(result.status===1){
                    message.success('操作成功')
                    this.getDeviceCategorys()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(devicecategory)=>{
        this.devicecategory=devicecategory
        this.setState({isShowAdd:true})
    }
    
    deleteDeviceCategory=(devicecategory)=>{
        Modal.confirm({
            title:'确认删除 '+devicecategory.name+' 吗？',
            onOk:async()=>{
                const result=await dDeviceCategory(devicecategory._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getDeviceCategorys()
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getDeviceCategorys()
    }
    render(){
        const {devicecategorys,loading,isShowAdd}=this.state
        const devicecategory=this.devicecategory||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="unordered-list" />新增</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={devicecategorys}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={devicecategory._id ? "编辑类别" : '新增类别'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateDeviceCategory}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} devicecategory={devicecategory}/>
                </Modal>
            </Card>
        )
    }
}