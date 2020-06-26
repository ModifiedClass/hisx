import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal,Select,Input} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rDeviceModels,couDeviceModel,dDeviceModel,rDeviceCategorys} from '../../../../api'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

const { Search } = Input
const Option=Select.Option

export default class DeviceModel extends Component{

    state={
        isShowAdd:false,
        loading:false,
        devicemodels:[],  //所有型号,用于显示table数据
        devicecategorys:[],
        searchName:'',  //搜素关键字
        searchType:''    //搜素类型
    }
    initColums=()=>{
        this.columns=[
        {
            title:'编号',
            dataIndex:'_id',
        },{
            title:'型号名称',
            dataIndex:'name',
        },
        {
            title:'类别',
            dataIndex:'devicecategory',
            render:(devicecategory)=>{
                for(let key in this.devicecategoryNames){
                    if(Number(key)===devicecategory){
                        return this.devicecategoryNames[key]
                    }
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
            render:(devicemodel)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(devicemodel)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceModel(devicemodel)}/>
            </span>
            )
        }
        ]
    }
    
    initDevicecategoryNames=(devicecategorys)=>{
        const devicecategoryNames=devicecategorys? devicecategorys.reduce((pre,devicecategory)=>{
            pre[devicecategory._id]=devicecategory.name
            return pre
        },{}):[]
        this.devicecategoryNames=devicecategoryNames
    }
    
    getDeviceModels=async ()=>{
        const dm={}
        dm.name=this.state.searchName
        dm.devicecategory=this.state.searchType
        this.setState({loading:true})
        const result=await rDeviceModels(dm)
        this.setState({loading:false})
        if(result.status===1){
            const devicemodels=result.data
            this.setState({
                devicemodels:devicemodels
            })
        }else{
            this.setState({
                devicemodels:[]
            })
            message.error(result.msg)
        }
        const dresult=await rDeviceCategorys()
        if(dresult.status===1){
            const devicecategorys=dresult.data
            this.initDevicecategoryNames(devicecategorys)
            this.setState({
                devicecategorys
            })
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
                    devicemodel._id=this.devicemodel._id
                }
                const result=await couDeviceModel(devicemodel)
                if(result.status===1){
                    message.success('操作成功')
                    this.getDeviceModels()
                }else{
                    message.error(result.msg)
                }
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
                const result=await dDeviceModel(devicemodel._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getDeviceModels()
                }
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
        const {devicemodels,devicecategorys,loading,isShowAdd,searchName,searchType}=this.state
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
                    devicecategorys.map((dc)=>(
                        <Option key={dc._id} value={dc._id}>{dc.name}</Option>
                    ))
                }
            </Select>
            <Search 
            className="searchbar-search" 
            placeholder="搜索关键字" 
            value={searchName} 
            onChange={event => this.setState({searchName:event.target.value})} 
            onSearch={this.getDeviceModels}
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
                />
                <Modal
                  title={devicemodel._id ? "编辑型号" : '新增型号'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateDeviceModel}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} devicemodel={devicemodel} devicecategorys={devicecategorys}/>
                </Modal>
            </Card>
        )
    }
}