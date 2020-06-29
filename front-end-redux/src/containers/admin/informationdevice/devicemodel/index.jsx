import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Card,Table,Button,Icon,message,Modal,Select,Input} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rDms,couDm,dDm,rDcs} from '../../../../redux/actions/informationdevice-action'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

const { Search } = Input
const Option=Select.Option

class DeviceModel extends Component{

    constructor(props){
        super(props)
        this.state={
            isShowAdd:false,
            loading:false,
            devicemodels:[],  //所有型号,用于显示table数据
            devicecategorys:[],
            searchName:'',  //搜素关键字
            searchType:''    //搜素类型
        }
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
    
    initDeviceModels=async ()=>{
        const dm={}
        dm.name=this.state.searchName
        dm.devicecategory=this.state.searchType
        this.setState({loading:true})
        await this.props.rDms(dm)
        this.setState({loading:false})
        this.setState({devicemodels:this.props.devicemodelReducer.data})

        await this.props.rDcs()
        const devicecategorys=this.props.devicecategoryReducer.data
        this.initDevicecategoryNames(devicecategorys)
        this.setState({devicecategorys})
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
                await this.props.couDm(devicemodel)
                const result=this.props.devicemodelReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDeviceModels()
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
                await this.props.dDm(devicemodel._id)
                const result=this.props.devicemodelReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDeviceModels()
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initDeviceModels()
    }
    render(){
        const {devicecategorys,loading,isShowAdd,searchName,searchType}=this.state
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
            onSearch={this.initDeviceModels}
            enterButton />
        </span>
        )
        return(
            <Card title={title} extra={extra}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={this.props.devicemodelReducer.data}
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
DeviceModel.propTypes={
    devicecategoryReducer:PropTypes.object.isRequired,
    devicemodelReducer:PropTypes.object.isRequired,
    rDcs:PropTypes.func.isRequired,
    rDms:PropTypes.func.isRequired,
    couDm:PropTypes.func.isRequired,
    dDm:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        devicecategoryReducer:state.devicecategoryReducer,
        devicemodelReducer:state.devicemodelReducer
    }
}

const mapDispatchToProps = {rDcs,rDms,couDm,dDm}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceModel)