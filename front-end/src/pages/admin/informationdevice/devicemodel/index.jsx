import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal,Select,Input} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import reqDeviceModels from '../../../../api/json/devicemodel'
import reqDeviceCategorys from '../../../../api/json/devicecategory'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

const { Search } = Input
const Option=Select.Option

export default class DeviceModel extends Component{

    state={
        isShowAdd:false,
        loading:false,
        devicemodels:[],  //所有型号,用于显示table数据
        selectedDeviceModel:'',
        searchName:'',  //搜素关键字
        searchType:''    //搜素类型
    }
    initColums=()=>{
        this.columns=[
        {
            title:'名称',
            dataIndex:'name',
        },
        {
            title:'类别',
            dataIndex:'devicecategoryId',
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(devicemodel)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(devicemodel)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceModel(devicemodel)}/>
            </span>
            )
        }
        ]
    }
    getDeviceModels=async ()=>{
        /*const result=await reqDeviceModels()
        if(result.status===0){
            const devicemodels=result.data
            this.setState({
                devicemodels:devicemodels
            })
        }*/
        const devicemodels=reqDeviceModels.data
        this.setState({
            devicemodels
        })
    }
    
    //设置选中
    onRow=(devicemodel)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedDeviceModel:devicemodel
                })
            }
        }
    }

    showAdd=()=>{
        this.devicemodel=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateDeviceModel=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const devicemodel=values
                this.form.resetFields()
                if(this.devicemodel){
                    devicemodel.id=this.devicemodel._id
                }
                /*const result=await reqAddorUpdateDeviceModel(devicemodel)
                if(result.status===0){
                    message.success('${this.devicemodel? '新增':'编辑'}成功')
                    this.getDeviceModels()
                }else{
                    message.error(result.msg)
                }*/
                console.log(devicemodel)
            }
        })
    }

    showUpdate=(devicemodel)=>{
        this.devicemodel=devicemodel
        this.setState({isShowAdd:true})
    }
    
    deleteDeviceModel=(devicemodel)=>{
        Modal.confirm({
            title:'确认删除 '+devicemodel.name+' 吗？',
            onOk:async()=>{
                /*const result=await reqdeleteDeviceModel(devicemodel._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }*/
                console.log(devicemodel.name)
                message.error(devicemodel.name)
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getDeviceModels()
    }
    render(){
        const {devicemodels,loading,selectedDeviceModel,isShowAdd,searchName,searchType}=this.state
        const dclist=reqDeviceCategorys.data
        const devicemodel=this.devicemodel||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="barcode" />新增</Button>
             </span>)
        const extra=(
        <span className="searchbar">
            <Select 
            value={searchType} 
            className="searchbar-select" 
            onChange={value=>this.setState({searchType:value})}
            >
                {
                    dclist.map((dc)=>(
                        <Option key={dc._id} value={dc._id}>{dc.name}</Option>
                    ))
                }
            </Select>
            <Search 
            className="searchbar-search" 
            placeholder="搜索关键字" 
            value={searchName} 
            onChange={event => this.setState({searchName:event.target.value})} 
            onSearch={()=>this.getDeviceModels}
            enterButton />
        </span>
        )
        return(
            <Card title={title} extra={extra}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={devicemodels}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedDeviceModel._id],
                    onSelect:(devicemodel)=>{
                        this.setState({
                            selectedDeviceModel:devicemodel
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={devicemodel._id ? "编辑型号" : '新增型号'}
                  visible={isShowAdd}
                  onOk={this.addDeviceModel}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} devicemodel={devicemodel}/>
                </Modal>
            </Card>
        )
    }
}