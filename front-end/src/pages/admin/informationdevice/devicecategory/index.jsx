import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import reqDeviceCategorys from '../../../../api/json/devicecategory'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

export default class DeviceCategory extends Component{

    state={
        isShowAdd:false,
        loading:false,
        devicecategorys:[],  //所有类别,用于显示table数据
        selectedDeviceCategory:''
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
        /*const result=await reqDeviceCategorys()
        if(result.status===0){
            const devicecategorys=result.data
            this.setState({
                devicecategorys:devicecategorys
            })
        }*/
        const devicecategorys=reqDeviceCategorys.data
        this.setState({
            devicecategorys
        })
    }
    
    //设置选中
    onRow=(devicecategory)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedDeviceCategory:devicecategory
                })
            }
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
                    devicecategory.id=this.devicecategory._id
                }
                /*const result=await reqAddorUpdateDeviceCategory(devicecategory)
                if(result.status===0){
                    message.success('${this.devicecategory? '新增':'编辑'}成功')
                    this.getDeviceCategorys()
                }else{
                    message.error(result.msg)
                }*/
                console.log(devicecategory)
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
                /*const result=await reqdeleteDeviceCategory(devicecategory._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }*/
                console.log(devicecategory.name)
                message.error(devicecategory.name)
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
        const {devicecategorys,loading,selectedDeviceCategory,isShowAdd}=this.state
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
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedDeviceCategory._id],
                    onSelect:(devicecategory)=>{
                        this.setState({
                            selectedDeviceCategory:devicecategory
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={devicecategory._id ? "编辑类别" : '新增类别'}
                  visible={isShowAdd}
                  onOk={this.addDeviceCategory}
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